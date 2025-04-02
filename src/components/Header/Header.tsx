import React from "react";
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
          {/* Pass a no-op function if you don't need an action on the button */}
          <Button3 text="შექმენი ახალი დავალება" onClick={() => {}} />
        </div>
      </div>
    </header>
  );
};

export default Header;
