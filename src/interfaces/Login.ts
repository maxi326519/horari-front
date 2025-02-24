export interface LoginData {
  email: string;
  password: string;
}

export interface LoginError {
  email: string;
  password: string;
}

export const initLoginData = (): LoginData => ({
  email: "",
  password: "",
});

export const initLoginError = (): LoginError => ({
  email: "",
  password: "",
});