import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box } from "@chakra-ui/react";

function ImageCarousel() {
  const items = [
    {
      title: "Item 1",
      image: "https://placeholder.com/100/100",
    },
    {
      title: "Item 2",
      image: "https://placeholder.com/100/100",
    },
    {
      title: "Item 3",
      image: "https://placeholder.com/100/100",
    },
  ];

  return (
    <>
      <Box w={{ base: "100%", sm: "50%" }} h={{ base: "auto", sm: "50%" }}>
        <Carousel autoplay>
          {items.map((item) => (
            <div key={item.title} style={{ maxHeight: "600px" }}>
              <img
                src={item.image}
                alt={item.title}
                style={{ objectFit: "contain" }}
              />
              <h4 className="legend">{item.title}</h4>
            </div>
          ))}
        </Carousel>
      </Box>
    </>
  );
}

export default ImageCarousel;
