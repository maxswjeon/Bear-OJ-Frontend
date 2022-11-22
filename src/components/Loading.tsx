import { Box, Center, Heading } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Center w="100%" h="100%">
      <Box w="100%" maxW="30em" p={["24px", "24px", "56px"]}>
        <Heading as="h1" size="md" mt="32px" textAlign="center">
          로딩중...
        </Heading>
      </Box>
    </Center>
  );
};

export default Loading;
