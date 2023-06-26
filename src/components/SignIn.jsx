import { Button, Flex, FormLabel, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import useUserAction from "../actions/userActions";

function SignIn() {
  const userAction = useUserAction();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validate,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        setLoading(false);
        await userAction.login(values);
        navigate("/");
      } catch (error) {
        setLoading(false);
        alert(error.message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex direction={"column"} pb={"5pt"}>
        <FormLabel fontSize={"10pt"} fontWeight={"medium"} htmlFor="email">
          Email
        </FormLabel>
        <Input
          name="email"
          type="email"
          placeholder="JohnDoe@gmail.com"
          mb={2}
          required
          onChange={formik.handleChange}
          value={formik.values.email}
          fontSize={"10pt"}
          borderColor="#888"
          _placeholder={{
            color: "gray.500",
          }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "#000",
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "#000",
          }}
          bg={"gray.50"}
        />
      </Flex>
      <Flex direction={"column"} pb={"10pt"} color={"gray.700"}>
        <FormLabel fontSize={"10pt"} fontWeight={"medium"} htmlFor="password">
          Password
        </FormLabel>
        <Input
          name="password"
          type="password"
          placeholder="********"
          mb={2}
          required
          onChange={formik.handleChange}
          value={formik.values.password}
          fontSize={"10pt"}
          borderColor="#888"
          _placeholder={{
            color: "gray.500",
          }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "#000",
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "#000",
          }}
          bg={"gray.50"}
        />
      </Flex>
      <Button w={{ base: "100%", sm: "50%" }} type="submit" isLoading={loading}>
        Submit
      </Button>
      <Text as="p" py="3pt" fontSize={"10pt"} color={"brand.100"}>
        <Link>Forgot your password?</Link>
      </Text>
    </form>
  );
}

export default SignIn;
