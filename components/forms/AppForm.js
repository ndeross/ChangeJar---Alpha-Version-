import { Formik } from "formik";
import React from "react";

export default function AppForm({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  values,
  style
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      style={style}
    >
      {({ setFieldValue, values }) => 
      <>{children}</>}
    </Formik>
  );
}
