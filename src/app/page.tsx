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

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <User />
      {/* Render the Round components here */}
      <Round color="pink" />
      <Round color="orange" />
      <Round color="blue" />
      <Round color="yellow" />
      {/* Render Square components with different priorities and sizes */}
      <Square priority="high" size="big" />
      <Square priority="medium" size="small" />
      <Square priority="low" size="big" />
      <Square priority="high" size="small" />
    </div>
  );
}
