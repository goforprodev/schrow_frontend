import React, { useState } from "react";
import {
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import { setIn } from "formik";
import { useSetRecoilState } from "recoil";

const Collaborators = ({ setCollaborators }) => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState(["name@mail.com"]);
  const toast = useToast();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      const isValidEmail = validateEmail(inputValue.trim());
      if (isValidEmail) {
        if (tags.includes(inputValue.trim())) {
          toast({
            status: "error",
            title: "Error",
            description: "This email is already added",
            duration: 3000,
            isClosable: true,
          });
        } else {
          setTags([...tags, inputValue.trim()]);
          setCollaborators((prev) => [...prev, inputValue.trim()]);
          setInputValue("");
        }
      } else {
        // Handle invalid email
        toast({
          status: "error",
          title: "Error",
          description: "This must be an email",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const validateEmail = (email) => {
    // Use a regular expression or any other email validation method
    // Here's a simple regex pattern for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleTagClose = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
    setCollaborators((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <div>
      <Wrap mb={4}>
        {tags.map((tag) => (
          <WrapItem key={tag}>
            <Tag
              size="md"
              borderRadius="full"
              variant="subtle"
              colorScheme="blue"
              mr={1}
              fontSize={"8pt"}
            >
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => handleTagClose(tag)} />
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
      <Input
        placeholder="Enter the email of your collaborator"
        type="email"
        variant={"outline"}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
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
    </div>
  );
};

export default Collaborators;
