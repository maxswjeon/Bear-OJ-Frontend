import { Heading } from "@chakra-ui/react";
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
  const { data, isLoading, isError, error } = useContest(id);

  if (!router.isReady) {
    return <Loading />;
  }

  if (!authenticated) {
    router.push("/login");

    return <Loading />;
  }

  if (!id || typeof id !== "string") {
    router.push("/");
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

  return (
    <Page>
      <Heading>{data.contest.title}</Heading>
    </Page>
  );
};

export default ContestPage;
