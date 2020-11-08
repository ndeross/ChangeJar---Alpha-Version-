import { Button, Layout, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import AuthContext from "../navigation/AuthContext";
import React from "react";
 
function Home({ navigation }) {

  async function getToken(user) {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      console.log(data);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  const { signOut }  = React.useContext(AuthContext);

  return (

    <> 
    <Layout style={styles.container}>
      <Text style={styles.text}> This is the home page</Text>
      <Button onPress={getToken} style={styles.button}> Press Me For User Info</Button>
      <Button onPress={signOut} style={styles.button}> Sign Out </Button> 
    </Layout>

    </> 
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignContent: "center", padding: 10 },
  button: { margin: 10}, 
  bottomTab: { flex: 1},
  text: { textAlign: "center", paddingBottom: 15, }
});

export default Home;
