import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import axios from "axios";
import Header from "components/Header";
import Icon from "components/Icon";
import Loading from "components/Loading";
import { useRouter } from "next/router";
import { Grammar, highlight, languages as prismLanguages } from "prismjs";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-tomorrow.css";
import { useState } from "react";
import Editor from "react-simple-code-editor";
import { useCodeStore } from "store/code";

const SubmitPage = () => {
  const highlightWithLineNumbers = (
    input: string,
    grammar: Grammar,
    language: string
  ) =>
    highlight(input, grammar, language)
      .split("\n")
      .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
      .join("\n");

  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);

  const { codes, setCode, languages, setLanguage } = useCodeStore();

  if (!router.isReady) {
    return <Loading />;
  }

  if (!router.query.id || typeof router.query.id !== "string") {
    return router.push("/");
  }

  const id = router.query.id as string;
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
    <Flex justifyContent="center" h="100%">
      <Flex w="80em" h="100%" direction="column">
        <Header />
        <Box>
          <Flex alignItems="center" px="10" pt="3">
            <Icon
              icon={faChevronLeft}
              w="24px"
              h="24px"
              mr="3"
              cursor="pointer"
              onClick={() => router.push("/")}
            />
            <Heading as="h1" fontSize="32px">
              Problem {router.query.id}
            </Heading>
          </Flex>
          <Table size="sm">
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
          <Flex justifyContent="end" pt="10">
            <Button colorScheme="green" isLoading={isLoading} onClick={submit}>
              제출
            </Button>
          </Flex>
        </Box>
        <Flex w="100%" flex="1" py="3">
          <Box flex="1" overflow="auto"></Box>
          <Box flex="1">
            <Editor
              value={code}
              onValueChange={(code) => setCode(id, code)}
              highlight={(code) =>
                highlightWithLineNumbers(code, prismLanguages.cpp, "cpp")
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
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SubmitPage;
