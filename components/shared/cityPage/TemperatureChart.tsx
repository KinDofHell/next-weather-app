"use client";

import React from "react";
import { TemperatureChartProps, WeatherData } from "@/types";
import { useHourlyWeather } from "@/lib/hooks/useHourlyWeather";
import { Box, Typography } from "@mui/material";

import styles from "./cityPage.module.css";

const TemperatureChart = ({ cityName }: TemperatureChartProps) => {
  const { weatherHourly, loadingHourly, errorHourly } =
    useHourlyWeather(cityName);

  if (loadingHourly) return <Typography>Loading...</Typography>;
  if (errorHourly)
    return <Typography color="error">Error: {errorHourly}</Typography>;

  const maxTemp =
    Math.max(...weatherHourly?.map((item: WeatherData) => item.main.temp)) || 0;
  const minTemp =
    Math.min(...weatherHourly?.map((item: WeatherData) => item.main.temp)) || 0;
  const tempRange = minTemp - maxTemp || 1;

  return (
    <Box className={styles.chartContainer}>
      {weatherHourly?.map((item: WeatherData, index: number) => (
        <Box
          key={index}
          className={styles.barContainer}
          sx={{
            marginBottom: `${
              (1 - (item.main.temp - minTemp) / tempRange) * 100
            }px`,
            backgroundColor: `${
              item.main.temp > 15
                ? "orange"
                : item.main.temp < 4
                ? "lightblue"
                : "slategray"
            }`,
          }}
        >
          <Typography variant="body2" color="common.white">
            {item.main.temp.toFixed(1)}°C
          </Typography>
          <Typography variant="caption" className={styles.hour}>
            {new Date(item.dt * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TemperatureChart;
