import styles from "./page.module.css";
import Buttons from "@/components/Buttons/Buttons";

export default function Home() {
  return (
    <div className={styles.page}>
      <Buttons />
    </div>
  );
}
