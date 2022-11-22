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
export type ProblemsResponse = ResponseBase & {
  problems: Problem[];
};
export type ContestsResponse = ResponseBase & {
  contests: Contest[];
};
export type ContestResponse = ResponseBase & {
  contest: Contest;
};
