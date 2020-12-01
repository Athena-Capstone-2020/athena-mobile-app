import * as Google from "expo-google-app-auth";
import firebase from "../../firebase/config";

export default function GoogleAuth() {
  const SignInWithGoogle = async () => {
    try {
      const { type, accessToken, user } = await Google.logInAsync({
        behavior: "web",
        iosClientId:
          "1021500470015-rnv13the9g7a0sh6qn7i80jupdq579bi.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (type === "success") {
        return { user, accessToken };
      } else {
        return { cancelled: true };
      }
      // });
    } catch (e) {
      return { error: true };
    }
  };

  return {
    SignInWithGoogle,
  };
}
