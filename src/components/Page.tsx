import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";
import Header from "./Header";

type PageProps = {
  children: React.ReactNode;
};

const Page = ({ children }: PageProps) => {
  return (
    <>
      <Head>
        <title>YCC 온라인 저지</title>
      </Head>
      <Flex justifyContent="center">
        <Box w="80em">
          <Header />
          <Box p="6">{children}</Box>
        </Box>
      </Flex>
    </>
  );
};

export default Page;
