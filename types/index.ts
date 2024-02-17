import { Dispatch, SetStateAction } from "react";

export type WeatherData = Record<string, any>;

export type WeatherCardProps = {
  cityName: string;
  cities: string[];
  setCities: Dispatch<SetStateAction<string[]>>;
};
