export interface Register {
  id?: string;
  checkInTime: Date | null;
  checkOutTime?: Date | null;
  employeeId: string;
  businessId: string;
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
  checkInTime: null,
  checkOutTime: null,
});

export const initRegisterError = (): RegisterError => ({
  employeeId: "",
  businessId: "",
  checkInTime: "",
  checkOutTime: "",
});
