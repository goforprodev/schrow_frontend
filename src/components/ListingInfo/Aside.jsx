import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BiHide } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useListingsAction } from "../../actions/listingsActions";
import { authAtom } from "../../state/auth";
import { useRecoilValue} from "recoil";

function Aside({listingId}) {
  const {id} = useRecoilValue(authAtom);
  const listingAction = useListingsAction();
  
  const saveListings = async (listingId,authId) => {
    try {
    const res =   await listingAction.saveListings({
        userId:authId,
        listingId
      });
      alert(res)
    } catch (error) {
      console.log(error);
    } 
  }

  const asideButtons = [
    {
      name: "Save",
      icon: <Icon as={AiFillHeart} _hover={{fill:"red",cursor:"pointer",transform:"scale(1.2)"}} _focus={{fill:"red"}}/>,
      type:"buyer",
      onClick:() => {saveListings(listingId,id)}
    },
    {
      name: "Share",
      icon: <Icon as={AiOutlineShareAlt} />,
      type:"buyer"
    },
    {
      name: "Hide",
      icon: <Icon as={BiHide} />,
      type:"seller"
    },
    {
      name: "More",
      icon: <Icon as={BsThreeDots} />,
     type:"seller"
    },
  ];
  return (
    <>
      {asideButtons.map((buttonAs, idx) => (
        <Flex onClick={buttonAs?.onClick} display = {buttonAs?.type === "seller" ? "none":"flex"} as={"button"} align={"center"} gap={1} key={idx} _focus={{color:"red"}}>
          {buttonAs.icon}
          <Text>{buttonAs.name}</Text>
        </Flex>
      ))}
    </>
  );
}

export default Aside;
