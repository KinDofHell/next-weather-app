import { CityPageProps } from "@/types";

import styles from "./page.module.css";
import FullCityWeather from "@/components/shared/cityPage/FullCityWeather";
import TemperatureChart from "@/components/shared/cityPage/TemperatureChart";

const Page = ({ params: { cityName } }: CityPageProps) => {
  return (
    <div className={styles.cityPage}>
      <FullCityWeather cityName={cityName} />
      <TemperatureChart cityName={cityName} />
    </div>
  );
};
export default Page;
