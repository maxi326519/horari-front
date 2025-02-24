import { useState } from "react";

import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

import styles from "./Dashboard.module.css";

interface Props {
  children: React.ReactElement;
  title: string;
}

export default function Dashboard({ children, title }: Props) {
  const [open, setOpen] = useState<boolean>(true);

  function handleOpen() {
    setOpen(!open);
  }

  return (
    <div className={styles.dashboard}>
      <Navbar title={title} isOpen={open} onSidebar={handleOpen} />
      <Sidebar isOpen={open} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
