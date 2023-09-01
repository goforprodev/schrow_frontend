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
  const [values, setValues] = useState({
    min_rooms: "",
    max_rooms: "",
    min_beds: "",
    max_beds: "",
    home_types: "",
    min_price: "",
    max_price: "",
    min_floor: "",
    max_floor: "",
    min_units: "",  
    max_units: "",
    min_baths: "",
    max_baths: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { min_rooms, max_rooms, min_beds, max_beds, home_types, min_price, max_price, min_floor, max_floor, min_units, max_units, min_baths, max_baths } = values;
    const price_range = `${min_price}-${max_price}`;
    const rooms_range = `${min_rooms}-${max_rooms}`;
    const beds_range = `${min_beds}-${max_beds}`;
    const floor_range = `${min_floor}-${max_floor}`;
    const units_range = `${min_units}-${max_units}`;
    const baths_range = `${min_baths}-${max_baths}`;
  console.log({ price_range, rooms_range, beds_range, floor_range, units_range, baths_range, home_types });


  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Icon
        as={BsFilter}
        boxSize={8}
        cursor={"pointer"}
        onClick={onOpen}
        color={"gray.500"}
      />

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
                    _placeholder={{
                      color: "gray.500",
                    }}
                    _hover={{
                      bg: "white",
                      border: "1px solid",
                      borderColor: "#888",
                    }}
                    _focus={{
                      outline: "none",
                      bg: "white",
                      border: "1px solid",
                      borderColor: "#888",
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
                    _placeholder={{
                      color: "gray.500",
                    }}
                    _hover={{
                      bg: "white",
                      border: "1px solid",
                      borderColor: "#888",
                    }}
                    _focus={{
                      outline: "none",
                      bg: "white",
                      border: "1px solid",
                      borderColor: "#888",
                    }}
                    bg={"gray.50"}
                  />
                </Flex>
              </Flex>
                    
            {/* Number of floors */}
              <Flex direction={"column"} pb={"15pt"} color={"gray.700"}>
                <FormLabel fontSize={"11pt"} fontWeight={"medium"}>
                  Number of Floors
                </FormLabel>
                <Flex gap={6}>
                  <Input
                    name="min_floor"
                    type="number"
                    placeholder="Min"
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
                      borderColor: "#888",
                    }}
                    _focus={{
                      outline: "none",
                      bg: "white",
                      border: "1px solid",
                      borderColor: "#888",
                    }}
                    bg={"gray.50"}
                  />
                  <Input
                    name="max_floor"
                    type="number"
                    placeholder="Max"
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
                      borderColor: "#888",
                    }}
                    _focus={{
                      outline: "none",
                      bg: "white",
                      border: "1px solid",
                      borderColor: "#888",
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
                    _placeholder={{
                      color: "gray.500",
                    }}
                    _hover={{
                      bg: "white",
                      border: "1px solid",
                      borderColor: "#888",
                    }}
                    _focus={{
                      outline: "none",
                      bg: "white",
                      border: "1px solid",
                      borderColor: "#888",
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
                    _placeholder={{
                      color: "gray.500",
                    }}
                    _hover={{
                      bg: "white",
                      border: "1px solid",
                      borderColor: "#888",
                    }}
                    _focus={{
                      outline: "none",
                      bg: "white",
                      border: "1px solid",
                      borderColor: "#888",
                    }}
                    bg={"gray.50"}
                  />
                </Flex>
              </Flex>

            {/* Number of bathrooms*/}
              <Flex direction={"column"} pb={"15pt"} color={"gray.700"}>
                <FormLabel fontSize={"11pt"} fontWeight={"medium"}>
                  Number of Bathrooms
                </FormLabel>
                <Flex gap={6}>
                  <Input
                    name="min_baths"
                    type="number"
                    placeholder="Min"
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
                      borderColor: "#888",
                    }}
                    _focus={{
                      outline: "none",
                      bg: "white",
                      border: "1px solid",
                      borderColor: "#888",
                    }}
                    bg={"gray.50"}
                  />
                  <Input
                    name=""
                    type="number"
                    placeholder="Max"
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
                      borderColor: "#888",
                    }}
                    _focus={{
                      outline: "none",
                      bg: "white",
                      border: "1px solid",
                      borderColor: "#888",
                    }}
                    bg={"gray.50"}
                  />
                </Flex>
              </Flex>

            {/* Number of Units*/}
              <Flex direction={"column"} pb={"15pt"} color={"gray.700"}>
                <FormLabel fontSize={"11pt"} fontWeight={"medium"}>
                  Number of Units 
                </FormLabel>
                <Flex gap={6}>
                  <Input
                    name="min_units"
                    type="number"
                    placeholder="Min"
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
                      borderColor: "#888",
                    }}
                    _focus={{
                      outline: "none",
                      bg: "white",
                      border: "1px solid",
                      borderColor: "#888",
                    }}
                    bg={"gray.50"}
                  />
                  <Input
                    name="max_units"
                    type="number"
                    placeholder="Max"
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
                      borderColor: "#888",
                    }}
                    _focus={{
                      outline: "none",
                      bg: "white",
                      border: "1px solid",
                      borderColor: "#888",
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
                      onClick={() =>{
                        setClicked((prev) => (prev === tag.id ? null : tag.id))
                        setValues((prev) => ({ ...prev, home_types: tag.id }))
                      }}
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
                    _placeholder={{
                      color: "gray.500",
                    }}
                    _hover={{
                      bg: "white",
                      border: "1px solid",
                      borderColor: "#888",
                    }}
                    _focus={{
                      outline: "none",
                      bg: "white",
                      border: "1px solid",
                      borderColor: "#888",
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
                    _placeholder={{
                      color: "gray.500",
                    }}
                    _hover={{
                      bg: "white",
                      border: "1px solid",
                      borderColor: "#888",
                    }}
                    _focus={{
                      outline: "none",
                      bg: "white",
                      border: "1px solid",
                      borderColor: "#888",
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
