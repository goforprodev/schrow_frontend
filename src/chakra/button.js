export const Button = {
  baseStyle: {
    borderRadius: "60px",
    fontSize: "12pt",
    fontWeight: "bold",
    // _focus: {
    //   outline: "none",
    //   border: "1px solid",
    //   color: "purple.500",
    //   borderColor: "purple.500",
    //   bg: "transparent",
    // },
  },

  sizes: {
    sm: {
      fontSize: "8pt",
    },
    md: {
      fontSize: "10pt",
    },
  },
  variants: {
    solid: {
      color: "white",
      bg: "brand.100",
      _hover: {
        bg: "blue.500",
      },
      // bgGradient: "linear(to-br, rgb(147 51 234),  rgb(59 130 246))",
      // _hover: {
      //   bgGradient: "linear(to-bl, rgb(147 51 234),  rgb(59 130 246))",
      // },
    },

    outline: {
      color: "brand.100",
      bg: "transparent",
      border: "2px solid ",
      borderColor: "brand.100",
      _hover: {
        color: "white",
        bg: "brand.100",
      },
    },

    oauth: {
      color: "white",
      height: "34px",
      border: "1px solid",
      borderColor: "gray.300",
      _hover: {
        color: "gray.800",
        bg: "gray.50",
      },
    },

    icons: {
      color: "white",
      bg: "brand.100",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      // _hover: {
      //   bg: "brand.100",
      // },
    },
  },
};
