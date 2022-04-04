export interface AuthFormPropsInterface {
  submitText: string;
  submitCallback: (credentials: UserCredentialsInterface) => void;
}

export interface UserCredentialsInterface {
  email: string;
  password: string;
}

export interface CustomGroupPropsInterface {
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
  touched: boolean | undefined;
  error: string | undefined;
  type: "text" | "password";
  valueType: string;
}
