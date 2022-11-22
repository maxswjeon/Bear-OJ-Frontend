import { Problem } from "./Problem";

export type Contest = {
  id: string;
  title: string;
  time_start: string;
  time_freeze: string;
  time_end: string;
  problems: Problem[];
};
