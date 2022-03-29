type CodeFragment = {
  link: string;
  fragment: string;
};

export type CodeFragmentState = {
  codeFragments: CodeFragment[];
};

interface FetchCodeFragmentAction {
  type: "fetch";
  payload: CodeFragmentState;
}

export type Action = FetchCodeFragmentAction;
