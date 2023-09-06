import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { securityQuestionsState } from "../state/securityQuestions";
import { Flex, FormLabel, Select, Text, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { activeTabIndexState } from "../state/tabs";
import { useToast } from "@chakra-ui/react";

export default function ForgotPassword() {
  const securityQuestions = useRecoilValue(securityQuestionsState);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedSecurityQuestions, setSelectedSecurityQuestions] = useState(
    []
  );
  const [answer, setAnswer] = useState("");
  const [email, setEmail] = useState("");
  const toast = useToast();
  const setTabIndex = useSetRecoilState(activeTabIndexState);

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

  const handleSubmit = async () => {
    if (email && selectedQuestions.length === 2) {
      try {
        const response = await axios.post("/api/users.php", {
          email,
          endpoint: "verify-questions",
          question_1: selectedQuestions[0].question,
          answer_1: selectedQuestions[0].answer,
          question_2: selectedQuestions[1].question,
          answer_2: selectedQuestions[1].answer,
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
        }
      } catch (error) {}
    } else {
      toast({
        title: "Error",
        status: "error",
        description: "Please select two security questions",
        isClosable: true,
        duration: 2000,
      });
    }
  };

  return (
    <>
      <Flex direction={"column"}>
        <Text fontSize={"12pt"} pb={"5pt"}>
          Answer the following security questions
        </Text>

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

        <FormLabel fontSize={"10pt"}>Select Two Security Questions</FormLabel>
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
      </Flex>
      <Button variant={"outline"} onClick={handleAddQuestion} my={"5pt"}>
        Add Security Question
      </Button>
      {selectedQuestions.map((question, index) => (
        <div key={index}>
          <FormLabel fontSize={"10pt"}>Security Question {index + 1}</FormLabel>
          <Input type="text" value={question.question} isReadOnly size={"sm"} />
          <FormLabel fontSize={"10pt"}>Answer</FormLabel>
          <Flex gap={"10pt"} alignItems={"center"}>
            <Input type="text" value={question.answer} isReadOnly size={"sm"} />
            <Button
              colorScheme="red"
              onClick={() => handleRemoveQuestion(index)}
            >
              X
            </Button>
          </Flex>
        </div>
      ))}
      <Flex>
        <Button onClick={handleSubmit}>Submit</Button>
      </Flex>
      Dont have an account?{" "}
      <Text
        as={"span"}
        color={"brand.100"}
        cursor={"pointer"}
        onClick={() => setTabIndex(1)}
      >
        signup
      </Text>
    </>
  );
}
