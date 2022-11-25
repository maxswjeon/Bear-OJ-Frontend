import { Contest } from "./Contest";
import { Problem } from "./Problem";

type ResponseBase = {
  result: boolean;
  error?: string;
};

export type LoginResponse = ResponseBase;
export type SessionResponse = ResponseBase & {
  status: boolean;
};

export type ProblemResponse = ResponseBase & {
  problem: Problem;
};

export type ContestsResponse = ResponseBase & {
  contests: Contest[] | null;
};

export type ContestResponse = ResponseBase & {
  contest: Contest;
};
