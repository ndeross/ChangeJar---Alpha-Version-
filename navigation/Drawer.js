import { createDrawerNavigator } from "@react-navigation/drawer";

import React from "react";
import MainTab from "./MainTab";
import ProfileModule from "../components/ProfileModule";

import AsyncStorage from "@react-native-community/async-storage";

import {
  Drawer,
  DrawerItem,
  IndexPath,
  Divider,
  Icon,
} from "@ui-kitten/components";

import { StyleSheet, ImageBackground } from "react-native";

import Following from "../screens/Following";
import MyAccount from "../screens/MyAccount";
import Wallet from "../screens/Wallet";
import DonatedJars from "../screens/DonatedJars";
import ScanJarCode from "../screens/ScanJarcode";

const HomeIcon = (props) => <Icon {...props} name="home-outline" />;

const FollowingIcon = (props) => <Icon {...props} name="people-outline" />;

const WalletIcon = (props) => <Icon {...props} name="credit-card-outline" />;

const DonatedIcon = (props) => <Icon {...props} name="gift-outline" />;

const JarcodeIcon = (props) => <Icon {...props} name="camera-outline" />;

const DrawerStack = createDrawerNavigator();

const Header = (props) => (
  <React.Fragment>
    <ProfileModule />

    <Divider />
  </React.Fragment>
);

const DrawerContent = ({ navigation, state }) => (
  <Drawer
    header={Header}
    selectedIndex={new IndexPath(state.index)}
    onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
  >
    <DrawerItem title="Home" accessoryLeft={HomeIcon} />
    <DrawerItem title="Following" accessoryLeft={FollowingIcon} />
    <DrawerItem title="My Wallet" accessoryLeft={WalletIcon} />
    <DrawerItem title="Donated Jars" accessoryLeft={DonatedIcon} />
    <DrawerItem title="Scan Jarcode" accessoryLeft={JarcodeIcon} />
  </Drawer>
);

const DrawerNavigator = () => (
  <DrawerStack.Navigator
    drawerContent={(props) => <DrawerContent {...props} />}
  >
    <DrawerStack.Screen name="Home" component={MainTab} />
    <DrawerStack.Screen name="Following" component={Following} />
    <DrawerStack.Screen name="My Wallet" component={Wallet} />
    <DrawerStack.Screen name="Donated Jars" component={DonatedJars} />
    <DrawerStack.Screen name="Scan JarCode" component={ScanJarCode} />
  </DrawerStack.Navigator>
);

export default function NavDrawer() {
  return <DrawerNavigator />;
}

const styles = StyleSheet.create({
  divider: {
    paddingTop: 100,
  },

  header: {
    height: 100,
    width: 100,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
});
