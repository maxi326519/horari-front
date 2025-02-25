import { useEmployeeRegisterStore } from "../stores/employeeRegisterStore";
import { useEffect } from "react";
import { Register } from "../interfaces/Register";
import useAuth from "./useAuth";
import axios from "axios";
import Swal from "sweetalert2";

export function useEmployeeRegister() {
  const sesion = useAuth();
  const registersStore = useEmployeeRegisterStore();

  useEffect(() => {
    console.log(registersStore.data);
  }, [registersStore.data]);

  const getCurrentRegister = async () => {
    try {
      const response = await axios.get(`/register/toDay/${sesion.user?.id}`);
      console.log(response.data);
      registersStore.set(response.data[0]);
    } catch (error) {
      console.error("Failed to fetch registers:", error);
    }
  };

  const ingressRegister = async (register: Register) => {
    try {
      console.log(register);
      const response = await axios.post("/register", register);
      registersStore.set(response.data);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un error inesperado al crear el registro",
        icon: "error",
      });
      console.error("Failed to create register:", error);
    }
  };

  const egressRegister = async (register: Register) => {
    try {
      const checkOutTime = new Date();
      await axios.put(`/register/checkOutTime/${register.id}`, {
        checkOutTime,
      });
      registersStore.update({ ...registersStore.data!, checkOutTime });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un error inesperado al actualizar el registro",
        icon: "error",
      });
      console.error("Failed to update register:", error);
    }
  };

  return {
    current: registersStore.data,
    getCurrent: getCurrentRegister,
    ingress: ingressRegister,
    egress: egressRegister,
  };
}
