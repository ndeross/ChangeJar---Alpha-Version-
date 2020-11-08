import { Input, Text } from "@ui-kitten/components";

import ErrorMessage from "./ErrorMessage";
import React from "react";
import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";

export default function AppFormField({ name, ...otherProps }) {
  
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <Input
        style={styles.formField}
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        onClick={handleChange}
        {...otherProps}
      ></Input>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  formField: {
    marginTop: 10,
  },
});
