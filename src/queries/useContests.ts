import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ContestsResponse } from "types/Responses";

const useContests = () => {
  return useQuery<ContestsResponse>(["contests"], async () => {
    const { data } = await axios.get<ContestsResponse>(
      process.env.NEXT_PUBLIC_API_URL + "/contests",
      { withCredentials: true }
    );
    return data;
  });
};

export default useContests;
