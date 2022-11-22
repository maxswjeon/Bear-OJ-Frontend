import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProblemsResponse } from "types/Responses";

const useProblems = () => {
  return useQuery<ProblemsResponse>(["problems"], async () => {
    const { data } = await axios.get<ProblemsResponse>(
      process.env.NEXT_PUBLIC_API_URL + "/problems",
      { withCredentials: true }
    );
    return data;
  });
};

export default useProblems;
