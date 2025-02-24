import { Business } from "./Business";
import { Register } from "./Register";

export interface Users {
  id?: string;
  name: string;
  email: string;
  password: string;
  rol: UsersRol;
  businessId?: string | null;
  company?: Business;
  registers?: Register[];
}

export enum UsersRol {
  ANY = "",
  ADMIN = "Admin",
  BUSINESS = "Empresa",
  EMPLOYEE = "Empleado",
}

export interface UsersError {
  name: string;
  email: string;
  password: string;
  rol: string;
}

export const initUser = (): Users => ({
  name: "",
  email: "",
  password: "",
  rol: UsersRol.ANY,
});

export const initUserError = (): UsersError => ({
  name: "",
  email: "",
  password: "",
  rol: "",
});
