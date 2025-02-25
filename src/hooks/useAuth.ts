import { useEmployeeRegisterStore } from "../stores/employeeRegisterStore";
import axios, { AxiosError } from "axios";
import { useRegisterStore } from "../stores/registersStore";
import { useBusinessStore } from "../stores/businessStore";
import { Users, UsersRol } from "../interfaces/Users";
import { useUserStore } from "../stores/usersStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useSesionStore from "../stores/sesionStore";
import useLoading from "./useLoading";
import Swal from "sweetalert2";

export default function useAuth() {
  const navigate = useNavigate();
  const loading = useLoading();
  const users = useUserStore();
  const registers = useRegisterStore();
  const employees = useEmployeeRegisterStore();
  const business = useBusinessStore();
  const sesion = useSesionStore();

  useEffect(() => {
    console.log(sesion.data);
  }, [sesion.data]);

  async function persistence() {
    loading.open();
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");

    if (token && user) {
      const jsonUser = JSON.parse(user);
      configToken(token);
      sesion.set(jsonUser);
      redirectUser(jsonUser);
    }
    loading.close();
  }

  async function login(email: string, password: string) {
    try {
      loading.open();
      const response = await axios.post("/login", { email, password });
      if (!response) throw new Error("Erro desconocido al loguearse");

      const user = response.data.usuario;
      const token = response.data.token;

      if (!user) throw new Error("user not provided");
      if (!token) throw new Error("token not provided");

      sesion.set(user);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      configToken(token);
      redirectUser(user);

      loading.close();
    } catch (error) {
      loading.close();
      if (error instanceof AxiosError) {
        console.log(error.response?.data?.message);
        throw new Error(error.response?.data?.message || error.message);
      } else {
        console.log(error);
      }
    }
  }

  async function logout() {
    const result = await Swal.fire({
      title: "Seguro desea cerrar sesión?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
    });

    if (result.isConfirmed) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sesion.clear();
      navigate("/");

      users.clear();
      registers.clear();
      employees.clear();
      business.clear();
      sesion.clear();
    }
  }

  function configToken(token: string) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  function redirectUser(user: Users) {
    if (user.rol === UsersRol.ADMIN) navigate("/usuarios");
    if (user.rol === UsersRol.BUSINESS) navigate("/empleados");
    if (user.rol === UsersRol.EMPLOYEE) navigate("/inicio");
  }

  return {
    user: sesion.data,
    persistence,
    login,
    logout,
  };
}
