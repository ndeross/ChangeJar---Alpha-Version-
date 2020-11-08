import { CheckBox, Input, Text } from "@ui-kitten/components";

import ErrorMessage from "./ErrorMessage";
import React from "react";
import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";

export default function CheckBox({ name, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    marginTop: 10,
  },
});
