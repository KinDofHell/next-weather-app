"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import WeatherCard from "@/components/shared/WeatherCard";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import styles from "./weatherSection.module.css";

const WeatherSection = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [newCity, setNewCity] = useState("");

  useEffect(() => {
    const savedCities = JSON.parse(Cookies.get("cities") || "[]");
    setCities(savedCities);
  }, []);

  const handleAddCity = () => {
    if (!newCity) return;
    if (cities.find((city) => city === newCity)) {
      setNewCity("");
      return;
    }
    const updatedCities = [...cities, newCity];
    setCities(updatedCities);
    Cookies.set("cities", JSON.stringify(updatedCities), { expires: 7 });
    setNewCity("");
  };

  return (
    <section className={styles.weatherSection}>
      <div className={styles.container}>
        <TextField
          className={styles.textField}
          label="Enter city name"
          variant="outlined"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
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
