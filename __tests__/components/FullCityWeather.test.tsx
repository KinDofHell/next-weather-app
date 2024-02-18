import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FullCityWeather from "@/components/shared/cityPage/FullCityWeather";
import { useWeather } from "@/lib/hooks/useWeather";

jest.mock("@/lib/hooks/useWeather");
const mockedUseWeather = useWeather as jest.Mock;

const mockWeatherData = {
  name: "Kyiv",
  main: {
    temp: 10,
    feels_like: 8,
    temp_min: 5,
    temp_max: 15,
    pressure: 1020,
    humidity: 80,
  },
  wind: { speed: 3 },
  description: "Cloudy",
  icon: "10d",
  sys: { sunrise: 1661834187, sunset: 1661882248 },
};

describe("FullCityWeather", () => {
  beforeEach(() => {
    mockedUseWeather.mockClear();
  });

  it("displays loading state", () => {
    mockedUseWeather.mockReturnValue({
      loading: true,
      weather: null,
      error: null,
    });

    render(<FullCityWeather cityName="Kyiv" />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays an error message when fetch fails", () => {
    mockedUseWeather.mockReturnValue({
      loading: false,
      weather: null,
      error: "Failed to fetch",
    });

    render(<FullCityWeather cityName="Kyiv" />);
    expect(screen.getByText("Error: Failed to fetch")).toBeInTheDocument();
  });

  it("displays weather data correctly", async () => {
    mockedUseWeather.mockReturnValue({
      loading: false,
      weather: mockWeatherData,
      error: null,
    });

    render(<FullCityWeather cityName="Kyiv" />);
    expect(await screen.findByText("Kyiv")).toBeInTheDocument();
    expect(await screen.findByText("Humidity: 80%")).toBeInTheDocument();
    expect(await screen.findByText("Description: Cloudy")).toBeInTheDocument();
    expect(await screen.findByText("Min Temp: 5℃")).toBeInTheDocument();
    expect(await screen.findByText("Max Temp: 15℃")).toBeInTheDocument();
    expect(await screen.findByText("Pressure: 1020hPa")).toBeInTheDocument();
    expect(await screen.findByText("Wind Speed: 3m/s")).toBeInTheDocument();
  });
});
