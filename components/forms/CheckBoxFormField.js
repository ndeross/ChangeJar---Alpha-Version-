import { Input, Text, CheckBox } from "@ui-kitten/components";

import ErrorMessage from "./ErrorMessage";
import React from "react";
import { StyleSheet } from "react-native";
import { Field, useFormikContext } from "formik";

export default function CheckBoxFormField({ name, ...otherProps }) {
  const [checked, setChecked] = React.useState(false);
  const { handleOnChange } = useFormikContext();

  return (
    <>
      <CheckBox
        style={styles.checkField}
        checked={checked}
        onChange={(nextChecked) => setChecked(nextChecked)}
      >
        {`${name} ${checked}`}
      </CheckBox>
    </>
  );
}

const styles = StyleSheet.create({
  checkField: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});
