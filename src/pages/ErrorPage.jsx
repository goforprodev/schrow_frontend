import { useRouteError } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Flex
        w={"100vw"}
        h={"100vh"}
        alignItems={"center"}
        justifyContent={"center"}
        direction={"column "}
      >
        <Text fontSize={"4em"}>😥</Text>
        <Text fontSize={"2em"}>Oops Something went wrong</Text>
        <i>{error.statusText || error.message} Please Reload </i>
      </Flex>
    </div>
  );
}
