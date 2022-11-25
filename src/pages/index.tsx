import {
  Box,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import ErrorPage from "components/ErrorPage";
import Header from "components/Header";
import Loading from "components/Loading";
import Page from "components/Page";
import dayjs from "dayjs";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import useContests from "queries/useContests";
import { useAuthStore } from "store/auth";

const HomePage: NextPage = () => {
  const router = useRouter();

  const { authenticated } = useAuthStore();

  const { data, isLoading, isError, error } = useContests();

  if (!authenticated) {
    if (!router.isReady) {
      return <Loading />;
    }

    router.push("/login");
    return <Loading />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    if (!axios.isAxiosError(error)) {
      return <ErrorPage />;
    }

    return <ErrorPage message={(error as AxiosError).message} />;
  }

  if (data.contests?.length === 0) {
    return (
      <Flex justifyContent="center">
        <Box w="80em">
          <Header />
          <Heading mt="3" textAlign="center">
            등록된 대회가 없습니다.
          </Heading>
        </Box>
      </Flex>
    );
  }

  return (
    <Page>
      <Heading as="h1" size="xl">
        대회 목록
      </Heading>
      <Table mt="3">
        <Thead>
          <Tr>
            <Th textAlign="center">대회 제목</Th>
            <Th textAlign="center">대회 시작</Th>
            <Th textAlign="center">스코어보드 프리즈</Th>
            <Th textAlign="center">대회 종료</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.contests
            ?.sort((a, b) =>
              a.title < b.title ? -1 : a.title > b.title ? 1 : 0
            )
            .map((contest) => (
              <Tr
                key={contest.id}
                cursor={
                  dayjs(contest.time_end) < dayjs() ? "not-allowed" : "pointer"
                }
                onClick={() =>
                  dayjs(contest.time_end) > dayjs() &&
                  router.push("/contest?id=" + contest.id)
                }
                bgColor={
                  dayjs(contest.time_end) < dayjs()
                    ? "blackAlpha.300"
                    : undefined
                }
              >
                <Td textAlign="center">{contest.title}</Td>
                <Td textAlign="center">
                  {new Date(contest.time_start).toLocaleString()}
                </Td>
                <Td textAlign="center">
                  {new Date(contest.time_freeze).toLocaleString()}
                </Td>
                <Td textAlign="center">
                  {new Date(contest.time_end).toLocaleString()}
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Page>
  );
};

export default HomePage;
