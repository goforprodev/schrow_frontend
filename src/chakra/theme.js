import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/raleway/200.css";
// import "@fontsource/raleway/700.css";
import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";

const colors = {
  brand: {
    100: "#2aa7e4",
  },
  body: {
    100: "#F4F7FB",
  },
};
const fonts = {
  heading: `'Raleway', sans-serif`,
  body: `'San Franciso', sans-serif`,
};
const styles = {
  global: () => ({
    body: {
      bg: "#fff",
    },
  }),
};
const components = { Button };

export const theme = extendTheme({ colors, fonts, styles, components });
