import { Box, Center, Heading, Text } from "@chakra-ui/react";

type ErrorPageProps = {
  message?: string;
};

const ErrorPage = (props: ErrorPageProps) => {
  const message = props.message || "알 수 없는 오류가 발생했습니다";

  return (
    <Center w="100%" h="100%">
      <Box w="100%" maxW="30em" p={["24px", "24px", "56px"]}>
        <Heading as="h1" size="md" textAlign="center">
          오류가 발생하였습니다
        </Heading>
        <Text textAlign="center" mt="3">
          {message}
        </Text>
      </Box>
    </Center>
  );
};

export default ErrorPage;
