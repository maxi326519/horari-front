import { Register } from "./Register";
import { Users } from "./Users";

export interface Business {
  id?: string;
  name: string;
  industry: string;
  createdAt?: string;
  employees?: Users[];
  registers?: Register[];
}

export interface BusinessError {
  name: string;
  industry: string;
}

export const initBusiness = (): Business => ({
  name: "",
  industry: "",
  createdAt: "",
  employees: [],
  registers: [],
});

export const initBusinessError = (): BusinessError => ({
  name: "",
  industry: "",
});
