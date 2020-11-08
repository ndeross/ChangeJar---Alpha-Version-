import { StyleSheet, View } from "react-native";

import { Component } from "react";
import React from "react";
import { useNavigation } from "@react-navigation/native";

function LoggedInHandler(user) {
  const navigation = useNavigation();
  return console.log("In the logged in handler");

  //navigation.navigate("Home", {user})
}
export default LoggedInHandler;
