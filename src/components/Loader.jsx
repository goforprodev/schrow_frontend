import React from "react";
import { Box, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size="xl" color="blue.500" thickness="4px" />
    </Box>
  );
};

export default Loader;
