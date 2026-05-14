import {
  useUserCourses,
  useUserData,
  useUserTokens,
} from "@/app/store/useUserCourses";
import { useEffect } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function Homepage() {
  const userData = useUserData((state) => state.data);
  const userTokens = useUserTokens((state) => state.tokens);

  const setUserCourses = useUserCourses((state) => state.setCourses);
  const userCourses = useUserCourses((state) => state.courses);

  const BaseURL = "https://classroom.googleapis.com/v1";

  async function getAllCourses() {
    const response = await fetch(`${BaseURL}/courses`, {
      headers: {
        Authorization: `Bearer ${userTokens}`,
      },
    });

    const data = await response.json();
    setUserCourses(data.courses);
  }

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <>
      <View style={{ padding: 30, paddingBottom: "30%" }}>
        <TouchableOpacity
          style={{
            padding: 18,
            backgroundColor: "#75a0ff",
            borderRadius: 12,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 24, textAlign: "center" }}>
            Criar Matéria
          </Text>
        </TouchableOpacity>

        <FlatList
          style={{ display: "flex", gap: 8 }}
          data={userCourses}
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
                {item.name}
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
