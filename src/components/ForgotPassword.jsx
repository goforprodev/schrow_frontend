import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { activeTabIndexState } from "../state/tabs";

export default function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userId, setUserId] = useState(null);
  const [securityQuestions, setSecurityQuestions] = useState({});
  const [answer_1, setAnswer_1] = useState("");
  const [answer_2, setAnswer_2] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const setTabIndex = useSetRecoilState(activeTabIndexState);

  const handleNextStep = async () => {
    if (currentStep === 1) {
      if (email) {
        setLoading(true);
        try {
          const response = await axios.post("/api/users.php", {
            email,
            endpoint: "get-user-questions",
          });
          const { data } = response;
          if (!data.error) {
            setSecurityQuestions(data.data);
            setCurrentStep(2);
          } else {
            toast({
              title: "Error",
              status: "error",
              description: data.data.msg,
              isClosable: true,
              duration: 2000,
            });
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleSubmit = async () => {
    if (email && answer_1 && answer_2) {
      setLoading(true);
      try {
        const response = await axios.post("/api/users.php", {
          endpoint: "verify-questions",
          email,
          question_1: securityQuestions?.question_1,
          answer_1,
          question_2: securityQuestions?.question_2,
          answer_2,
        });
        const { data } = response;
        if (!data.error) {
          toast({
            title: "Success",
            status: "success",
            description: data.data.msg,
            isClosable: true,
            duration: 2000,
          });
          setUserId(data.data.id);
          setCurrentStep(3);
        } else {
          toast({
            title: "Error",
            status: "error",
            description: data.data.msg,
            isClosable: true,
            duration: 2000,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      toast({
        title: "Error",
        status: "error",
        description: "Please fill in all fields",
        isClosable: true,
        duration: 2000,
      });
    }
  };

  const resetPassword = async () => {
    if (password && confirmPassword && userId && password === confirmPassword) {
      setLoading(true);
      try {
        const response = await axios.post("/api/users.php", {
          endpoint: "reset-password",
          id: userId,
          password,
        });
        const { data } = response;
        if (!data.error) {
          setTabIndex(0);
        } else {
          toast({
            title: "Error",
            status: "error",
            description: data.data.msg,
            isClosable: true,
            duration: 2000,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      toast({
        title: "Error",
        status: "error",
        description: "Fill in all fields correctly",
        isClosable: true,
        duration: 2000,
      });
    }
  };
  return (
    <>
      <Flex direction={"column"}>
        <VStack spacing={4} align={"stretch"}>
          {currentStep === 1 && (
            <FormControl>
              <FormLabel fontSize={"10pt"}>Email</FormLabel>
              <Input
                type="email"
                required
                size={"sm"}
                fontSize={"10pt"}
                mb={"5pt"}
                placeholder="JohnDoe@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          )}

          {currentStep === 2 && (
            <FormControl>
              <Text fontSize={"12pt"} color={"gray.500"}>
                Answer the following security questions
              </Text>
              <Input
                type="text"
                placeholder={securityQuestions?.question_1}
                onChange={(e) => setAnswer_1(e.target.value)}
                my={3}
                fontSize={"10pt"}
                id="answer_1"
              />
              <Input
                type="text"
                id="answer_2"
                placeholder={securityQuestions?.question_2}
                onChange={(e) => setAnswer_2(e.target.value)}
                mb={"5pt"}
                fontSize={"10pt"}
              />
            </FormControl>
          )}

          {currentStep === 3 && (
            <FormControl>
              <Text fontSize={"12pt"} color={"gray.500"}>
                Enter new password
              </Text>
              <Input
                type="text"
                placeholder="New Password"
                fontSize={"10pt"}
                onChange={(e) => setPassword(e.target.value)}
                my={3}
              />
              <Input
                type="text"
                placeholder="Confirm New Password"
                fontSize={"10pt"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                mb={"5pt"}
              />
            </FormControl>
          )}
        </VStack>
        <Flex>
          <Button
            colorScheme="blue"
            onClick={
              (currentStep === 3 && resetPassword) ||
              (currentStep === 2 && handleSubmit) ||
              (currentStep === 1 && handleNextStep)
            }
            isLoading={loading}
            isDisabled={
              (currentStep === 1 && !email) ||
              (currentStep === 2 && (!securityQuestions || loading))
            }
          >
            {currentStep === 1 ? "Next" : "Submit"}
          </Button>
        </Flex>
        <Text fontSize={"10pt"} color={"gray.500"} mt={3}>
          Dont have an account?{" "}
          <Text
            as={"span"}
            color={"brand.100"}
            cursor={"pointer"}
            onClick={() => setTabIndex(1)}
          >
            signup
          </Text>
        </Text>
      </Flex>
    </>
  );
}
