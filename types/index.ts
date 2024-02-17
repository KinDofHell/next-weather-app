import { Dispatch, SetStateAction } from "react";

export type WeatherData = Record<string, any>;

export type WeatherCardProps = {
  cityName: string;
  cities: string[];
  setCities: Dispatch<SetStateAction<string[]>>;
};

export type CityPageProps = {
  params: { cityName: string };
};

export type FullCityWeatherProps = {
  cityName: string;
};

export type TemperatureChartProps = {
  cityName: string;
};
