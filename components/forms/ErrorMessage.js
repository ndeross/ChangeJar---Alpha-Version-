import React from "react";
import { Text } from "@ui-kitten/components";

export default function ErrorMessage({ error, visible }) {
  if (!error || !visible) return null;

  return <Text status="danger">{error}</Text>;
}
