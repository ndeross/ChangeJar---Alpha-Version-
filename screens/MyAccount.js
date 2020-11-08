import React from "react";
import { View, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import * as firebase from "firebase";
import { Layout, Text, Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

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
    email: user.email,
    balance: data.balance,
    bio: data.bio,
  };

  return userData;
}

function MyAccount({ navigation }) {
  //Defining the state variables rendered in the screen

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [balance, setBalance] = React.useState("");

  // This function returns a promise, makes sure it is resolved, and then sets the state variables

  GetUserData().then((data) => {
    setName(data.name);
    setEmail(data.email);
    setBalance(data.balance);
    setBio(data.bio);
  });

  return (
    <Layout style={styles.profileContainer}>
      <Layout style={styles.header}>
        <Image
          style={styles.profilePic}
          source={require("../../assets/me.png")}
        />

        <Layout style={styles.padding}>
          <Text style={styles.headerText}> {name} </Text>
          <Text style={styles.headerText}> {email} </Text>
          <Text style={styles.headerText}> Balance: ${balance} </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Edit Account")}>
            <Text style={{ paddingLeft: 10 }}> Edit Account </Text>
          </TouchableOpacity>
          <View style={styles.splitter} />
        </Layout>
      </Layout>
      <Layout style={styles.body}></Layout>
      <Text style={{ fontSize: 20, paddingTop: 10 }}> Bio: </Text>
      <Text style={styles.headerText}> {bio} </Text>
      <Layout style={styles.buttonFormatter}>
        <Button
          style={styles.buttons}
          size="large"
          onPress={() => navigation.navigate("Create Jar")}
        >
          New Jar
        </Button>
        <Button
          style={styles.buttons}
          size="large"
          onPress={() => console.log("pressed")}
        >
          My Jars
        </Button>

        <Button
          style={styles.buttons}
          size="large"
          onPress={() => console.log("pressed")}
        >
          Closed Jars
        </Button>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    paddingTop: 80,
    paddingLeft: 10,
    flex: 1,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 400 / 2,
  },
  header: {
    flexDirection: "row",
  },
  headerText: {
    paddingLeft: 10,
    fontSize: 23,
    paddingBottom: 5,
  },
  padding: {
    marginTop: 10,
  },
  splitter: {
    paddingBottom: 20,
  },
  body: {
    flexDirection: "column",
  },
  buttons: {
    marginTop: 20,
    justifyContent: "center",
  },
  buttonFormatter: {
    padding: 20,
  },
});

export default MyAccount;
