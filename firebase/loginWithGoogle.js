const _loginWithGoogle = async function () {
  try {
    const result = await Expo.Google.logInAsync({
      androidClientId: "YOUR_ANDROID_CLIENT_ID",
      iosClientId: "YOUR_iOS_CLIENT_ID",
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      const { idToken, accessToken } = result;
      const credential = firebase.auth.GoogleAuthProvider.credential(
        idToken,
        accessToken
      );
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((res) => {
          // user res, create your user, do whatever you want
        })
        .catch((error) => {
          console.log("firebase cred err:", error);
        });
    } else {
      return { cancelled: true };
    }
  } catch (err) {
    console.log("err:", err);
  }
};
