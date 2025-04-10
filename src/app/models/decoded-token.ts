export interface DecodedToken {
  sub: string; // email
  userId: number;
  firstName: string;
  lastName: string;
  roles: string[];
  iat: number;
  exp: number;
}
