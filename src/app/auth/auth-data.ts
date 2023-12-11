export interface AuthData {
  accessToken: string;
  user: {
    id?: number;
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    imageProf: string;
    city: string;
    phone: string;
  };
}
