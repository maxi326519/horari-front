import { Link, useLocation } from "react-router-dom";
import { UsersRol } from "../../../interfaces/Users";
import useAuth from "../../../hooks/useAuth";

import styles from "./Sidebar.module.css";
import usersSvg from "../../../assets/svg/users.svg";
// import logo from "../../../assets/img/logo.jpg";

const items = [
  {
    svg: usersSvg,
    path: "/usuarios",
    name: "Usuarios",
    rol: UsersRol.ANY,
    mobile: true,
  },
  {
    svg: usersSvg,
    path: "/empresas",
    name: "Empresas",
    rol: UsersRol.ANY,
    mobile: true,
  },
  {
    svg: usersSvg,
    path: "/registros",
    name: "Registros",
    rol: UsersRol.ANY,
    mobile: true,
  },
  {
    svg: usersSvg,
    path: "/empleados",
    name: "Empleados",
    rol: UsersRol.ANY,
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

  return (
    <div className={`${styles.sidebar} ${isOpen ? "" : styles.close}`}>
      <div className={styles.logoContainer}>
        {/* <img src={logo} alt="logo" /> */}
      </div>
      {items
        .filter(
          (item) =>
            auth.sesion?.rol === UsersRol.ADMIN || item.rol === auth.sesion?.rol
        )
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
  );
}
