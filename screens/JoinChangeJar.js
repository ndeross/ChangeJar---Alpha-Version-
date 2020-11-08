import * as Yup from "yup";

import {
  AppForm,
  FormField,
  ImageInput,
  SubmitButton,
} from "../components/forms";
import { Button, CheckBox, Icon, Layout } from "@ui-kitten/components";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { useContext } from "react";
import { registerWithEmail, updateUsername } from "../firebase/firebase";

import AuthContext from "../navigation/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//Change password validation to be more strict after testing
// Dummy comment git test

const validationSchema = Yup.object().shape({
  userName: Yup.string().required().min(1).label("Username"),
  email: Yup.string().required().email().label("Email"),
  confirmEmail: Yup.string().oneOf(
    [Yup.ref("email"), null],
    "Emails must match"
  ),
  password: Yup.string().required().min(6).label("Password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

export default function JoinChangeJar({ navigation }) {
  const { join } = useContext(AuthContext);

  const [value, setValue] = React.useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const renderEyeIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <Layout style={styles.container}>
      <KeyboardAwareScrollView style={styles.buffer}>
        <AppForm
          style={styles.form}
          initialValues={{
            userName: "",
            email: "",
            password: "",
            profilePicture: "",
            balance: 0.0,
            bio: "Change the World!",
            myJars: [],
          }}
          onSubmit={(values) => join(values)}
          validationSchema={validationSchema}
        >
          <ImageInput style={styles.imagePicker} name="profilePicture" />
          <FormField
            style={styles.input}
            name="userName"
            placeholder="Username"
            textContentType="username"
          />
          <FormField
            style={styles.input}
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            style={styles.input}
            name="confirmEmail"
            placeholder="Confirm Email"
          />
          <FormField
            style={styles.input}
            name="password"
            placeholder="Password"
            accessoryRight={renderEyeIcon}
            secureTextEntry={secureTextEntry}
          />
          <FormField
            style={styles.input}
            name="confirmPassword"
            placeholder="Confirm Password"
            accessoryRight={renderEyeIcon}
            secureTextEntry={secureTextEntry}
          />

          <SubmitButton title="Join ChangeJar!" />
        </AppForm>
      </KeyboardAwareScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  image: {
    alignSelf: "center",
    width: 250,
    height: 200,
  },
  input: {
    marginTop: 10,
  },
  form: {
    flex: 1,
    backgroundColor: "green",
    justifyContent: "center",
    //paddingTop: 50,
  },
  buffer: { marginTop: 100 },
});
