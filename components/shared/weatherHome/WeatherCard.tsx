import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { WeatherCardProps } from "@/types";
import { useWeather } from "@/lib/hooks/useWeather";
import { openWeatherIconURL } from "@/constants";
import Cookies from "js-cookie";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./weatherSection.module.css";

const WeatherCard = ({ cityName, cities, setCities }: WeatherCardProps) => {
  const { weather, loading, error, fetchWeather } = useWeather(cityName);

  const handleDelete = useCallback(() => {
    const filteredCities = cities.filter((city) => city !== cityName);
    Cookies.set("cities", JSON.stringify(filteredCities));
    setCities(filteredCities);
  }, [cityName, cities, setCities]);

  useEffect(() => {
    if (error) {
      setTimeout(handleDelete, 3000);
    }
  }, [error, handleDelete]);

  if (loading)
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );

  if (error)
    return (
      <Typography
        variant="body2"
        color="error"
        className={styles.weatherCardError}
      >
        Error loading weather for {cityName}. It will be deleted in 3 seconds!
      </Typography>
    );

  if (!weather) return null;

  return (
    <Card className={styles.weatherCardWrapper}>
      <Link href={`/city/${cityName}`} passHref>
        <CardContent className={styles.weatherCard}>
          <div className={styles.weatherCardTitleBlock}>
            <Typography variant="h5">{weather.name}</Typography>
            <Image
              src={`${openWeatherIconURL}${weather.icon}.png`}
              alt={`${weather.description} icon`}
              width={36}
              height={36}
            />
          </div>
          <Typography variant="body1">
            {weather.temp}
            <span>℃</span>
          </Typography>
          <Typography variant="body2">{weather.humidity}%</Typography>
          <Typography variant="body2">{weather.description}</Typography>
        </CardContent>
      </Link>
      <CardActions>
        <Button size="small" color="primary" onClick={fetchWeather}>
          Refresh
        </Button>
        <Button size="small" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default WeatherCard;
