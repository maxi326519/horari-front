import { Link, useLocation } from "react-router-dom";
import { UsersRol } from "../../../interfaces/Users";
import useAuth from "../../../hooks/useAuth";

import styles from "./Sidebar.module.css";
import usersSvg from "../../../assets/svg/users.svg";
import employeeSvg from "../../../assets/svg/employee.svg";
import businessSvg from "../../../assets/svg/business.svg";
import registerSvg from "../../../assets/svg/register.svg";
import logo from "../../../assets/img/logo.png";

const items = [
  {
    svg: usersSvg,
    path: "/inicio",
    name: "Inicio",
    rol: [UsersRol.EMPLOYEE],
    mobile: true,
  },
  {
    svg: usersSvg,
    path: "/usuarios",
    name: "Usuarios",
    rol: [UsersRol.ADMIN],
    mobile: true,
  },
  {
    svg: businessSvg,
    path: "/empresas",
    name: "Empresas",
    rol: [UsersRol.ADMIN],
    mobile: true,
  },
  {
    svg: employeeSvg,
    path: "/empleados",
    name: "Empleados",
    rol: [UsersRol.BUSINESS],
    mobile: true,
  },
  {
    svg: registerSvg,
    path: "/registros",
    name: "Registros",
    rol: [UsersRol.EMPLOYEE, UsersRol.BUSINESS],
    mobile: true,
  },
];

interface Props {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: Props) {
  const location = useLocation();
  const auth = useAuth();

  function handleSelected(path: string) {
    return location.pathname.includes(path);
  }

  function handleLogOut() {
    auth.logout();
  }

  return (
    <div className={`${styles.sidebar} ${isOpen ? "" : styles.close}`}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="logo" />
      </div>
      <div className="grow flex flex-col">
        {items
          .filter((item) => auth.user && item.rol.includes(auth.user?.rol))
          .map((item) => (
            <Link
              to={item.path}
              className={`${handleSelected(item.path) ? styles.selected : ""} ${
                !item.mobile && styles.onlyDesktop
              }`}
            >
              <img src={item.svg} alt={item.name} />
              <span>{item.name}</span>
            </Link>
          ))}
      </div>
      <div
        className="felx justify-center items-center text-center p-4 border-t cursor-pointer"
        onClick={handleLogOut}
      >
        <span>Cerrar sesión</span>
      </div>
    </div>
  );
}
