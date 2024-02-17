import { useState, useEffect } from "react";
import { WeatherData } from "@/types";

export const useHourlyWeather = (city: string) => {
  const [weatherHourly, setWeatherHourly] = useState<WeatherData | null>(null);
  const [loadingHourly, setLoadingHourly] = useState(true);
  const [errorHourly, setErrorHourly] = useState<string | null>(null);

  const fetchWeather = async () => {
    setLoadingHourly(true);
    setErrorHourly(null);

    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherHourly(data.list);
    } catch (error) {
      setErrorHourly((error as Error).message);
    } finally {
      setLoadingHourly(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  return { weatherHourly, loadingHourly, errorHourly };
};
