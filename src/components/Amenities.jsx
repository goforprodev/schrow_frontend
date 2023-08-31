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

const Amenities = ({ setAmenities }) => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState(["24hours power supply"]);
  const toast = useToast();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (tags.includes(inputValue.trim())) {
        toast({
          status: "error",
          title: "Error",
          description: "This information is already added",
          duration: 3000,
          isClosable: true,
        });
      } else {
        setTags([...tags, inputValue.trim()]);
        setAmenities((prev) => [...prev, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleTagClose = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
    setAmenities((prev) => prev.filter((t) => t !== tag));
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
        placeholder="Enter useful informations of the property"
        type="text"
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

export default Amenities;
