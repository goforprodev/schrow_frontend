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
  useToast,
  Select,
  Icon,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Collaborators from "../components/Collaborators";
import { BsChevronCompactLeft } from "react-icons/bs";
import { useListingsAction } from "../actions/listingsActions";
import capitalize from "../utils/capitalize";
import Amenities from "../components/Amenities";
import { BsCloudUpload } from "react-icons/bs";
// import { FaCloudUpload } from "react-icons/fa";

function AddListing({ edit, listing }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [_amenities, setAmenities] = useState([]);
  const [listingTypes, setListingTypes] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();
  const listingsAction = useListingsAction();

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (selectedImages.length + files.length <= 6) {
      setSelectedImages([...selectedImages, ...files]);
    } else {
      toast({
        status: "error",
        title: "Error",
        description: "You can only upload up to 6 images",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleIsCollaborator = async (emails) => {
    try {
      //email = x@gmail.com~~angel@gmail.com~~z@gmail.com
      const emails = collaborators.join("~~");
      const response = await axios.post("/api/users.php", {
        endpoint: "is_collaborator",
        emails,
      });
      const { data } = response;
      if (data.data.exists[0] !== "" && data.data.exists.length) {
        //do something
        return data.data.exists;
      } else {
        toast({
          status: "error",
          title: "Error",
          description: "Collaborator does not exist",
          duration: 7000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log("Collaborator error : ", error);
    }
  };

  const handleRemoveImage = (idx) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(idx, 1);
    setSelectedImages(updatedImages);
  };

  const onSubmit = async (values) => {
    if (!values) {
      return;
    }

    const formData = new FormData();

    selectedImages.forEach((image, index) => {
      const blob = new Blob([image], { type: image.type });
      formData.append(`image-${index + 1}`, blob);
    });

    for (const key in values) {
      if (key.indexOf("image") === -1) {
        formData.append(key, values[key]);
      }
    }

    formData.append("endpoint", "create-listing");

    if (collaborators.length) {
      const tcollaborators = await handleIsCollaborator();
      const missingCollaborators = collaborators.filter(
        (email) => !tcollaborators.includes(email)
      );

      if (collaborators.length !== tcollaborators.length) {
        toast({
          status: "error",
          title: "Error",
          description: `${missingCollaborators.join(", ")} does not exist`,
          duration: 7000,
          isClosable: true,
        });
        return;
      }

      if (tcollaborators.length) {
        formData.append("collaborators", tcollaborators.join("~~"));
      }
    }

    if (_amenities.length) {
      formData.append("amenities", _amenities.join(","));
    }

    setLoading(true);
    // Uncomment the following lines when you're ready to make the API call
    try {
      const { data } = await axios.post("/api/users.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!data.error) {
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.log("AddListings error Error: ", error);
    }

    setLoading(false);
  };

  const omit = (obj, omitKeys) => {
    let newObj = { ...obj };
    omitKeys.forEach((key) => {
      delete obj[key];
    });
    return obj;
  };

  const handleEdit = async (values) => {
    const formData = new FormData();
    const omitKeys = ["images", "collaborators", "duration", "property_type"];
    const newValues = omit(values, omitKeys);
    try {
      setLoading(true);
      if (values) {
        for (const key in newValues) {
          formData.append(key, newValues[key]);
        }
        formData.append("endpoint", "edit-listing");
        formData.append("listing_id", listing?.id);
        formData.append("id", listing?.user_id);

        const res = await listingsAction.editListing({ data: formData });
        if (res) {
          setLoading(false);
          toast({
            status: "success",
            title: "Success",
            description: "Listing edited successfully",
            duration: 3000,
            isClosable: true,
          });
          navigate("/");
        }
      }
    } catch (error) {
      setLoading(false);
      console.log("Edit Listing Error : ", error);
    }

    return;
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await listingsAction.loadListingTypes();
        setListingTypes(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [listingTypes]);

  const formik = useFormik({
    initialValues: {
      name: listing?.title || "",
      description: listing?.descr || "",
      duration: "",
      no_of_floors: listing?.no_of_floors || "",
      no_of_units: listing?.no_of_units || "",
      no_of_bed: listing?.no_of_bed || "",
      no_of_bath: listing?.no_of_bath || "",
      estimated_cost: listing?.estimated_cost || "",
      sqft: listing?.sqft || "",
      amenities: listing?.amenities || "",
      collaborators: "",
      property_type: "",
      street_addr: listing?.street || "",
      city: listing?.city || "",
      state: listing?.statex || "",
      country: listing?.country || "",
      zip_code: listing?.zipcode || "",
      status: listing?.status || "",
      images: [],
    },
    onSubmit: edit ? handleEdit : onSubmit,
  });

  return (
    <>
      <Flex direction="column" px={{ base: "10pt", md: "30pt" }} py={"10pt"}>
        <Flex
          direction={"column"}
          width={{ base: "100%", md: "92%" }}
          mx={"auto"}
          maxW={"80%"}
        >
          <Heading as={"h1"} fontWeight={"700"} fontSize={"22px"}>
            {edit ? `Edit ${listing?.title || "Listing"}` : "Add Listing"}
          </Heading>
          <form onSubmit={formik.handleSubmit}>
            <Flex
              w={"100%"}
              justify={"space-between"}
              // px={"15pt"}
              gap={"30pt"}
              direction={{ base: "column", sm: "row" }}
            >
              <Flex
                direction={"column"}
                py={"20pt"}
                w={{ base: "100%", sm: "50%" }}
                color={"gray.500"}
              >
                {/* <Text py={"10pt"}>Project Information</Text> */}
                <Flex direction={"column"} pb={"5pt"} color={"gray.500"}>
                  <FormLabel fontSize={"10pt"} fontWeight={"bold"}>
                    Project Name
                  </FormLabel>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Real"
                    mb={2}
                    required
                    onChange={formik.handleChange}
                    value={formik.values.name}
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
                <Flex direction={"column"} pb={"5pt"}>
                  <FormLabel fontSize={"10pt"} fontWeight={"bold"}>
                    Project Description
                  </FormLabel>
                  <Textarea
                    name="description"
                    placeholder="Describe your project here"
                    size="sm"
                    fontSize={"10pt"}
                    mb={2}
                    onChange={formik.handleChange}
                    value={formik.values.description}
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
                <Flex direction={"column"} pb={"5pt"}>
                  <FormLabel fontSize={"10pt"} fontWeight={"bold"}>
                    Project Duration
                  </FormLabel>
                  <Input
                    name="duration"
                    type="text"
                    placeholder="Enter number of months"
                    mb={2}
                    required
                    onChange={formik.handleChange}
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
                <Flex w={"100%"} justify={"space-between"} gap={"10pt"}>
                  <Flex
                    direction={"column"}
                    pb={"5pt"}
                    // color={"gray.700"}
                    flexGrow={1}
                  >
                    <FormLabel fontSize={"10pt"} fontWeight={"bold"}>
                      Number of floors
                    </FormLabel>
                    <Input
                      name="no_of_floors"
                      type="number"
                      placeholder="Enter number of floors eg (1,2,3...)"
                      mb={2}
                      required
                      onChange={formik.handleChange}
                      value={formik.values.no_of_floors}
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
                  <Flex
                    direction={"column"}
                    pb={"5pt"}
                    // color={"gray.700"}
                    flexGrow={1}
                  >
                    <FormLabel fontSize={"10pt"} fontWeight={"bold"}>
                      Number of units
                    </FormLabel>
                    <Input
                      name="no_of_units"
                      type="number"
                      placeholder="Enter number of units eg (100)"
                      mb={2}
                      required
                      onChange={formik.handleChange}
                      value={formik.values.no_of_units}
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
                </Flex>
                <Flex w={"100%"} justify={"space-between"} gap={"10pt"}>
                  <Flex
                    direction={"column"}
                    pb={"5pt"}
                    // color={"gray.700"}
                    flexGrow={1}
                  >
                    <FormLabel fontSize={"10pt"} fontWeight={"bold"}>
                      Number of beds
                    </FormLabel>
                    <Input
                      name="no_of_bed"
                      type="number"
                      placeholder="Enter number of beds eg(1,2,3...)"
                      mb={2}
                      required
                      onChange={formik.handleChange}
                      value={formik.values.no_of_bed}
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
                  <Flex
                    direction={"column"}
                    pb={"5pt"}
                    // color={"gray.700"}
                    flexGrow={1}
                  >
                    <FormLabel fontSize={"10pt"} fontWeight={"bold"}>
                      Number of baths
                    </FormLabel>
                    <Input
                      name="no_of_bath"
                      type="number"
                      placeholder="Enter number of baths eg(1,2,3...)"
                      mb={2}
                      required
                      onChange={formik.handleChange}
                      value={formik.values.no_of_bath}
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
                </Flex>

                <Flex w={"100%"} justify={"space-between"} gap={"10pt"}>
                  <Flex
                    direction={"column"}
                    pb={"5pt"}
                    // color={"gray.700"}
                    flexGrow={1}
                  >
                    <FormLabel fontSize={"10pt"} fontWeight={"bold"}>
                      Esitmated Cost
                    </FormLabel>
                    <Input
                      name="estimated_cost"
                      type="number"
                      placeholder="Enter the price in Naira"
                      mb={2}
                      required
                      onChange={formik.handleChange}
                      value={formik.values.estimated_cost}
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
                  <Flex
                    direction={"column"}
                    pb={"5pt"}
                    // color={"gray.700"}
                    flexGrow={1}
                  >
                    <FormLabel fontSize={"10pt"} fontWeight={"bold"}>
                      sqft (square feet)
                    </FormLabel>
                    <Input
                      name="sqft"
                      type="number"
                      placeholder="Enter the amount of square feet eg(2300sq)"
                      mb={2}
                      required
                      onChange={formik.handleChange}
                      value={formik.values.sqft}
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
                </Flex>

                <Flex
                  direction={"column"}
                  pb={"5pt"}
                  // color={"gray.700"}
                  display={edit ? "none" : "block"}
                >
                  <FormLabel
                    as={"label"}
                    fontSize={"10pt"}
                    fontWeight={"bold"}
                    htmlFor="image_upload"
                  >
                    <Text pb={"5pt"}>Images</Text>
                    <Flex
                      border={"2px dashed"}
                      borderColor={"gray.400"}
                      borderRadius={"5pt"}
                      p={"20pt"}
                      direction={"column"}
                      align={"center"}
                      fontSize={"1.5em"}
                      cursor={"pointer"}
                      fontWeight={"bold"}
                    >
                      <Icon as={BsCloudUpload} />
                      Upload images{" "}
                    </Flex>
                  </FormLabel>
                  <Input
                    name="images"
                    id="image_upload"
                    type="file"
                    multiple
                    accept="image/*"
                    mb={2}
                    display={"none"}
                    // required
                    onChange={handleImageUpload}
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
                w={{ base: "100%", sm: "50%" }}
                color={"gray.500"}
              >
                {/* <Text textAlign={"left"} py={"10pt"}>
                  Location Information
                </Text> */}
                <Flex direction={"column"} pb={"5pt"}>
                  <FormLabel fontSize={"10pt"} fontWeight={"bold"}>
                    Street Address
                  </FormLabel>
                  <Input
                    name="street_addr"
                    type="text"
                    placeholder="Enter street address eg(25 Main Street)"
                    mb={2}
                    required
                    fontSize={"10pt"}
                    onChange={formik.handleChange}
                    value={formik.values.street_addr}
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
                <Flex direction={"column"} pb={"5pt"}>
                  <FormLabel fontSize={"10pt"} fontWeight={"bold"}>
                    City
                  </FormLabel>
                  <Input
                    name="city"
                    type="text"
                    placeholder="Enter city name"
                    mb={2}
                    required
                    onChange={formik.handleChange}
                    value={formik.values.city}
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
                <Flex direction={"column"} pb={"5pt"}>
                  <FormLabel fontSize={"10pt"} fontWeight={"bold"}>
                    State
                  </FormLabel>
                  <Input
                    name="state"
                    type="text"
                    placeholder="Enter state name"
                    mb={2}
                    required
                    onChange={formik.handleChange}
                    value={formik.values.state}
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
                <Flex direction={"column"} pb={"5pt"}>
                  <FormLabel fontSize={"10pt"} fontWeight={"bold"}>
                    Country
                  </FormLabel>
                  <Input
                    name="country"
                    type="text"
                    placeholder="Enter country name"
                    mb={2}
                    required
                    onChange={formik.handleChange}
                    value={formik.values.country}
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
                <Flex direction={"column"} pb={"5pt"}>
                  <FormLabel fontSize={"10pt"} fontWeight={"bold"}>
                    Zip Code
                  </FormLabel>
                  <Input
                    name="zip_code"
                    type="text"
                    placeholder="Enter zip or postal code eg(100011)"
                    mb={2}
                    required
                    onChange={formik.handleChange}
                    value={formik.values.zip_code}
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

                <Flex direction={"column"} pb={5}>
                  <FormLabel fontSize={"10pt"} fontWeight={"bold"}>
                    Listing status
                  </FormLabel>
                  <Select
                    name="status"
                    placeholder="Listing Status"
                    onChange={formik.handleChange}
                    value={formik.values.status}
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
                  >
                    <option value="for-sale">For sale</option>
                    <option value="renovation">Renovation</option>
                    <option value="developing">Developing</option>
                  </Select>
                </Flex>
              </Flex>
            </Flex>
            <Divider />
            <Flex
              direction={"column"}
              px={"15px"}
              gap={4}
              display={edit ? "none" : "flex"}
              color={"gray.500"}
            >
              <Accordion py={"5pt"} fontWeight={"bold"}>
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
                  <AccordionPanel pb={4} fontSize={"10pt"}>
                    <Amenities setAmenities={setAmenities} />
                  </AccordionPanel>
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
                    <Collaborators setCollaborators={setCollaborators} />
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
                  <AccordionPanel pb={4} fontSize={"10pt"}>
                    <Select
                      name="property_type"
                      placeholder="Property Type"
                      onChange={formik.handleChange}
                      value={formik.values.property_type}
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
                    >
                      {listingTypes?.map((type) => (
                        <option key={type.id} value={type.name}>
                          {capitalize(type?.name)}
                        </option>
                      ))}
                    </Select>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Flex>
            <Flex gap={4} py={"20pt"} justifyContent={"center"}>
              <Button
                type="button"
                variant="outline"
                width={{ base: "100%", md: "20%" }}
                //navigate backwards
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                width={{ base: "100%", md: "20%" }}
                isLoading={loading}
              >
                Submit
              </Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </>
  );
}

export default AddListing;
