import React from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

function OtherInfo({ data }) {
  return (
    <>
      <Accordion py={"5pt"} display={"flex"} flexDirection={"column"} gap={4}>
        <AccordionItem>
          <h2>
            <AccordionButton bg={"gray.100"}>
              <Box as="span" flex="1" textAlign="left">
                Overview
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize={"10pt"}>
            {data?.descr}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton bg={"gray.100"}>
              <Box as="span" flex="1" textAlign="left">
                Amenities
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} fontSize={"10pt"}>
            {data?.amenities || "Property Amenities"}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default OtherInfo;
