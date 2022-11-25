import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import axios, { AxiosError } from "axios";
import ErrorPage from "components/ErrorPage";
import Icon from "components/Icon";
import Loading from "components/Loading";
import Page from "components/Page";
import { useRouter } from "next/router";
import { Grammar, highlight, languages as prismLanguages } from "prismjs";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-tomorrow.css";
import useProblem from "queries/useProblem";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Editor from "react-simple-code-editor";
import { useAuthStore } from "store/auth";
import { useCodeStore } from "store/code";

const highlightWithLineNumbers = (
  input: string,
  grammar: Grammar,
  language: string
) =>
  highlight(input, grammar, language)
    .split("\n")
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join("\n");

const SubmitPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const { authenticated } = useAuthStore();
  const {
    data: problemData,
    isLoading: problemLoading,
    isError: problemErrorState,
    error: problemError,
  } = useProblem(id);

  const [isLoading, setLoading] = useState<boolean>(false);
  const { codes, setCode, languages, setLanguage } = useCodeStore();

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

  if (problemLoading) {
    return <Loading />;
  }

  if (problemErrorState || !problemData || !problemData.result) {
    if (!axios.isAxiosError(problemError)) {
      return <ErrorPage />;
    }
    return <ErrorPage message={(problemError as AxiosError).message} />;
  }

  const code = codes[id] || "";
  const language = languages[id] || "c";

  const submit = async () => {
    setLoading(true);
    await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/submit",
      {
        code: code,
        language: language,
        problem_id: router.query.id,
      },
      { withCredentials: true }
    );
    setLoading(false);
  };

  return (
    <Page>
      <Flex alignItems="center">
        <Icon
          icon={faChevronLeft}
          w="24px"
          h="24px"
          mr="3"
          cursor="pointer"
          onClick={router.back}
        />
        <Heading as="h1" size="xl">
          {problemData.problem.title}
        </Heading>
      </Flex>
      <Box m="12" className="markdown-body">
        <ReactMarkdown skipHtml>
          {problemData.problem.description}
        </ReactMarkdown>
      </Box>
      <Heading as="h2" size="lg" mt="6">
        내 제출현황
      </Heading>
      <Table mt="3">
        <Thead>
          <Tr>
            <Th textAlign="center">시도 횟수</Th>
            <Th textAlign="center">시도 시간</Th>
            <Th textAlign="center">시도 결과</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td textAlign="center">1</Td>
            <Td textAlign="center">00:03:00</Td>
            <Td textAlign="center" color="red.500">
              틀렸습니다 (시간 초과)
            </Td>
          </Tr>
          <Tr>
            <Td textAlign="center">2</Td>
            <Td textAlign="center">00:10:00</Td>
            <Td textAlign="center" color="green.500">
              맞았습니다
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Heading as="h2" size="lg" mt="6">
        제출하기
      </Heading>
      <Flex gap="6" mt="3">
        <Box w="50%">
          <Heading as="h3" size="md" mt="3">
            언어 선택
          </Heading>
          <Select
            mt="3"
            onChange={(e) => setLanguage(id, e.currentTarget.value)}
          >
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </Select>
        </Box>
      </Flex>
      <Box mt="3">
        <Editor
          value={code}
          onValueChange={(code) => setCode(id, code)}
          highlight={(code) =>
            highlightWithLineNumbers(code, prismLanguages[language], language)
          }
          padding={10}
          className="editor"
          textareaId="codeArea"
          style={{
            fontFamily: `"D2 coding", monospace`,
            fontSize: 16,
            height: "100%",
          }}
        />
      </Box>
      <Flex justifyContent="end" pt="10">
        <Button colorScheme="green" isLoading={problemLoading} onClick={submit}>
          제출
        </Button>
      </Flex>
    </Page>
  );
};

export default SubmitPage;
