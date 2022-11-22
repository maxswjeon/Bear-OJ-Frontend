import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input
} from "@chakra-ui/react";
import Logo from "assets/Logo.png";
import axios from "axios";
import Image from "components/Image";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthStore } from "store/auth";
import { LoginResponse } from "types/Responses";

type FormValues = {
  student_number: string;
  password: string;
  global: string;
};

const LoginPage: NextPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const { authenticated, setAuthenticated } = useAuthStore();

  if (authenticated) {
    router.push("/start");
  }

  const login: SubmitHandler<FormValues> = async (form) => {
    try {
      const { data } = await axios.post<LoginResponse>(
        process.env.NEXT_PUBLIC_API_URL + "/session",
        {
          student_number: form.student_number,
          password: form.password,
        },
        { withCredentials: true }
      );

      if (data.result) {
        setAuthenticated(true);
        router.push("/start");
      }
    } catch (e) {
      setError("global", {
        message: "로그인에 실패했습니다. 아이디 및 비밀번호를 확인해 주세요",
      });
    }
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
          <Flex>
            <Image w="100%" src={Logo} alt="Logo" />
          </Flex>
          <Heading as="h1" size="md" mt="32px" textAlign="center" whiteSpace="pre">
            {process.env.NEXT_PUBLIC_OJ_NAME || "Bear OJ"}
          </Heading>
          <form onSubmit={handleSubmit(login)}>
            <FormControl mt="3" isInvalid={!!errors.student_number}>
              <FormLabel htmlFor="student_number">학번</FormLabel>
              <Input
                id="student_number"
                {...register("student_number", {
                  required: "학번을 입력해 주세요",
                })}
              />
              <FormErrorMessage>
                {errors.student_number && errors.student_number.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt="3" isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">비밀번호</FormLabel>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "비밀번호를 입력해 주세요",
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt="3" isInvalid={!!errors.global}>
              <FormErrorMessage>
                {errors.global && errors.global.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              w="100%"
              mt="3"
              colorScheme="blue"
              type="submit"
              isLoading={isSubmitting}
            >
              로그인
            </Button>
          </form>
        </Box>
      </Center>
    </>
  );
};

export default LoginPage;
