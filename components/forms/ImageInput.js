import * as ImagePicker from "expo-image-picker";

import {
  Button,
  Icon,
  Layout,
  StyleService,
  Text,
  useTheme,
} from "@ui-kitten/components";
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useFormikContext } from "formik";

//import { Icon } from "@ui-kitten/eva-icons";

export default function ImageInput({ name }) {
  const theme = useTheme();

  const [image, setImage] = useState(null);
  const { setFieldValue } = useFormikContext();
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library.");
  };

  //   const handlePress = () => {
  //     if (!image) pickImage();
  //     else
  //       Alert.alert("Delete", "Are you sure you want to delete this image?", [
  //         { text: "Yes", onPress: () => onChangeImage(null) },
  //         { text: "No" },
  //       ]);
  //   };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

  

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    //   <Button title="Pick an image from camera roll" onPress={pickImage} />
    //   {image && (
    //     <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
    //   )}
    // </View>

    <TouchableWithoutFeedback onPress={pickImage}>
      <Layout
        style={[
          styles.container,
          { backgroundColor: theme["color-primary-default"] },
        ]}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200 }}
            onLoad={(e) => setFieldValue(name, image)}
          />
        ) : (
          <Icon name="camera" fill="yellow" />
        )}
      </Layout>
    </TouchableWithoutFeedback>
    //<Text> Howdy </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignItems: "center",
    //backgroundColor: "green",
    borderRadius: 15,
    height: 98,
    justifyContent: "center",
    overflow: "hidden",
    width: 98,
    margin: 20
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
