import * as Yup from "yup";

import { AppForm, FormField, SubmitButton } from "../components/forms";
import { Icon, Layout, Text } from "@ui-kitten/components";
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import React from "react";
import { Formik, useFormikContext } from "formik";

import * as firebase from "firebase";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
  userName: Yup.string().required().min(1).label("Username"),
  password: Yup.string().required().min(6).label("Password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

async function GetUserData() {
  // Very proud of how clean i was able to get this

  var user = await firebase.auth().currentUser;
  const uid = user.uid;
  const usersRef = await firebase.firestore().collection("users");
  const response = await usersRef.doc(uid).get();
  const data = await response.data();

  // Building the return object using both databases

  const userData = {
    name: user.displayName,
    bio: data.bio,
  };

  return userData;
}

async function HandleProfileChange(values, navigation) {
  const data = {
    displayName: values.userName,
    bio: values.bio,
  };

  var user = await firebase.auth().currentUser;
  const uid = user.uid;
  
  const usersRef = await firebase.firestore().collection("users").doc(uid);

  user.updateProfile({ displayName: values.userName });

  usersRef.update({
    bio: values.bio,
  });

  navigation.navigate("My Account");
}

export default function EditAccount({ navigation }) {
  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");

  GetUserData().then((data) => {
    setName(data.name);
    setBio(data.bio);
  });

  return (
    <Layout style={styles.container}>
      <View style={styles.image}>
        <Image
          style={styles.profilePic}
          source={require("../../assets/chera.jpg")}
        />
      </View>

      <Formik
        initialValues={{
          userName: name,
          bio: bio,
          // profilePic: "",
        }}
        onSubmit={(values) => HandleProfileChange(values, navigation)}
        enableReinitialize={true}
      >
        {({ setFieldValue, values }) => (
          <>
            <Text> Username: </Text>

            <FormField
              name="userName"
              placeholder="Username"
              textContentType="username"
              value={values.userName}
            />
            <Text> Bio: </Text>

            <FormField name="bio" placeholder="Bio" value={values.bio} />

            <SubmitButton title="Save Changes" />
          </>
        )}
      </Formik>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    padding: 20,
    flex: 1,
  },

  category: { marginTop: 30, alignSelf: "center" },
  image: {
    alignSelf: "center",
    width: 250,
    height: 200,
  },
  form: {
    flex: 1,
    paddingTop: 50,
  },

  JarPicture: {
    width: 100,
    height: 100,
    alignSelf: "center",
    paddingTop: 30,
  },
  imageContainer: { paddingBottom: 20 },

  link: {
    paddingTop: 15,
    alignSelf: "center",
    color: "green",
  },
  divider: { padding: 30 },

  profilePic: {
    width: 175,
    height: 175,
    borderRadius: 400 / 2,
    alignSelf: "center",
  },
});
