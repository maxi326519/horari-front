export interface Business {
  id?: string;
  name: string;
  state: BusinessState;
  registred: boolean;
  email: string;
  createdAt?: string;
}

export enum BusinessState {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface BusinessError {
  name: string;
  email: string;
}

export const initBusiness = (): Business => ({
  name: "",
  state: BusinessState.ACTIVE,
  registred: false,
  email: "",
});

export const initBusinessError = (): BusinessError => ({
  name: "",
  email: "",
});
