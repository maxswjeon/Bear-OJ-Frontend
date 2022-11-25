import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProblemResponse } from "types/Responses";

const useProblem = (id?: string | string[]) => {
  return useQuery<ProblemResponse>(
    ["problem", id],
    async () => {
      const { data } = await axios.get<ProblemResponse>(
        process.env.NEXT_PUBLIC_API_URL + "/problems/" + id,
        { withCredentials: true }
      );
      return data;
    },
    { enabled: !!id && typeof id === "string" }
  );
};

export default useProblem;
