import { useRouteError } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Flex
        w={"100%"}
        h={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        fontSize={"2em"}
      >
        😥
        <Text>Oops Something went wrong</Text>
        <i>{error.statusText || error.message}</i>
      </Flex>
    </div>
  );
}
