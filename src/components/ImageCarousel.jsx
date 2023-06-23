import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box } from "@chakra-ui/react";

function ImageCarousel({ images }) {

  const imageUrl = images?.split(", ");
  return (
    <>
      <Box w={{ base: "100%", sm: "50%" }} h={{ base: "auto", sm: "50%" }}>
        <Carousel autoplay>
          {imageUrl?.map((item,index) => (
            <div key={index} style={{ maxHeight: "600px" }}>
              <img
                src={item || "https://www.placehold.it/100x100"}
                style={{ objectFit: "contain" }}
              />
              {/* <h4 className="legend">{item.title}</h4> */}
            </div>
          ))}
        </Carousel>
      </Box>
    </>
  );
}

export default ImageCarousel;
