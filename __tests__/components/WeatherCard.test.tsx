import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import WeatherCard from "../../components/shared/weatherHome/WeatherCard";
const { expect, describe, it } = require("@jest/globals");

jest.mock("../../lib/hooks/useWeather", () => ({
  useWeather: () => ({
    weather: {
      name: "Kyiv",
      icon: "01d",
      temp: "25",
      humidity: "60%",
      description: "Clear sky",
    },
    loading: false,
    error: null,
    fetchWeather: jest.fn(),
  }),
}));

describe("WeatherCard", () => {
  it("renders weather information correctly", () => {
    render(<WeatherCard cityName="Kyiv" cities={[]} setCities={jest.fn()} />);

    expect(screen.getByText("Kyiv")).toBeInTheDocument();
    expect(screen.getByText("Clear sky")).toBeInTheDocument();
  });

  it("calls setCities on delete", async () => {
    const mockSetCities = jest.fn();
    render(
      <WeatherCard
        cityName="Kyiv"
        cities={["Kyiv"]}
        setCities={mockSetCities}
      />,
    );

    fireEvent.click(screen.getByText("Delete"));
    await waitFor(() => expect(mockSetCities).toHaveBeenCalledTimes(1));
  });
});
