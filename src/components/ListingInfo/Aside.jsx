import { Flex, Icon, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { AiFillHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BiHide } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useListingsAction } from "../../actions/listingsActions";
import { authAtom } from "../../state/auth";
import { useRecoilValue } from "recoil";
import Loader from "../Loader";

function Aside({ listingId }) {
  const { id } = useRecoilValue(authAtom);
  const listingAction = useListingsAction();
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();

  const saveListings = async (listingId, authId) => {
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

  const asideButtons = [
    {
      name: "Save",
      icon: (
        <Icon
          as={AiFillHeart}
          _hover={{ fill: "red", cursor: "pointer", transform: "scale(1.2)" }}
          _focus={{ fill: "red" }}
        />
      ),
      type: "buyer",
      onClick: () => {
        saveListings(listingId, id);
      },
    },
    {
      name: "Share",
      icon: <Icon as={AiOutlineShareAlt} />,
      type: "buyer",
    },
    {
      name: "Hide",
      icon: <Icon as={BiHide} />,
      type: "seller",
    },
    {
      name: "More",
      icon: <Icon as={BsThreeDots} />,
      type: "seller",
    },
  ];

  // if (loading) return <Loader />;

  return (
    <>
      {asideButtons.map((buttonAs, idx) => (
        <Flex
          onClick={buttonAs?.onClick}
          display={buttonAs?.type === "seller" ? "none" : "flex"}
          as={"button"}
          align={"center"}
          gap={1}
          key={idx}
          _focus={{ color: "red" }}
          // isLoading={loading}
        >
          {buttonAs.icon}
          <Text>{buttonAs.name}</Text>
        </Flex>
      ))}
    </>
  );
}

export default Aside;
