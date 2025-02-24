import { Business } from "./Business";
import { Users } from "./Users";

export interface Register {
  id?: string;
  employeeId: string;
  businessId: string;
  checkInTime: string;
  checkOutTime?: string | null;
  employee?: Users;
  company?: Business;
}

export interface RegisterError {
  employeeId: string;
  businessId: string;
  checkInTime: string;
  checkOutTime: string;
}

export const initRegister = (): Register => ({
  employeeId: "",
  businessId: "",
  checkInTime: "",
  checkOutTime: null,
});

export const initRegisterError = (): RegisterError => ({
  employeeId: "",
  businessId: "",
  checkInTime: "",
  checkOutTime: "",
});
