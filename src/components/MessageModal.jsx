import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MessageModal = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const [message, setMessage] = useState({
    name: "",
    email: "",
    phone_number: "",
    message: "",
  });
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/users.php", {
        endpoint: "leave-message",
        message: message.message,
      });

      if (!data.error) {
        toast({
          title: "Success",
          status: "success",
          isClosable: true,
          description: data.data.msg,
          duration: 3000,
        });
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setMessage((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <Modal isOpen={open} onClose={handleClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Leave a message</ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Flex
              direction="column"
              w={{ base: "100%", md: "90%" }}
              mx={"auto"}
              py={"5pt"}
            >
              <form onSubmit={handleSubmit}>
                <Flex direction={"column"} pb={"10pt"} color={"gray.700"}>
                  <FormLabel fontSize={"10pt"} fontWeight={"medium"}>
                    Full name
                  </FormLabel>
                  <Input
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    mb={2}
                    required
                    onChange={handleChange}
                    fontSize={"10pt"}
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
                  <FormLabel fontSize={"10pt"} fontWeight={"medium"}>
                    Email
                  </FormLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="name@email.com"
                    mb={2}
                    required
                    onChange={handleChange}
                    fontSize={"10pt"}
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
                  <FormLabel fontSize={"10pt"} fontWeight={"medium"}>
                    Phone Number
                  </FormLabel>
                  <Input
                    name="phone_number"
                    type="text"
                    placeholder="+234-000-000-000"
                    mb={2}
                    required
                    onChange={handleChange}
                    fontSize={"10pt"}
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
                  <FormLabel fontSize={"10pt"} fontWeight={"medium"}>
                    Your message
                  </FormLabel>
                  <Textarea
                    name="message"
                    placeholder="Leave a message for us here"
                    size="sm"
                    fontSize={"10pt"}
                    mb={2}
                    required
                    onChange={handleChange}
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
                <Button
                  isLoading={loading}
                  type="submit"
                  w={{ base: "100%", md: "100%" }}
                >
                  Submit
                </Button>
              </form>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MessageModal;
