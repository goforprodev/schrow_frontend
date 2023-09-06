import {
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Input,
  Text,
  Select,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import ErrorText from "./ErrorText";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserAction from "../actions/userActions";
import { useSecurityQuestionsAction } from "../actions/securityQuestionsActions";
import { useRecoilValue } from "recoil";
import { securityQuestionsState } from "../state/securityQuestions";

function SignUp() {
  // states
  const [loading, setLoading] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  // recoil-states
  const userAction = useUserAction();
  const securityActions = useSecurityQuestionsAction();
  const securityQuestions = useRecoilValue(securityQuestionsState);
  const [selectedSecurityQuestions, setSelectedSecurityQuestions] = useState(
    []
  );

  useEffect(() => {
    securityActions.getSecurityQuestions();
  }, []);

  const handleAddQuestion = () => {
    if (selectedQuestion && answer && selectedQuestions.length < 2) {
      if (!selectedSecurityQuestions.includes(selectedQuestion)) {
        setSelectedSecurityQuestions([
          ...selectedSecurityQuestions,
          selectedQuestion,
        ]);
        setSelectedQuestions((prevQuestions) => [
          ...prevQuestions,
          { question: selectedQuestion, answer },
        ]);
        setSelectedQuestion("");
        setAnswer("");
      } else {
        // Display an error or message indicating that the question is already selected
        toast({
          title: "Error",
          status: "error",
          description: "Cannot select the same question twice",
          isClosable: true,
          duration: 2000,
        });
      }
    } else {
      toast({
        title: "Error",
        status: "error",
        description: "Cannot select more than 2 questions",
        isClosable: true,
        duration: 2000,
      });
    }
  };

  const handleRemoveQuestion = (index) => {
    setSelectedQuestions((prevQuestions) =>
      prevQuestions.filter((_, i) => i !== index)
    );
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length < 3) {
      errors.name = "Must be 3 characters or more";
    } else if (values.name.length > 20) {
      errors.name = "Must be 20 characters or less";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Must be 8 characters or more";
    } else if (values.password.length > 20) {
      errors.password = "Must be 20 characters or less";
    }

    //use regex to check if password contains at least one uppercase, one lowercase, one number and one special character
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
        values.password
      )
    ) {
      errors.password =
        "Must contain at least one uppercase, one lowercase, one number and one special character";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Required";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords must match";
    }
    if (!values.termsAndConditions) {
      errors.termsAndConditions = "Required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAndConditions: false,
    },
    validate,
    onSubmit: async (values) => {
      setLoading(true);
      if (selectedQuestions.length < 2) {
        toast({
          title: "Error",
          status: "error",
          description: "Please select 2 security questions",
          isClosable: true,
          duration: 2000,
        });
        setLoading(false);
        return;
      }
      try {
        await userAction.register(values, selectedQuestions);
        navigate("/");
      } catch (error) {
        alert(error.message);
      }
      setLoading(false);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Flex direction={"column"} pb={"5pt"}>
          <FormLabel fontSize={"10pt"} fontWeight={"medium"} htmlFor="name">
            Name
          </FormLabel>
          <Input
            name="name"
            type="text"
            placeholder="John Doe"
            mb={2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
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
          {formik.touched.name && formik.errors.name ? (
            <ErrorText text={formik.errors.name} />
          ) : null}
        </Flex>
        <Flex direction={"column"} pb={"5pt"}>
          <FormLabel fontSize={"10pt"} fontWeight={"medium"} htmlFor="email">
            Email
          </FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="JohnDoe@gmail.com"
            mb={2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
          {formik.touched.email && formik.errors.email ? (
            <ErrorText text={formik.errors.email} />
          ) : null}
        </Flex>
        <Flex direction={"column"} pb={"5pt"} color={"gray.700"}>
          <FormLabel fontSize={"10pt"} fontWeight={"medium"} htmlFor="password">
            Password
          </FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="********"
            mb={2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
          {formik.touched.password && formik.errors.password ? (
            <ErrorText text={formik.errors.password} />
          ) : null}
        </Flex>
        <Flex direction={"column"} pb={"10pt"} color={"gray.700"}>
          <FormLabel
            fontSize={"10pt"}
            fontWeight={"medium"}
            htmlFor="confirmPassword"
          >
            Confirm Password
          </FormLabel>
          <Input
            name="confirmPassword"
            type="text"
            placeholder="********"
            mb={2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
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
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <ErrorText text={formik.errors.confirmPassword} />
          ) : null}

          <Divider my={"10pt"} />

          <FormLabel fontSize={"10pt"}>Select Two Security Question</FormLabel>
          <Select
            placeholder="Select a security question"
            value={selectedQuestion}
            onChange={(e) => setSelectedQuestion(e.target.value)}
            size={"sm"}
            fontSize={"10pt"}
          >
            {securityQuestions?.map((question, i) => (
              <option key={i} value={question}>
                {question}
              </option>
            ))}
          </Select>
          <FormLabel fontSize={"10pt"} mt={"10pt"}>
            Answer
          </FormLabel>
          <Input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
            size={"sm"}
            mb={"10pt"}
          />
          <Button variant={"outline"} onClick={handleAddQuestion} my={"5pt"}>
            Add Security Question
          </Button>
          {selectedQuestions.map((question, index) => (
            <div key={index}>
              <FormLabel fontSize={"10pt"}>
                Security Question {index + 1}
              </FormLabel>
              <Input
                type="text"
                value={question.question}
                isReadOnly
                size={"sm"}
              />
              <FormLabel fontSize={"10pt"}>Answer</FormLabel>
              <Flex gap={"10pt"} alignItems={"center"}>
                <Input
                  type="text"
                  value={question.answer}
                  isReadOnly
                  size={"sm"}
                />
                <Button
                  colorScheme="red"
                  onClick={() => handleRemoveQuestion(index)}
                >
                  X
                </Button>
              </Flex>
            </div>
          ))}

          <Checkbox
            py={"3pt"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.termsAndConditions}
            name="termsAndConditions"
          >
            <Text fontSize={"9pt"}>I agree with the terms and conditions</Text>
          </Checkbox>
          {formik.touched.termsAndConditions &&
          formik.errors.termsAndConditions ? (
            <ErrorText text={formik.errors.termsAndConditions} />
          ) : null}
        </Flex>
        <Button
          w={{ base: "100%", sm: "50%" }}
          type="submit"
          isLoading={loading}
        >
          Submit
        </Button>
      </form>
    </>
  );
}

export default SignUp;
