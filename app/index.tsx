import {
  GoogleSignin,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUserData, useUserTokens } from "./store/useUserCourses";
router;

GoogleSignin.configure({
  webClientId:
    "175431302002-1ebrb3oe0thcbko0a0qeterbufqbs5ga.apps.googleusercontent.com",
  iosClientId:
    "175431302002-lpoiejkvokrt5sjpouj0hjpnf8eb1vtb.apps.googleusercontent.com",
  scopes: [
    "https://www.googleapis.com/auth/classroom.courses.readonly",
    "https://www.googleapis.com/auth/classroom.coursework.students",
    "https://www.googleapis.com/auth/classroom.student-submissions.me.readonly",
  ],
});

export default function Index() {
  const styles = StyleSheet.create({
    mainContainer: {
      display: "flex",
      gap: 20,
      padding: 20,
      alignItems: "center",
    },
    loginWelcome: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      padding: 10,
      gap: 16,
    },
    selectAccount: {
      width: "40%",
      fontSize: 18,
      backgroundColor: "#1194ff",
      textAlignVertical: "center",
      padding: 8,
      color: "white",
      borderRadius: 20,
    },
    accountComponent: {
      width: "78%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: "#dfdfdf",
      padding: 8,
      borderRadius: 230,
    },
    enterComponent: {
      width: 160,
      fontSize: 18,
      backgroundColor: "#1194ff",
      textAlignVertical: "center",
      textAlign: "center",
      padding: 8,
      color: "white",
      borderRadius: 10,
    },
  });
  const setAuth = useUserData((state) => state.setData);
  const auth = useUserData((state) => state.data);

  const setToken = useUserTokens((state) => state.setTokens);
  const token = useUserTokens((state) => state.tokens);

  async function handleGoogleSignin() {
    try {
      GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        setAuth(response.data);
        const tokens = await GoogleSignin.getTokens();
        setToken(tokens.accessToken);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.loginWelcome}>
        <Text style={{ fontSize: 40, textAlign: "center" }}>
          Bem-Vindo Estudante!
        </Text>
        <Text style={{ fontSize: 24, textAlign: "center" }}>
          Entre com sua conta do Google que contém suas salas do Google
          Classroom
        </Text>
      </View>

      <TouchableOpacity onPress={handleGoogleSignin}>
        <Text style={styles.selectAccount}>Selecionar Conta Google</Text>
      </TouchableOpacity>

      {auth ? (
        <View
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
          }}
        >
          <View style={styles.accountComponent}>
            <Image
              style={{ width: 50, height: 50, borderRadius: 100 }}
              source={{ uri: auth.user.photo }}
            />
            <View>
              <Text style={{ fontSize: 18 }}>{auth.user.email}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => router.push("/main/(tabs)/courses")}>
            <Text style={styles.enterComponent}>Entrar</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
