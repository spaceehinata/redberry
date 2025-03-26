import styles from "./page.module.css";
import React from "react";
import Header from "@/components/Header/Header";
import Button1 from "@/components/Buttons/Button1/Button1";
import Button2 from "@/components/Buttons/Button2/Button2";
import Button3 from "@/components/Buttons/Button3/Button3";
import Button4 from "@/components/Buttons/Button4/Button4";
import Button5 from "@/components/Buttons/Button5/Button5";
import Round from "@/components/Tag/Round/Round";
import User from "@/components/User/User";
import Square from "@/components/Tag/Square/Square";
import Dropdown from "@/components/Dropdown/Dropdown";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* <Header />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <User /> */}

      {/* Dropdown კომპონენტები */}
      <Dropdown
        title="დეპარტამენტი"
        apiEndpoint="https://momentum.redberryinternship.ge/api/departments"
      />
      <Dropdown
        title="პრიორიტეტი"
        apiEndpoint="https://momentum.redberryinternship.ge/api/priorities"
      />
      <Dropdown
        title="თანამშრომელი"
        apiEndpoint="https://momentum.redberryinternship.ge/api/employees"
      />
    </div>
  );
}
