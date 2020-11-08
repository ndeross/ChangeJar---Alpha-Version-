import * as Yup from "yup";

import { AppForm, FormField, SubmitButton } from "../components/forms";
import {
  Button,
  Icon,
  Layout,
  Input,
  CheckBox,
  Avatar,
  Card,
  ButtonGroup,
  Text,
} from "@ui-kitten/components";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import React from "react";
import { Formik, useFormikContext } from "formik";


const validationSchema = Yup.object().shape({
  jarName: Yup.string().required().min(1).label("Jar Name"),
  jarDescription: Yup.string().required().min(1).label("Jar Description"),
});


const HandleButton = (category, valueCategory) => {
  if (category == valueCategory) {
    return "filled";
  } else {
    return "outline";
  }
};

export default function EditJar(jarValues) {
  
const [value, setValue] = React.useState("");



  return (
    <Layout style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.JarPicture}
          source={require("../../assets/placeholder.png")}
        />
      </View>

      <Formik

        initialValues={{jarName: "Nicks Jar"}}
        enableReinitialize={true}

        onSubmit={(values) => console.log(values)}
      >
        {({ setFieldValue, values}) => (
          <>
         
            <FormField name = "jarName"
              onChangeText={(value) => setFieldValue("jarName", value)}
               />


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

});


// Add this stuff back 



            {/* <FormField name="jarDescription" placeholder="description"  />

          
             <FormField name="goal" placeholder="goal" />

            <FormField
              name="thankYouMessage"
              placeholder="thank you"
              size="large"
            /> */}
