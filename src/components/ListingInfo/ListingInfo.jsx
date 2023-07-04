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
import capitalize from "../../utils/capitalize";

function ListingInfo({ listing }) {
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
              <BreadcrumbLink>{capitalize(listing?.city)}</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink>{capitalize(listing?.statex)}</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink>{capitalize(listing?.street)}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Flex fontSize={"10pt"} gap={4}>
            <Aside listingId={listing?.id} />
          </Flex>
        </Flex>

        {/* Info section */}
        <Flex direction={"column"} py={"10pt"}>
          <Info data={listing} />
          <Divider />
          <Stats data={listing} />
          <Divider />
          <OtherInfo data={listing} />
        </Flex>
      </Flex>
    </>
  );
}

export default ListingInfo;
