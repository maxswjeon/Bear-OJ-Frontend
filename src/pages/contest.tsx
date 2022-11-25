import { Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import ErrorPage from "components/ErrorPage";
import Loading from "components/Loading";
import Page from "components/Page";
import { useRouter } from "next/router";
import useContest from "queries/useContest";
import { useAuthStore } from "store/auth";

const ContestPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const { authenticated } = useAuthStore();
  const {
    data: contestData,
    isLoading: contestLoading,
    isError: contestErrorState,
    error: contestError,
  } = useContest(id);

  if (!authenticated) {
    if (!router.isReady) {
      return <Loading />;
    }
    router.push("/login");
    return <Loading />;
  }

  if (!id || typeof id !== "string") {
    router.push("/");
    return <Loading />;
  }

  if (contestLoading) {
    return <Loading />;
  }

  if (contestErrorState || !contestData || !contestData.result) {
    if (!axios.isAxiosError(contestError)) {
      return <ErrorPage />;
    }
    return <ErrorPage message={(contestError as AxiosError).message} />;
  }

  return (
    <Page>
      <Heading as="h1" size="xl">
        {contestData.contest.title}
      </Heading>
      <Table mt="3">
        <Thead>
          <Tr>
            <Th>제목</Th>
          </Tr>
        </Thead>
        <Tbody>
          {contestData.contest.problems.map((problem) => (
            <Tr
              key={problem.id}
              cursor="pointer"
              onClick={() => router.push("/submit?id=" + problem.id)}
            >
              <Td>{problem.title}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Page>
  );
};

export default ContestPage;
