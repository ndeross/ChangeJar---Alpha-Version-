import * as Yup from "yup";
import * as firebase from "firebase";

import { AppForm, FormField, SubmitButton } from "../components/forms";
import { Button, Card, CheckBox, Layout, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

import { Formik } from "formik";
import ImageInput from "../components/forms/ImageInput";
import React from "react";

async function SetJarData(jarValues, navigation, UID) {
  const jarsRef = await firebase.firestore().collection("jars");

  jarsRef
    .doc(UID)
    .collection("MyJars")
    .doc()
    .set(jarValues)
    .then(() => {})
    .catch((error) => {
      alert(error);
    });

  navigation.navigate("My Account");
}

async function GetJarData() {
  var user = await firebase.auth().currentUser;
  const uid = user.uid;

  const jarsRef = await firebase.firestore().collection("jars");

  const data = await jarsRef.doc(uid).collection("MyJars");

  console.log(data);
}

function MyJars({ navigation }) {
  GetJarData();

  return (
    <Layout style={styles.container}>
      <Text> MyJars screen </Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
});

export default MyJars;
