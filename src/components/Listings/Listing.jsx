import {
  Button,
  Card,
  CardBody,
  Flex,
  Icon,
  Image,
  Stack,
  Tag,
  TagLabel,
  Text
} from "@chakra-ui/react";
import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { useListingsAction } from "../../actions/listingsActions";
import { authAtom } from "../../state/auth";

function Listing({ data, showDel ,setSavedListings}) {
  const { id } = useRecoilValue(authAtom);
  const listingAction = useListingsAction();
  const imageUrl = data?.images.split(", ")[0];
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <Card maxW="sm" position={"relative"}>
        <Button
          display={showDel ? "block" : "none"}
          size="sm"
          isLoading={loading}           
          onClick={async () => {
            try {
              setLoading(true);
              await listingAction.deleteSavedListing({
                userId: id,
                listingId: data?.id,
              });  
              setSavedListings((prev) => prev.filter((item) => item.id !== data?.id));
            setLoading(false);
            } catch (error) {
              setLoading(false);
              console.log(error);  
            }
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
