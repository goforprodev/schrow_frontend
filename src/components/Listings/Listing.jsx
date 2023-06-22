import React from "react";
import {
  Card,
  Image,
  Heading,
  Text,
  CardBody,
  Stack,
  Tag,
  TagLabel,
  Flex,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Listing({ data }) {
  const imageUrl = data.images.split(", ")[0];
  // console.log(imageUrl)
  return (
    <>
      <Link to={`/${data.id}`}>
        <Card maxW="sm">
          <CardBody>
            <Image
              src={
                imageUrl ||
                //add placeholder image url
                "https://www.placehold.it/300x200"
              }
              alt="Green double couch with wooden legs"
              borderRadius="lg"
            />
            <Stack mt="3" spacing="3" fontSize={"10pt"}>
              <Text color="blue.600" fontSize="xl">
                ${data.estimated_cost}
              </Text>
              <Flex align={"center"} gap={"5pt"} fontSize={"10pt"}>
                {data.mass || "5bds|4ba|2,625sqft"}
                <Tag size={"sm"} variant="subtle" colorScheme="blue">
                  <TagLabel>{data.status || "House for sale"}</TagLabel>
                </Tag>
              </Flex>
              <Flex gap={"2pt"}>
                <Text as={"span"}>{data.city} ,</Text>
                <Text as={"span"}>{data.statex},</Text>
                <Text as={"span"}>{data.country}</Text>
              </Flex>
              <Text>{data.title || "Bimpe Azeez real estate"}</Text>
            </Stack>
          </CardBody>
        </Card>
      </Link>
    </>
  );
}

export default Listing;
