import React from "react";
import Link from "next/link"; // Next.js Link-ის იმპორტი
import styles from "./Header.module.scss";
import Button2 from "../Buttons/Button2/Button2";
import Button3 from "../Buttons/Button3/Button3";

type Props = {
  onOpenModal: () => void;
};

const Header = ({ onOpenModal }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.momentum}>
        Momentum <img src="/asserts/Hourglass.svg" alt="" />
      </div>
      <div className={styles.buttons}>
        <Button2 onClick={onOpenModal} />
        <div className={styles.Buttons}>
          <Link href="/addtask">
            <Button3 text="შექმენი ახალი დავალება" onClick={() => {}} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
