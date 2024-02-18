"use client";

import { KeyboardEvent } from "react";
import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./weatherSection.module.css";
import WeatherCard from "@/components/shared/weatherHome/WeatherCard";

const WeatherSection = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [newCity, setNewCity] = useState("");

  useEffect(() => {
    const savedCities = JSON.parse(Cookies.get("cities") || "[]");
    setCities(savedCities);
  }, []);

  const handleAddCity = useCallback(() => {
    const trimmedCity = newCity.trim();
    if (!trimmedCity) return;
    if (cities.includes(trimmedCity)) {
      alert(`${trimmedCity} is already added.`);
      setNewCity("");
      return;
    }
    const updatedCities = [...cities, trimmedCity];
    setCities(updatedCities);
    Cookies.set("cities", JSON.stringify(updatedCities), { expires: 7 });
    setNewCity("");
  }, [newCity, cities]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleAddCity();
      }
    },
    [handleAddCity],
  );

  return (
    <section className={styles.weatherSection}>
      <div className={styles.container}>
        <TextField
          className={styles.textField}
          label="Enter city name"
          variant="outlined"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          onKeyDown={handleKeyPress}
          size="small"
        />
        <Button variant="contained" onClick={handleAddCity}>
          Add City
        </Button>
      </div>
      <div className={styles.weatherCardsBlock}>
        {cities.map((city) => (
          <WeatherCard
            cityName={city}
            key={city}
            cities={cities}
            setCities={setCities}
          />
        ))}
      </div>
    </section>
  );
};

export default WeatherSection;
