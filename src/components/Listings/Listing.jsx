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
  Text,
  transition,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { AiFillEdit, AiFillHeart } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { MdOutlineManageAccounts } from "react-icons/md";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useListingsAction } from "../../actions/listingsActions";
import { authAtom } from "../../state/auth";
import { useNavigate } from "react-router-dom";
import { TbCurrencyNaira } from "react-icons/tb";

function Listing({ data, showDel, showEdit, _class, setSavedListings, save }) {
  const { id } = useRecoilValue(authAtom);
  const listingAction = useListingsAction();
  const imageUrl = data?.images.split(", ")[0];
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const [selectBtn, setSelectBtn] = React.useState("");

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
      <Card maxW="sm" position={"relative"}>
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
          bg={selectBtn === "save" ? "red"}
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
        <Link to={`/${data.id}`}>
          <CardBody>
            <Flex w={"100%"} h={"120px"} overflow={"hidden"}>
              <Image
                src={
                  imageUrl ||
                  //add placeholder image url
                  "https://www.placehold.it/300x200"
                }
                alt="Green double couch with wooden legs"
                borderRadius="lg"
                w={"100%"}
                //scale image on hover
                _hover={{ transform: "scale(1.1)", transition: "all 0.7s" }}
              />
            </Flex>
            <Stack mt="3" spacing="3" fontSize={"10pt"}>
              <Text
                color="blue.600"
                fontSize="xl"
                display={"flex"}
                align={"center"}
              >
                <Icon as={TbCurrencyNaira} fontSize={"22pt"} />
                {data.estimated_cost}
              </Text>
              <Flex
                align={"center"}
                gap={"5pt"}
                fontSize={"10pt"}
                color={"gray.600"}
              >
                {data.mass || "5bds|4ba|2,625sqft"}
                <Tag size={"sm"} variant="subtle" colorScheme="blue">
                  <TagLabel>{data.statuse || "House for sale"}</TagLabel>
                </Tag>
              </Flex>
              <Flex gap={"2pt"} color={"gray.600"}>
                <Text as={"span"}>{data.city} ,</Text>
                <Text as={"span"}>{data.statex},</Text>
                <Text as={"span"}>{data.country}</Text>
              </Flex>
              <Flex justify={"space-between"} color={"gray.600"}>
                <Text>{data.title || "Bimpe Azeez real estate"}</Text>
              </Flex>
            </Stack>
          </CardBody>
        </Link>
      </Card>
    </>
  );
}

export default Listing;
