import React from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import * as firebase from "firebase";
import { Avatar, Layout, Text } from "@ui-kitten/components";
import { color } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

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
  };

  return userData;
}

function ProfileModule(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [balance, setBalance] = React.useState("");

  GetUserData().then((data) => {
    setName(data.name);
    setEmail(data.email);
    setBalance(data.balance);
  });

  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("My Account")}>
      <Layout style={styles.splitter}>
        <Avatar
          style={styles.profilePic}
          source={require("../../assets/me.png")}
          size="giant"
        />
        <Layout style={styles.container}>
          <Text style={styles.text}> {name} </Text>
          <Text style={styles.text}> {email} </Text>
          <Text style={styles.text}> Balance: {balance} </Text>
        </Layout>
      </Layout>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingLeft: 5,
  },
  text: { fontSize: 15, paddingTop: 5 },
  splitter: {
    flexDirection: "row",
    padding: 30,
  },
  profilePic: {
    paddingRight: 15,
    flexDirection: "row",
    marginTop: 35,
    marginLeft: -15,
  },
});

export default ProfileModule;
