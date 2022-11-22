import create, { StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type CodeState = {
  codes: { [key: string]: string };
  languages: { [key: string]: string };
  setCode: (key: string, code: string) => void;
  setLanguage: (key: string, language: string) => void;
};

type CodePersist = (
  config: StateCreator<CodeState>,
  options: PersistOptions<CodeState>
) => StateCreator<CodeState>;

export const useCodeStore = create<CodeState>()(
  persist(
    (set) => ({
      codes: {},
      languages: {},
      setCode: (key, code) =>
        set((state) => ({ codes: { ...state.codes, [key]: code } })),
      setLanguage: (key, language) =>
        set((state) => ({
          languages: { ...state.languages, [key]: language },
        })),
    }),
    {
      name: "codes",
    }
  )
);
