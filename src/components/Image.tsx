import { chakra } from "@chakra-ui/react";
import { default as NextImage } from "next/image";

const Image = chakra(NextImage, {
  shouldForwardProp: (prop) => ["src", "width", "height", "alt"].includes(prop),
});

export default Image;
