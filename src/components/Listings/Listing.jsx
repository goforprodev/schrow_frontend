import {
  Button,
  Card,
  CardBody,
  Flex,
  Icon,
  Image,
  Skeleton,
  Stack,
  Tag,
  TagLabel,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { AiFillEdit, AiFillHeart } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { TbCurrencyNaira } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useListingsAction } from "../../actions/listingsActions";
import { authAtom } from "../../state/auth";
import capitalize from "../../utils/capitalize";

function Listing({ data, showDel, showEdit, _class, setSavedListings, save }) {
  const { id } = useRecoilValue(authAtom);
  const listingAction = useListingsAction();
  const imageUrl = data?.images.split(", ")[0];
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const [selectBtn, setSelectBtn] = React.useState("");
  // const encId = encryptId(data?.id);

  const saveListings = async (authId, listingId) => {
    setLoading(true);
    try {
      const res = await listingAction.saveListings({
        userId: authId,
        listingId,
      });

      setLoading(false);
      toast({
        title: "Success",
        status: "success",
        duration: 1000,
        description: res,
        isClosable: true,
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        status: "error",
        duration: 5000,
        description: "This listing is already saved",
        isClosable: true,
      });
      console.log(error);
    }
  };

  return (
    <>
      <Skeleton isLoaded={!loading}>
        <Card maxW="sm" position={"relative"} boxShadow={"md"}>
          <Button
            display={showEdit ? "block" : "none"}
            size="sm"
            position="absolute"
            top={-2}
            right={10}
            borderRadius="full"
            // variant={"outline"}
            zIndex={10}
            onClick={() => {
              navigate(`/edit/${data?.id}`);
              setSelectBtn("edit");
            }}
          >
            <Icon as={AiFillEdit} size={"20pt"} />
          </Button>

          <Button
            display={save ? "block" : "none"}
            size="sm"
            position="absolute"
            top={-2}
            right={-2}
            borderRadius="full"
            zIndex={10}
            onClick={() => {
              saveListings(id, data?.id);
              setSelectBtn("save");
            }}
            hidden={selectBtn === "save"}
            // bg={selectBtn === "save" ? "red.500" : "brand.100"}
          >
            <Icon as={AiFillHeart} size={"20pt"} />
          </Button>
          <Button
            display={showDel ? "block" : "none"}
            size="sm"
            isLoading={loading}
            onClick={async () => {
              try {
                setLoading(true);
                showEdit
                  ? await listingAction.deleteListing({
                      id,
                      listingId: data?.id,
                    })
                  : await listingAction.deleteSavedListing({
                      userId: id,
                      listingId: data?.id,
                    });
                setSavedListings((prev) =>
                  prev.filter((item) => item.id !== data?.id)
                );
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
          <Link to={`/${data?.id}`}>
            <CardBody p={0}>
              <Flex w={"100%"} h={"150px"} overflow={"hidden"}>
                <Image
                  src={
                    imageUrl ||
                    //add placeholder image url
                    "https://www.placehold.it/300x200"
                  }
                  alt="Green double couch with wooden legs"
                  borderTopRadius={"lg"}
                  w={"100%"}
                  //scale image on hover
                  _hover={{ transform: "scale(1.1)", transition: "all 0.7s" }}
                />
              </Flex>
              <Stack mt="3" spacing="1" fontSize={"10pt"} px={3} pb={2}>
                <Text
                  color="gray.600"
                  fontWeight={"bold"}
                  fontSize="xl"
                  display={"flex"}
                  align={"center"}
                >
                  <Icon as={TbCurrencyNaira} fontSize={"18pt"} />
                  {Math.round(data.estimated_cost / 12)}+/mo
                </Text>
                <Flex
                  align={"center"}
                  justify={"between"}
                  gap={"5pt"}
                  color={"gray.600"}
                >
                  <Text isTruncated>
                    {data.mass || "5bds | 4ba |2,625sqft"}
                  </Text>
                  <Tag size={"sm"} variant="subtle" colorScheme="blue">
                    <TagLabel>
                      {(data.statuse || "House for sale").toLowerCase()}
                    </TagLabel>
                  </Tag>
                </Flex>
                <Flex gap={"2pt"} color={"gray.600"}>
                  <Text as={"span"}>{capitalize(data.city)},</Text>
                  <Text as={"span"}>{capitalize(data.statex)},</Text>
                  <Text as={"span"}>{capitalize(data.country)}</Text>
                </Flex>
                <Flex justify={"space-between"} color={"gray.600"}>
                  <Text fontWeight={"bold"} color={"gray.500"} fontSize={"7pt"}>
                    {(data.title || "Bimpe Azeez real estate").toUpperCase()}
                  </Text>
                </Flex>
              </Stack>
            </CardBody>
          </Link>
        </Card>
      </Skeleton>
    </>
  );
}

export default Listing;
