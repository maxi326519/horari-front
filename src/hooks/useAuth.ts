import { LoginData } from "../interfaces/Login";
import { initUser } from "../interfaces/Users";

export default function useAuth() {
  const sesion = initUser();

  async function login(data: LoginData) {
    // login function
    console.log(data);
  }

  async function logout() {
    // logout function
  }

  return {
    sesion,
    login,
    logout,
  };
}
