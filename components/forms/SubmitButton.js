import { Button } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";

export default function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();

  return (
    <Button
      style={styles.button}
      onPress={handleSubmit}
      size="large"
    >
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
});
