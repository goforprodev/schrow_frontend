import React from "react";
import { Text } from "@chakra-ui/react";

function ErrorText({ text }) {
  return (
    <Text color="red.500" fontSize="xs">
      {text}
    </Text>
  );
}

export default ErrorText;
