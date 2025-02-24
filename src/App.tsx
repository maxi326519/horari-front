import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth.ts";

import UsersTable from "./pages/users/index.tsx";
import BusinessTable from "./pages/business/index.tsx";
import RegisterTable from "./pages/registers/index.tsx";
import EmployeesTable from "./pages/employees/index.tsx";
import Login from "./pages/login.tsx";

import "./App.css";

function App() {
  const auth = useAuth();
  const redirect = useNavigate();

  useEffect(
    () => {
      if (auth.sesion) redirect("/");
    },
    [
      /* auth.sesion */
    ]
  );

  return (
  <div className="">
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/usuarios" element={<UsersTable />} />
      <Route path="/empresas" element={<BusinessTable />} />
      <Route path="/registros" element={<RegisterTable />} />
      <Route path="/empleados" element={<EmployeesTable />} />
    </Routes>
  </div>
  );
}

export default App;
