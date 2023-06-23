import React, { useState } from 'react';
import { Input, Tag, TagCloseButton, TagLabel, Wrap, WrapItem } from '@chakra-ui/react';

const Collaborators = () => {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState(['name@mail.com']);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
       if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      const isValidEmail = validateEmail(inputValue.trim());
      if (isValidEmail) {
        setTags([...tags, inputValue.trim()]);
        setInputValue('');
      } else {
        // Handle invalid email
        alert('Must be an email');
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
              colorScheme="teal"
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
        type='email'
        variant={'outline'}
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