import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

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
  const redirect = useNavigate();
  const auth = useAuth();
  const handleLogout = () => {
    Swal.fire({
      text: "¿Seguro que desea cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        auth.logout();
        redirect("/login");
      }
    });
  };

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
          <li>{auth.sesion.name}</li>
          <li onClick={handleLogout}>
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
