import useAuth from "../../../hooks/useAuth";

import styles from "./Navbar.module.css";
import userSvg from "../../../assets/svg/user.svg";
import menuSvg from "../../../assets/svg/dashboard/menu.svg";
import closeSvg from "../../../assets/svg/dashboard/close.svg";
import logoutSvg from "../../../assets/svg/dashboard/logout.svg";

interface Props {
  title: string;
  isOpen: boolean;
  onSidebar: () => void;
}

export default function Navbar({ title, isOpen, onSidebar }: Props) {
  const auth = useAuth();

  return (
    <nav className={styles.navbar}>
      <h2>{title}</h2>
      <div className={styles.profile}>
        <div className={styles.imgContainer}>
          <img src={userSvg} alt="user" />
        </div>
        <ul className={styles.menu}>
          <li>
            <b>Perfil</b>
          </li>
          <li>
            <span
              className={`block w-full text-center text-sm rounded-sm py-1 ${
                auth.user?.rol === "Admin"
                  ? "text-blue-500 bg-blue-100"
                  : auth.user?.rol === "Empresa"
                  ? "text-green-500 bg-green-100"
                  : auth.user?.rol === "Empleado"
                  ? "text-yellow-500 bg-yellow-100"
                  : ""
              }`}
            >
              {auth.user?.rol}
            </span>
          </li>
          <li>{auth.user?.name}</li>
          <li onClick={() => auth.logout()}>
            <img src={logoutSvg} alt="logout" /> <span>Cerrar sesion</span>
          </li>
        </ul>
      </div>
      <button className={styles.menu} onClick={() => onSidebar()}>
        {isOpen ? (
          <img src={closeSvg} alt="close" />
        ) : (
          <img src={menuSvg} alt="menu" />
        )}
      </button>
    </nav>
  );
}
