"use client";

import React from "react";
import { useWeather } from "@/lib/hooks/useWeather";
import { FullCityWeatherProps } from "@/types";
import styles from "../weatherHome/weatherSection.module.css";
import stylesPage from "./cityPage.module.css";
import { Typography, Card, CardContent, Box } from "@mui/material";
import Image from "next/image";
import { openWeatherIconURL } from "@/constants";
import { formatDate } from "@/lib/utils";

const WeatherAttribute = ({
  label,
  value,
  unit = "",
}: {
  label: string;
  value: string | number;
  unit?: string;
}) => <Typography variant="body2">{`${label}: ${value}${unit}`}</Typography>;

const FullCityWeather = ({ cityName }: FullCityWeatherProps) => {
  const { weather, loading, error } = useWeather(cityName);

  return (
    <Card className={stylesPage.info}>
      <CardContent className={stylesPage.cardContent}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography>Error: {error}</Typography>
        ) : (
          <>
            <Box className={styles.weatherCardTitleBlock}>
              <Typography variant="h5" className={stylesPage.title}>
                {weather?.name}
              </Typography>
              <Image
                src={`${openWeatherIconURL}${weather?.icon}.png`}
                alt={weather?.description || "Weather icon"}
                width={50}
                height={50}
              />
            </Box>
            <Box>
              <Typography variant="body1" className={stylesPage.temp}>
                {weather?.temp} <span>℃</span> (Feels like:{" "}
                {weather?.main.feels_like}℃)
              </Typography>
              <WeatherAttribute
                label="Humidity"
                value={weather?.main.humidity}
                unit="%"
              />
              <WeatherAttribute
                label="Description"
                value={weather?.description}
              />
            </Box>
            <Box display="flex" flexDirection="column" alignItems="start">
              <WeatherAttribute
                label="Min Temp"
                value={
                  weather?.main.temp_min ? weather.main.temp_min : "Loading"
                }
                unit="℃"
              />
              <WeatherAttribute
                label="Max Temp"
                value={
                  weather?.main.temp_max ? weather.main.temp_max : "Loading"
                }
                unit="℃"
              />
              <WeatherAttribute
                label="Wind Speed"
                value={weather?.wind.speed}
                unit="m/s"
              />
              <WeatherAttribute
                label="Pressure"
                value={weather?.main.pressure}
                unit="hPa"
              />
              <WeatherAttribute
                label="Sunrise"
                value={formatDate(weather?.sys.sunrise)}
              />
              <WeatherAttribute
                label="Sunset"
                value={formatDate(weather?.sys.sunset)}
              />
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default FullCityWeather;
