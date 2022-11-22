import {
  Box,
  Button,
  Center,
  Heading,
  ListItem,
  OrderedList,
  Text
} from "@chakra-ui/react";
import Logo from "assets/Logo.png";
import axios from "axios";
import Image from "components/Image";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import screenfull from "screenfull";

const StartPage: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const login = () => {
    setLoading(true);
    if (screenfull.isEnabled) {
      screenfull.request();
    }

    setTimeout(async () => {
      await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/report/init",
        {
          screen_size: `${window.innerWidth}x${window.innerHeight}`,
        },
        { withCredentials: true }
      );
      router.push("/");
    }, 3000);
  };

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_OJ_NAME || "Bear OJ"}</title>
      </Head>
      <Center w="100%" h="100%">
        <Box
          w="100%"
          maxW="30em"
          p={["24px", "24px", "56px"]}
          rounded={["0", "16px"]}
          shadow={["none", "dark-lg"]}
        >
          <Image src={Logo} alt="Yonsei Computer Club Logo" />
          <Heading as="h1" size="md" mt="32px" textAlign="center" whiteSpace="pre">
          {process.env.NEXT_PUBLIC_OJ_NAME || "Bear OJ"}
          </Heading>
          <Text mt="3">
          {process.env.NEXT_PUBLIC_OJ_NAME || "Bear OJ"}에 오신 것을 환영합니다.
            부정행위를 막기 위해 다음과 같은 기능이 구현되어 있습니다
          </Text>
          <OrderedList my="3" letterSpacing="-0.05em">
            <ListItem>시작 버튼을 누르면 전체화면 모드가 됩니다</ListItem>
            <ListItem>
              화면에서 포커스가 나가게 된다면 운영진에게 알림이 갑니다
            </ListItem>
            <ListItem>화면 사이즈가 변경되도 운영진에게 알림이 갑니다</ListItem>
            <ListItem>
              운영진이 알림을 받으면 참가자에게 화면확인을 요청할 수 있습니다
            </ListItem>
          </OrderedList>
          <Text mt="3">준비가 되셨다면 시작 버튼을 눌러주세요.</Text>
          <Button
            w="100%"
            mt="3"
            colorScheme="blue"
            onClick={login}
            isLoading={loading}
          >
            시작
          </Button>
        </Box>
      </Center>
    </>
  );
};

export default StartPage;
