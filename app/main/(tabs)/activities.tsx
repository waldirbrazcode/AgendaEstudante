import {
  useUserCourses,
  useUserCoursesIds,
  useUserCoursesWorks,
  useUserTokens,
} from "@/app/store/useUserCourses";
import { useEffect } from "react";

import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function Activities() {
  const BaseURL = "https://classroom.googleapis.com/v1";

  const userTokens = useUserTokens((state) => state.tokens);
  const userCourses = useUserCourses((state) => state.courses);

  const setUserCoursesId = useUserCoursesIds((state) => state.setCoursesID);
  const userCoursesId = useUserCoursesIds((state) => state.coursesID);

  const setUserCoursesWorks = useUserCoursesWorks(
    (state) => state.setCoursesWorks,
  );
  const userCoursesWorks = useUserCoursesWorks((state) => state.coursesWork);

  async function getCoursesIds() {
    const CourseIds = userCourses.map((course: any) => course.id);
    setUserCoursesId(CourseIds);
  }

  function verifyDueActivites(Work: any) {
    if (Work.dueDate) {
      const day = Work.dueDate.day;
      const month = Work.dueDate.month;
      const year = Work.dueDate.year;

      const dueDate = new Date(year, month - 1, day);
      const now = new Date();

      now.setHours(0, 0, 0, 0);

      return dueDate >= now;
    } else {
      return;
    }
  }

  /*async function getCoursesWorks(courseId) {
    const response = await fetch(`${BaseURL}/courses/${courseId}/courseWork`, {
      headers: {
        Authorization: `Bearer ${userTokens}`,
      },
    });

    const data = await response.json();
  }*/

  useEffect(() => {
    getCoursesIds();
  }, []);

  useEffect(() => {
    async function getCoursesWorks() {
      try {
        const Works = userCoursesId.map(async (courseId: any) => {
          const response = await fetch(
            `${BaseURL}/courses/${courseId}/courseWork`,
            {
              headers: {
                Authorization: `Bearer ${userTokens}`,
              },
            },
          );
          const data = await response.json();
          return data.courseWork;
        });

        const results = await Promise.all(Works);
        const filteredResults = results.filter(Boolean);

        const allWorks = filteredResults.flat();

        const noDueActivities = allWorks.filter((work) =>
          verifyDueActivites(work),
        );

        setUserCoursesWorks(noDueActivities);
      } catch (error) {
        console.log(error);
      }
    }
    getCoursesWorks();
  }, [userCoursesId]);

  return (
    <>
      <View
        style={{
          padding: 30,
          paddingBottom: "30%",
        }}
      >
        <TouchableOpacity
          style={{
            padding: 18,
            backgroundColor: "#75a0ff",
            borderRadius: 12,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 24, textAlign: "center" }}>
            Criar Atividade
          </Text>
        </TouchableOpacity>

        <FlatList
          style={{ display: "flex", gap: 8 }}
          data={userCoursesWorks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#d8d8d8",
                padding: 10,
                borderRadius: 12,
                marginTop: 16,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ width: "90%", fontSize: 24, textAlign: "center" }}>
                {item.title}
              </Text>

              <Image
                style={{ width: 20, height: 20 }}
                source={require("@/assets/images/edit_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png")}
              />
            </View>
          )}
        />
      </View>
    </>
  );
}
