export interface UserSessionStateInterface {
  jwtToken: string | undefined;
  userEmail: string | undefined;
  exp: number | undefined;
};

export interface JwtDecodedInterface {
  id: string | undefined;
  exp: number | undefined;
};


export interface CodeFragment {
  questionId: string;
  tag: string;
  searchPhrase: string;
  codeFragment: string;
  hashMessage: string;
};

export interface CodeFragmentState {
  searchPhrase: string;
  tag: string;
  scraperType: string;
  isLoading: boolean;
  codeFragments: CodeFragment[];
  abortToken: CancelTokenSource | undefined;
  executionTime: number | undefined;
  amount: number;
};


