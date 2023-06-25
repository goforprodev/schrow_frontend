import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import Collaborators from "../components/Collaborators";

function AddListing() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collaborators,setCollaborators] = useState([])
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (selectedImages.length + files.length <= 6) {
      setSelectedImages([...selectedImages, ...files]);
    } else {
      alert("image should not exceed 6");
    }
  };

  const handleIsCollaborator = async (emails) => {
    try {
      //email = x@gmail.com~~angel@gmail.com~~z@gmail.com
      const emails = collaborators.join("~~");
      const response = await axios.post("/api/users.php", {
        endpoint: "is_collaborator",
        emails
      })
      const {data} = response;
      if(data.data.exists[0] !== "" && data.data.exists.length){
        //do something
        return data.data.exists;
        
      }else{
        alert("Collaborators does not exist")
      }
    } catch (error) {
      console.log("Collaborator error : ", error);   
    }  
  }


  
  const handleRemoveImage = (idx) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(idx, 1);
    setSelectedImages(updatedImages);
  };

  const onSubmit = async (values) => {
    const formData = new FormData();

    if(values){
      selectedImages.forEach((image,index) => {
        const blob = new Blob([image], { type: image.type });
        formData.append(`image-${index + 1}`, blob);
      });
  
      for (const key in values) {
        if (key.indexOf("image") === -1) {
          formData.append(key, values[key]);
        }
      }
  
      formData.append("endpoint", "create-listing");
      const tcollaborators = await handleIsCollaborator();
      if(tcollaborators.length){
        formData.append("collaborators", tcollaborators.join("~~"));
      }

      try {
        setLoading(true);
  
        const { data } = await axios.post("/api/users.php", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        //console our formdata using key value
        for (var pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
  
        if (!data.error) {
          setLoading(false);
          navigate("/");
        }
      } catch (error) {
        setLoading(false);
        console.log("AddListings error Error : ", error);

    }
    }
    return

  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      duration: "",
      no_of_floors: "",
      no_of_units: "",
      estimated_cost: "",
      amenities: "",
      collaborators: "",
      property_type: "",
      street_addr: "",
      city: "",
      state: "",
      country: "",
      zip_code: "",
      images: [],
    },
    onSubmit: onSubmit,
  });

  return (
    <>
      <Flex direction="column" px={"30pt"} py={"20pt"}>
        <Heading as={"h1"} fontWeight={"700"} fontSize={"22px"}>
          Add Listing
        </Heading>
        <form onSubmit={formik.handleSubmit}>
          <Flex
            w={"100%"}
            justify={"space-between"}
            // px={"15pt"}
            direction={{ base: "column", sm: "row" }}
          >
            <Flex
              direction={"column"}
              py={"10pt"}
              w={{ base: "100%", sm: "45%" }}
            >
              <Text py={"10pt"}>Project Information</Text>
              <Flex direction={"column"} pb={"5pt"} color={"gray.700"}>
                <FormLabel fontSize={"10pt"} fontWeight={"medium"}>
                  Project Name
                </FormLabel>
                <Input
                  name="name"
                  type="text"
                  placeholder="Real"
                  mb={2}
                  required
                  onChange={formik.handleChange}
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
              <Flex direction={"column"} pb={"5pt"} color={"gray.700"}>
                <FormLabel fontSize={"10pt"} fontWeight={"medium"}>
                  Project Description
                </FormLabel>
                <Textarea
                  name="description"
                  placeholder="Describe your project here"
                  size="sm"
                  fontSize={"10pt"}
                  mb={2}
                  onChange={formik.handleChange}
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
              <Flex direction={"column"} pb={"5pt"} color={"gray.700"}>
                <FormLabel fontSize={"10pt"} fontWeight={"medium"}>
                  Project Duration
                </FormLabel>
                <Input
                  name="duration"
                  type="text"
                  placeholder="months"
                  mb={2}
                  required
                  onChange={formik.handleChange}
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
              <Flex direction={"column"} pb={"5pt"} color={"gray.700"}>
                <FormLabel fontSize={"10pt"} fontWeight={"medium"}>
                  Number of floors
                </FormLabel>
                <Input
                  name="no_of_floors"
                  type="number"
                  placeholder="2"
                  mb={2}
                  required
                  onChange={formik.handleChange}
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
              <Flex direction={"column"} pb={"5pt"} color={"gray.700"}>
                <FormLabel fontSize={"10pt"} fontWeight={"medium"}>
                  Number of units
                </FormLabel>
                <Input
                  name="no_of_floors"
                  type="number"
                  placeholder="100"
                  mb={2}
                  required
                  onChange={formik.handleChange}
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
              <Flex direction={"column"} pb={"5pt"} color={"gray.700"}>
                <FormLabel fontSize={"10pt"} fontWeight={"medium"}>
                  Esitmated Cost
                </FormLabel>
                <Input
                  name="estimated_cost"
                  type="number"
                  placeholder="1000000"
                  mb={2}
                  required
                  onChange={formik.handleChange}
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

              <Flex direction={"column"} pb={"5pt"} color={"gray.700"}>
                <FormLabel
                  as={"label"}
                  fontSize={"10pt"}
                  fontWeight={"medium"}
                  htmlFor="image_upload"
                >
                  <Text pb={"5pt"}>Images</Text>
                  <Box
                    border={"2px dashed"}
                    borderColor={"gray.500"}
                    borderRadius={"5pt"}
                    p={"10pt"}
                  >
                    Upload images{" "}
                  </Box>
                </FormLabel>
                <Input
                  name="images"
                  id="image_upload"
                  type="file"
                  multiple
                  accept="image/*"
                  mb={2}
                  display={"none"}
                  required
                  onChange={handleImageUpload}
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
                <Flex py={"5pt"}>
                  {selectedImages.map((image, index) => (
                    <Box key={index} position="relative" mr={2}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index + 1}`}
                        width={100}
                        height={100}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleRemoveImage(index)}
                        position="absolute"
                        top={-2}
                        right={-2}
                        borderRadius="full"
                      >
                        X
                      </Button>
                    </Box>
                  ))}
                </Flex>
              </Flex>
            </Flex>
            <Flex
              direction={"column"}
              py={{ base: "5pt", sm: "10pt" }}
              w={{ base: "100%", sm: "45%" }}
            >
              <Text textAlign={"left"} py={"10pt"}>
                Location Information
              </Text>
              <Flex direction={"column"} pb={"5pt"} color={"gray.700"}>
                <FormLabel fontSize={"10pt"} fontWeight={"medium"}>
                  Street Address
                </FormLabel>
                <Input
                  name="street_addr"
                  type="text"
                  placeholder="25 Main Street"
                  mb={2}
                  required
                  fontSize={"10pt"}
                  onChange={formik.handleChange}
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
                <Checkbox py={"3pt"}>
                  <Text fontSize={"9pt"}>
                    Hide street address from public view
                  </Text>
                </Checkbox>
              </Flex>
              <Flex direction={"column"} pb={"5pt"} color={"gray.700"}>
                <FormLabel fontSize={"10pt"} fontWeight={"medium"}>
                  City
                </FormLabel>
                <Input
                  name="city"
                  type="text"
                  placeholder="city"
                  mb={2}
                  required
                  onChange={formik.handleChange}
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
              <Flex direction={"column"} pb={"5pt"} color={"gray.700"}>
                <FormLabel fontSize={"10pt"} fontWeight={"medium"}>
                  State
                </FormLabel>
                <Input
                  name="state"
                  type="text"
                  placeholder="state"
                  mb={2}
                  required
                  onChange={formik.handleChange}
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
              <Flex direction={"column"} pb={"5pt"} color={"gray.700"}>
                <FormLabel fontSize={"10pt"} fontWeight={"medium"}>
                  Country
                </FormLabel>
                <Input
                  name="country"
                  type="text"
                  placeholder="country"
                  mb={2}
                  required
                  onChange={formik.handleChange}
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
              <Flex direction={"column"} pb={"5pt"} color={"gray.700"}>
                <FormLabel fontSize={"10pt"} fontWeight={"medium"}>
                  Zip Code
                </FormLabel>
                <Input
                  name="zip_code"
                  type="text"
                  placeholder="100011"
                  mb={2}
                  required
                  onChange={formik.handleChange}
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
          </Flex>
          <Divider />
          <Flex direction={"column"} px={"15px"} gap={4}>
            <Accordion py={"5pt"}>
              <AccordionItem>
                <h2>
                  <AccordionButton bg={"gray.100"}>
                    <Box as="span" flex="1" textAlign="left">
                      Property Information
                    </Box>
                    <Box as="span" fontSize={"10pt"}>
                      <Text
                        as={"span"}
                        display={{ base: "none", sm: "inline" }}
                      >
                        This is not required to be filled in other to submit a
                        listing
                      </Text>
                      <AccordionIcon ml={"2pt"} />
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontSize={"10pt"}></AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Divider />
            <Accordion py={"5pt"}>
              <AccordionItem>
                <h2>
                  <AccordionButton bg={"gray.100"}>
                    <Box as="span" flex="1" textAlign="left">
                      Collaborators
                    </Box>
                    <Box as="span" fontSize={"10pt"}>
                      <Text
                        as={"span"}
                        display={{ base: "none", sm: "inline" }}
                      >
                        This is not required to be filled in other to submit a
                        listing
                      </Text>
                      <AccordionIcon ml={"2pt"} />
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontSize={"10pt"}>
                <Collaborators setCollaborators={setCollaborators}/>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Divider />
            <Accordion py={"5pt"}>
              <AccordionItem>
                <h2>
                  <AccordionButton bg={"gray.100"}>
                    <Box as="span" flex="1" textAlign="left">
                      Property Type
                    </Box>
                    <Box as="span" fontSize={"10pt"}>
                      <Text
                        as={"span"}
                        display={{ base: "none", sm: "inline" }}
                      >
                        This is not required to be filled in other to submit a
                        listing
                      </Text>
                      <AccordionIcon ml={"2pt"} />
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontSize={"10pt"}></AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
          <Flex gap={4} py={"10pt"} justifyContent={"center"}>
            <Button type="button" variant="outline" width={"20%"}>
              Save
            </Button>
            <Button type="submit" width={"20%"} isLoading={loading}>
              Submit
            </Button>
          </Flex>
        </form>
      </Flex>
    </>
  );
}

export default AddListing;
