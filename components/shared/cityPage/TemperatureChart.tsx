"use client";

import React from "react";
import { TemperatureChartProps, WeatherData } from "@/types";
import { useHourlyWeather } from "@/lib/hooks/useHourlyWeather";
import { Box, Typography } from "@mui/material";

import styles from "./cityPage.module.css";
import { calculateBarStyles, formatDate } from "@/lib/utils";

const TemperatureChart = ({ cityName }: TemperatureChartProps) => {
  const { weatherHourly, loadingHourly, errorHourly } =
    useHourlyWeather(cityName);

  if (loadingHourly) return <Typography>Loading...</Typography>;
  if (errorHourly)
    return <Typography color="error">Error: {errorHourly}</Typography>;

  const temps = weatherHourly?.map((item: WeatherData) => item.main.temp);
  const maxTemp = Math.max(...temps);
  const minTemp = Math.min(...temps);
  const tempRange = Math.max(maxTemp - minTemp, 1);

  return (
    <Box className={styles.chartContainer}>
      {weatherHourly?.map((item: WeatherData, index: number) => {
        const barStyles = calculateBarStyles(
          item.main.temp,
          minTemp,
          tempRange,
        );

        return (
          <Box key={item.dt} className={styles.barContainer} sx={barStyles}>
            <Typography variant="body2" color="common.white">
              {item.main.temp.toFixed(1)}°C
            </Typography>
            <Typography variant="caption" className={styles.hour}>
              {formatDate(item.dt, { hour: "2-digit", minute: "2-digit" })}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default TemperatureChart;
