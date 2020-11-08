import "firebase/auth";

import * as firebase from "firebase";

import { StyleSheet, View } from "react-native";

import React from "react";
import firebaseConfig from "./firebaseConfig";
import { useNavigation } from "@react-navigation/native";

function loginWithEmail(email, password) {
  const navigation = useNavigation();
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
          console.log("it didnt fail yet");

          navigation.navigate("Welcome", { user });

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

  return;
}

export default loginWithEmail;
