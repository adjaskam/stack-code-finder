export interface UserSessionStateInterface {
  jwtToken: string | undefined;
  userEmail: string | undefined;
  exp: number | undefined;
};

export interface JwtDecodedInterface {
  id: string | undefined;
  exp: number | undefined;
};

