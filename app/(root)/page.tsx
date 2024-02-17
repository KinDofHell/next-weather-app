import styles from "./page.module.css";
import WeatherSection from "@/components/shared/WeatherSection";

export default function Home() {
  return (
    <main className={styles.main}>
      <WeatherSection />
    </main>
  );
}
