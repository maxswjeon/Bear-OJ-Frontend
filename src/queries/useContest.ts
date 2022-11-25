import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ContestResponse } from "types/Responses";

const useContest = (id: string | string[] | undefined) => {
  return useQuery<ContestResponse>(
    ["contest", id],
    async () => {
      const { data } = await axios.get<ContestResponse>(
        process.env.NEXT_PUBLIC_API_URL + "/contests/" + id,
        { withCredentials: true }
      );
      return data;
    },
    { enabled: !!id && typeof id === "string" }
  );
};

export default useContest;
