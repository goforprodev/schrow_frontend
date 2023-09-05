import {
  Flex,
  Icon,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
} from "@chakra-ui/react";
import React from "react";
import { AiFillHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BiHide, BiMap } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import { useListingsAction } from "../../actions/listingsActions";
import { authAtom } from "../../state/auth";
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
} from "react-share";
import {
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  InstapaperIcon,
  EmailIcon,
} from "react-share";
import { useParams } from "react-router-dom";

function Aside({ listingId }) {
  const { id } = useRecoilValue(authAtom);
  const listingAction = useListingsAction();
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const toast = useToast();
  const listing = useParams();
  // const url = `https://www.schrow.com/${listing.id}`;7
  const url = `https://react-icons.github.io/react-icons/search?q=map`;

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

  const handleShareClick = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const asideButtons = [
    {
      name: selected ? "Saved" : "Save",
      icon: (
        <Icon
          as={AiFillHeart}
          _hover={{ fill: "red", cursor: "pointer", transform: "scale(1.2)" }}
          _focus={{ fill: "red" }}
          color={selected ? "red" : "black"}
        />
      ),
      type: "buyer",
      onClick: () => {
        setSelected(true);
        saveListings(listingId, id);
      },
    },
    {
      name: "Share",
      icon: <Icon as={AiOutlineShareAlt} />,
      type: "buyer",
      onClick: () => handleShareClick(),
    },
    {
      name: "Map",
      icon: <Icon as={BiMap} />,
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
      <Modal isOpen={isOpen} onClose={handleClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <Text as="h2" py={3} textAlign={"center"} fontSize={"15pt"}>
            Share Listing on
          </Text>
          <ModalFooter justifyContent="center" gap={5}>
            <EmailShareButton url={url}>
              <EmailIcon size={32} round={true} />
            </EmailShareButton>

            <FacebookShareButton url={url}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>

            <WhatsappShareButton url={url}>
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>

            <TwitterShareButton url={url}>
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>

            <LinkedinShareButton url={url}>
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>

            <InstapaperShareButton url={url}>
              <InstapaperIcon size={32} round={true} />
            </InstapaperShareButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {asideButtons.map((buttonAs, idx) => (
        <Flex
          onClick={buttonAs?.onClick}
          display={buttonAs?.type === "seller" ? "none" : "flex"}
          as={"button"}
          align={"center"}
          gap={1}
          key={idx}
          _focus={{ color: "red" }}
        >
          {buttonAs.icon}
          <Text color={buttonAs.name == "Save" && selected ? "red" : "black"}>
            {buttonAs.name}
          </Text>
        </Flex>
      ))}
    </>
  );
}

export default Aside;
