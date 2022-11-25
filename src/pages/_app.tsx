import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import theme from "constants/theme";
import type { AppProps } from "next/app";
import { useEffect, useRef } from "react";
import { useAuthStore } from "store/auth";
import { SessionResponse } from "types/Responses";

import "styles/global.css";
import "styles/markdown.css";

function App({ Component, pageProps }: AppProps) {
  const clientRef = useRef<QueryClient>(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0,
        },
      },
    })
  );

  const { setAuthenticated } = useAuthStore();

  useEffect(() => {
    // Session Alive every 5 seconds
    const sessionInterval = setInterval(async () => {
      const { data } = await axios.get<SessionResponse>(
        process.env.NEXT_PUBLIC_API_URL + "/session",
        {
          withCredentials: true,
        }
      );

      setAuthenticated(data.status);
    }, 5 * 1000);

    // const screenInterval = setInterval(async () => {
    //   await axios.post(
    //     process.env.NEXT_PUBLIC_API_URL + "/report",
    //     {
    //       focus: document.hasFocus(),
    //       screen_size: `${window.innerWidth}x${window.innerHeight}`,
    //     },
    //     {
    //       withCredentials: true,
    //     }
    //   );
    // }, 500);

    return () => {
      clearInterval(sessionInterval);
      // clearInterval(screenInterval);
    };
  }, [setAuthenticated]);

  return (
    <QueryClientProvider client={clientRef.current}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
