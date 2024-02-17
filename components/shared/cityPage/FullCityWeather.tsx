"use client";

import { useWeather } from "@/lib/hooks/useWeather";
import { FullCityWeatherProps } from "@/types";
import styles from "@/components/shared/weatherHome/weatherSection.module.css";
import stylesPage from "./cityPage.module.css";
import { Typography, Card, CardContent, Grid, Box } from "@mui/material";
import Image from "next/image";
import { openWeatherIconURL } from "@/constants";

const FullCityWeather = ({ cityName }: FullCityWeatherProps) => {
  const { weather, loading, error, fetchWeather } = useWeather(cityName);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Card className={stylesPage.info}>
      <CardContent className={stylesPage.cardContent}>
        <Box className={styles.weatherCardTitleBlock}>
          <Typography variant="h5" className={stylesPage.title}>
            {weather?.name}
          </Typography>
          <Image
            src={`${openWeatherIconURL}${weather?.icon}.png`}
            alt={`${weather?.description} icon`}
            width={50}
            height={50}
          />
        </Box>
        <Box>
          <Typography variant="body1" className={stylesPage.temp}>
            {weather?.temp} <span>℃</span> (Feels like:{" "}
            {weather?.main.feels_like}℃)
          </Typography>
          <Typography variant="body2">
            Humidity: {weather?.main.humidity}%
          </Typography>
          <Typography variant="body2">
            Description: {weather?.description}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="start">
          <Typography variant="body2">
            Min Temp: {weather?.main.temp_min}℃
          </Typography>
          <Typography variant="body2">
            Max Temp: {weather?.main.temp_max}℃
          </Typography>
          <Typography variant="body2">
            Pressure: {weather?.main.pressure} hPa
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="start">
          <Typography variant="body2">
            Wind Speed: {weather?.wind.speed} m/s
          </Typography>
          <Typography variant="body2">
            Pressure: {weather?.main.pressure} hPa
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="start">
          <Typography variant="body2">
            Sunrise:{" "}
            {new Date(weather?.sys.sunrise * 1000).toLocaleTimeString()}
          </Typography>
          <Typography variant="body2">
            Sunset: {new Date(weather?.sys.sunset * 1000).toLocaleTimeString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FullCityWeather;
