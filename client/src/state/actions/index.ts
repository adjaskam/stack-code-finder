export type CodeFragmentMeta = {
  searchPhrase: string;
  tag: string;
};

interface FetchCodeFragmentAction {
  type: "fetch";
  payload: CodeFragmentMeta;
}

export type Action = FetchCodeFragmentAction;
