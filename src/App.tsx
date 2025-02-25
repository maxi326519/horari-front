import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import useLoading from "./hooks/useLoading.ts";
import useAuth from "./hooks/useAuth.ts";
import axios from "axios";

import Loading from "./components/Loading/index.tsx";
import UsersTable from "./pages/users/index.tsx";
import BusinessTable from "./pages/business/index.tsx";
import RegisterTable from "./pages/registers/index.tsx";
import EmployeesTable from "./pages/employees/index.tsx";
import NewRegister from "./pages/inicio.tsx";
import Login from "./pages/login.tsx";

import "./App.css";

function App() {
  const loading = useLoading();
  const sesion = useAuth();

  useEffect(() => {
    if (!sesion.user?.id) sesion.persistence();
  }, []);

  useEffect(() => {
    axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
  }, []);

  return (
    <div>
      {loading.state && <Loading />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/usuarios" element={<UsersTable />} />
        <Route path="/empresas" element={<BusinessTable />} />
        <Route path="/registros" element={<RegisterTable />} />
        <Route path="/inicio" element={<NewRegister />} />
        <Route path="/empleados" element={<EmployeesTable />} />
      </Routes>
    </div>
  );
}

export default App;
