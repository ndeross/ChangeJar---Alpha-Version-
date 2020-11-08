import { Image, StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";

import React from "react";

function SplashScreen(props) {
  return (
    <Layout style={styles.container}>
      <Image
        source={require("../../assets/FullLogo.png")}
        style={styles.image}
      ></Image>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    alignSelf: "center",
    width: 350,
    height: 300,
  },
});

export default SplashScreen;
