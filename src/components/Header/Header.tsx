import React from "react";
import Link from "next/link"; // Next.js Link import
import styles from "./Header.module.scss";
import Button2 from "../Buttons/Button2/Button2";
import Button3 from "../Buttons/Button3/Button3";
import Image from "next/image"; // 🛠 import Image from next/image

type Props = {
  onOpenModal: () => void;
};

const Header = ({ onOpenModal }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.momentum}>
        Momentum
        <Image
          src="/asserts/Hourglass.svg"
          alt="Hourglass icon"
          width={24} // Example size, adjust as needed
          height={24} // Example size, adjust as needed
        />
      </div>
      <div className={styles.buttons}>
        <Button2 onClick={onOpenModal} />
        <div className={styles.Buttons}>
          <Link href="/addtask">
            <Button3 text="შექმნი ახალი დავალება" onClick={() => {}} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
