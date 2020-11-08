import "firebase/auth";

import * as firebase from "firebase";

import LoggedInHandler from "../components/forms/LoggedInHandler";
import React from "react";
import firebaseConfig from "./firebaseConfig";

// Initialize Firebase App
// class LoggedInHandler extends React.Component {
//   render() {
//     const { navigation } = this.props;
//   }

//   //navigation.navigate("Home", {user})
// }
export default LoggedInHandler;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const loginWithEmail = (email, password) => {
  console.log("got into the login");
  console.log(email);
  console.log(password);
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      const uid = response.user.uid;
      console.log("At the response thing");
      const usersRef = firebase.firestore().collection("users");
      usersRef
        .doc(uid)
        .get()
        .then((firestoreDocument) => {
          if (!firestoreDocument.exists) {
            alert("User does not exist anymore.");
            return;
          }
          const user = firestoreDocument.data();

          <LoggedInHandler userData={user} />;

          console.log("After the LoggedInHandler");
          console.log(response);
        })
        .catch((error) => {
          alert(error);
        });
    })
    .catch((error) => {
      alert(error);
    });
};

//
//
//
//Register and send to Firebase
export const registerWithEmail = (email, password, userName) => {


  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password, userName)
    .then((response) => {
      console.log(response.user.uid);
      const uid = response.user.uid;
      console.log(userName);
      const data = {
        id: uid,
        email: email,
        userName: userName,
      };
      const usersRef = firebase.firestore().collection("users");
      usersRef
        .doc(uid)
        .set(data)
        .then(() => {})
        .catch((error) => {
          alert(error);
        });
    })
    .catch((error) => {
      alert(error);
    });
};

//export const logout = () => auth.signOut();

// export const updateUsername = (username) => {
//   var user = firebase.auth().currentUser;
//   user
//     .updateProfile({
//       displayName: username,
//     })
//     .then(function () {
//       // Update successful.
//     })
//     .catch(function (error) {
//       // An error happened.
//     });
// };

//export const passwordReset = (email) => auth.sendPasswordResetEmail(email)
