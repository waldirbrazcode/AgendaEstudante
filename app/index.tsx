import {
  GoogleSignin,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import { useState } from "react";
import { Button, Image, Text, View } from "react-native";

GoogleSignin.configure({
  iosClientId:
    "175431302002-lpoiejkvokrt5sjpouj0hjpnf8eb1vtb.apps.googleusercontent.com",
});

export default function Index() {
  const [auth, setAuth] = useState<any>(null);

  async function handleGoogleSignin() {
    try {
      GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: false,
      });
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        setAuth(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View
      style={{
        flex: 1,
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Entrar com Google" onPress={handleGoogleSignin} />

      {auth ? (
        <View>
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: auth.user.photo }}
          />
          <Text>{auth.user.name}</Text>
          <Text>{auth.user.email}</Text>
        </View>
      ) : (
        <Text>Not authorized yet</Text>
      )}
    </View>
  );
}
