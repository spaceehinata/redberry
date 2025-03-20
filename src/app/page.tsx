import styles from "./page.module.css";
import React from "react";
import Header from "@/components/Header/Header";
import Button1 from "@/components/Buttons/Button1/Button1";
import Button2 from "@/components/Buttons/Button2/Button2";
import Button3 from "@/components/Buttons/Button3/Button3";
import Button4 from "@/components/Buttons/Button4/Button4";
import Button5 from "@/components/Buttons/Button5/Button5";
import DesignButton from "@/components/Buttons/DesignButton/DesignButton";
import MarketingButton from "@/components/Buttons/MarketingButton/MarketingButton";
import LogisticsButton from "@/components/Buttons/LogisticsButton/LogisticsButton";
import ITButton from "@/components/Buttons/ITButton/ITButton";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <DesignButton />
      <MarketingButton />
      <LogisticsButton />
      <ITButton />
    </div>

  );
}
