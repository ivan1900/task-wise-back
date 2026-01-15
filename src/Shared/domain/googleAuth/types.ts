export interface GoogleReq {
  user: GoogleUser;
}

export interface GoogleProfile {
  id: string;
  name: { givenName: string; familyName: string };
  emails: { value: string }[];
  photos: { value: string }[];
}

export interface GoogleUser {
  id: number;
  email: string;
}
