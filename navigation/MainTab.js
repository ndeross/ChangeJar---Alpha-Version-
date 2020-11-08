import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import Featured from "../screens/Featured";

import AllJars from "../screens/AllJars";
import MyJars from "../screens/MyJars";

import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
} from "@ui-kitten/components";

const Tab = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Home" />
    <BottomNavigationTab title="Featured" />
    <BottomNavigationTab title="All Jars" />
    <BottomNavigationTab title="MyJars" />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Featured" component={Featured} />
    <Tab.Screen name="All Jars" component={AllJars} />
    <Tab.Screen name="My Jars" component={MyJars} />
  </Tab.Navigator>
);

export default function MainTab() {
  return <TabNavigator style={styles.tab} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomNavigation: {
    marginVertical: 8,
    position: "absolute",
    bottom: 0,
  },
  tab: {
    marginVertical: 10,
  },
});
