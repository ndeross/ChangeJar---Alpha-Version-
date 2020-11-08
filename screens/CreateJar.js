import * as Yup from "yup";
import * as firebase from "firebase";

import { AppForm, FormField, SubmitButton } from "../components/forms";
import { Button, Card, CheckBox, Layout, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

import { Formik } from "formik";
import ImageInput from "../components/forms/ImageInput";
import React from "react";

const validationSchema = Yup.object().shape({
  jarName: Yup.string().required().min(1).label("Jar Name"),
  jarDescription: Yup.string().required().min(1).label("Jar Description"),
});

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
    uid: uid,
  };

  return userData;
}

const HandleButton = (category, valueCategory) => {
  if (category == valueCategory) {
    return "filled";
  } else {
    return "outline";
  }
};

export default function CreateJar({ navigation }) {
  const [UID, setUID] = React.useState("");

  GetUserData().then((data) => {
    setUID(data.uid);
  });

  return (
    <Layout style={styles.container}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          category: "",
          goal: "",
          hasGoal: false,
          hasMap: false,
          imageUri: "",
          jarDescription: "",
          jarName: "",
          latitude: "",
          longitude: "",
          privateJar: false,
          thankYouMessage: "Thanks!",
          userId: UID,
        }}
        onSubmit={(values) => SetJarData(values, navigation, UID)}
      >
        {({ setFieldValue, values }) => (
          <>
            <ImageInput name="imageUri" />
            <FormField name="jarName" placeholder="Jar Name" />
            <FormField name="jarDescription" placeholder="Description" />

            <CheckBox
              style={styles.checkBox}
              checked={values.hasGoal}
              onChange={(val) => setFieldValue("hasGoal", !values.hasGoal)}
            >
              Set a Goal?
            </CheckBox>

            {values.hasGoal && <FormField name="goal" placeholder="Set Goal" />}

            <CheckBox
              style={styles.checkBox}
              checked={values.privateJar}
              onChange={(val) =>
                setFieldValue("privateJar", !values.privateJar)
              }
            >
              Private Jar? (Only visible to those with link / JarCode)
            </CheckBox>

            {values.privateJar == false && (
              <CheckBox
                style={styles.checkBox}
                checked={values.hasMap}
                onChange={(val) => setFieldValue("hasMap", !values.hasMap)}
              >
                Visible on map? (Your Jar will be visible to other Users in the
                Area)
              </CheckBox>
            )}

            {values.privateJar == true && (
              <Card>
                <Layout>
                  <Text style={styles.link}>
                    https:://ChangeJar/this.is.a.fake.link
                  </Text>
                  <Button
                    style={styles.copyButton}
                    name="Copy Link"
                    title="Copy to clipboard"
                    onPress={console.log("Link Pressed")}
                    size="small"
                  >
                    Copy to clipboard
                  </Button>
                </Layout>
              </Card>
            )}

            <FormField
              name="thankYouMessage"
              placeholder="Custom Thank You Message (Optional) "
              size="large"
            />

            {values.privateJar == false && (
              <View>
                <Text style={styles.category} category="h4">
                  What's your Jar all about?
                </Text>
                <Layout style={styles.chips}>
                  <Button
                    style={styles.tags}
                    appearance={HandleButton("Food", values.category)}
                    onPress={(val) => setFieldValue("category", "Food")}
                  >
                    Food
                  </Button>

                  <Button
                    style={styles.tags}
                    appearance={HandleButton("Art", values.category)}
                    onPress={(val) => setFieldValue("category", "Art")}
                  >
                    Art
                  </Button>

                  <Button
                    style={styles.tags}
                    appearance={HandleButton("Music", values.category)}
                    onPress={(val) => setFieldValue("category", "Music")}
                  >
                    Music
                  </Button>
                  <Button
                    style={styles.tags}
                    appearance={HandleButton("Entertainment", values.category)}
                    onPress={(val) =>
                      setFieldValue("category", "Entertainment")
                    }
                  >
                    Entertainment
                  </Button>
                  <Button
                    style={styles.tags}
                    appearance={HandleButton("Fundraising", values.category)}
                    onPress={(val) => setFieldValue("category", "Fundraising")}
                  >
                    Fundrasing
                  </Button>
                  <Button
                    style={styles.tags}
                    appearance={HandleButton("Other", values.category)}
                    onPress={(val) => setFieldValue("category", "Other")}
                  >
                    Other
                  </Button>
                </Layout>
              </View>
            )}

            <SubmitButton title="Create Jar!" />
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
  checkBox: {
    padding: 10,
  },
  JarPicture: {
    width: 100,
    height: 100,
    alignSelf: "center",
    paddingTop: 30,
  },
  imageContainer: { paddingBottom: 20 },

  copyButton: { marginTop: 10 },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "center",
  },
  tags: { marginRight: 10, marginTop: 10 },
  link: { alignSelf: "center" },
});
