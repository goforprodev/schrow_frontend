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
  Icon,
  Button,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import { useListingsAction } from "../../actions/listingsActions";
import { authAtom } from "../../state/auth";
import { useRecoilValue } from "recoil";

function Listing({ data, showDel }) {
  const { id } = useRecoilValue(authAtom);
  const listingAction = useListingsAction();
  const imageUrl = data?.images.split(", ")[0];
  const navigate = useNavigate();

  return (
    <>
      <Card maxW="sm" position={"relative"}>
        <Button
          display={showDel ? "block" : "none"}
          size="sm"
          onClick={async () => {
            await listingAction.deleteSavedListing({
              userId: id,
              listingId: data?.id,
            });
          }}
          position="absolute"
          top={-2}
          right={-2}
          borderRadius="full"
          zIndex={10}
        >
          <Icon as={BsFillTrashFill} size={"20pt"} />
        </Button>
        <Link to={`/${data.id}`}>
          <CardBody>
            <Flex w={"100%"} h={"120px"}>
              <Image
                src={
                  imageUrl ||
                  //add placeholder image url
                  "https://www.placehold.it/300x200"
                }
                alt="Green double couch with wooden legs"
                borderRadius="lg"
                w={"100%"}
              />
            </Flex>
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
        </Link>
      </Card>
    </>
  );
}

export default Listing;
