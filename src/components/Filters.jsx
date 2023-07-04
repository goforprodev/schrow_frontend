import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Icon,
  Input,
  Tag,
  TagLabel,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, forwardRef } from "react";
import { BsFilter } from "react-icons/bs";

const ForwardedBsFilter = forwardRef((props, ref) => (
  <BsFilter {...props} ref={ref} />
));

function Filters() {
  const [tags, setTags] = useState([
    { id: 1, name: "Bungalow" },
    { id: 2, name: "Duplex" },
    { id: 3, name: "Story Building" },
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clicked, setClicked] = useState(null);

  const handleSubmit = (e) => {};
  const handleChange = () => {};

  return (
    <>
      <Icon as={BsFilter} boxSize={8} cursor={"pointer"} onClick={onOpen} />

      {/* Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        // finalFocusRef={btnRef}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader py={"10pt"} textAlign={"center"}>
            All Filters
          </DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit}>
              {/* Number of rooms */}
              <Flex direction={"column"} pb={"15pt"} color={"gray.700"}>
                <FormLabel fontSize={"11pt"} fontWeight={"medium"}>
                  Number of Rooms
                </FormLabel>
                <Flex gap={6}>
                  <Input
                    name="min_rooms"
                    type="number"
                    placeholder="Min"
                    mb={2}
                    required
                    onChange={handleChange}
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
                  <Input
                    name="max_rooms"
                    type="number"
                    placeholder="Max"
                    mb={2}
                    required
                    onChange={handleChange}
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
              </Flex>

              {/* Number of beds */}
              <Flex direction={"column"} pb={"15pt"} color={"gray.700"}>
                <FormLabel fontSize={"11pt"} fontWeight={"medium"}>
                  Number of Beds
                </FormLabel>
                <Flex gap={6}>
                  <Input
                    name="min_beds"
                    type="number"
                    placeholder="Min"
                    mb={2}
                    required
                    onChange={handleChange}
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
                  <Input
                    name="max_beds"
                    type="number"
                    placeholder="Max"
                    mb={2}
                    required
                    onChange={handleChange}
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
              </Flex>

              {/* Home Types */}
              <Flex direction={"column"} pb={"15pt"} color={"gray.700"}>
                <FormLabel fontSize={"11pt"} fontWeight={"medium"}>
                  Home Types
                </FormLabel>
                <Flex
                  gap={2}
                  h={"auto"}
                  flexWrap={"wrap"}
                  align={"center"}
                  cursor={"pointer"}
                >
                  {tags.map((tag) => (
                    <Button
                      key={tag.id}
                      variant={clicked === tag.id ? "solid" : "outline"}
                      onClick={() =>
                        setClicked((prev) => (prev === tag.id ? null : tag.id))
                      }
                      isDisabled={clicked !== null && clicked !== tag.id}
                    >
                      {tag.name}
                    </Button>
                  ))}
                </Flex>
              </Flex>

              {/* Prices */}
              <Flex direction={"column"} pb={"15pt"} color={"gray.700"}>
                <FormLabel fontSize={"11pt"} fontWeight={"medium"}>
                  Prices
                </FormLabel>
                <Flex gap={6}>
                  <Input
                    name="min_price"
                    type="number"
                    placeholder="Min"
                    mb={2}
                    required
                    onChange={handleChange}
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
                  <Input
                    name="max_price"
                    type="number"
                    placeholder="Max"
                    mb={2}
                    required
                    onChange={handleChange}
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
              </Flex>
              <Button w={"50%"} type="submit">
                Submit
              </Button>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {/* Drawer end */}
    </>
  );
}

export default Filters;
