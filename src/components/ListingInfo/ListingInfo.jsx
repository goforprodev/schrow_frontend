import React from "react";
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  Divider,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Aside from "./Aside";
import Info from "./Info";
import Stats from "./Stats";
import OtherInfo from "./OtherInfo";

function ListingInfo({listing}) {
  const data = {
    id: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    price: "$1.2Million",
    mass: "5bds|4ba|2,625sqft",
    status: "House for sale",
    location: "25 montgomery street akoka yaba lagos",
    owner: "Bimpe Azeez real estate",
  };

  function capitalize(word) {
  // Convert the first character to uppercase and concatenate it with the rest of the word
  return word?.charAt(0).toUpperCase() + word?.slice(1);
  }

  return (
    <>
      <Flex
        w={{ base: "100%", sm: "60%" }}
        direction="column"
        py={{ base: "15pt", sm: "0" }}
        px={{ base: "10pt", sm: "0" }}
      >
        <Flex
          //   bg={"gray.100"}
          w={"100%"}
          h={"5%"}
          align={"center"}
          justify={"space-between"}
          borderTop={"2px solid"}
          borderBottom={"2px solid"}
          borderColor={"gray.500"}
          px={"10pt"}
          display={{ base: "block", sm: "flex" }}
        >
          <Breadcrumb
            fontSize={"10pt"}
            spacing="6px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink href="#">{capitalize(listing?.city)}</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#">{capitalize(listing?.statex)}</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">{capitalize(listing?.street)}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex fontSize={"10pt"} gap={4}>
            <Aside />
          </Flex>
        </Flex>

        {/* Info section */}
        <Flex direction={"column"} py={"10pt"}>
          <Info data={listing} />
          <Divider />
          <Stats />
          <Divider />
          <OtherInfo />
        </Flex>
      </Flex>
    </>
  );
}

export default ListingInfo;
