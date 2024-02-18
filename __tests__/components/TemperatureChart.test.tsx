import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useHourlyWeather } from "@/lib/hooks/useHourlyWeather";
import TemperatureChart from "@/components/shared/cityPage/TemperatureChart";

const { expect, describe, it } = require("@jest/globals");

jest.mock("@/lib/hooks/useHourlyWeather");

const mockedUseHourlyWeather = useHourlyWeather as jest.Mock;

describe("TemperatureChart", () => {
  it("displays loading state", () => {
    mockedUseHourlyWeather.mockReturnValue({
      loadingHourly: true,
      weatherHourly: null,
      errorHourly: null,
    });

    render(<TemperatureChart cityName="Kyiv" />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays an error message when fetch fails", () => {
    mockedUseHourlyWeather.mockReturnValue({
      loadingHourly: false,
      weatherHourly: null,
      errorHourly: "Failed to fetch",
    });

    render(<TemperatureChart cityName="Kyiv" />);
    expect(screen.getByText(/Error:/i)).toBeInTheDocument();
  });

  it("displays weather data correctly", async () => {
    const mockData = [
      { dt: 1600000000, main: { temp: 20 }, weather: [{ main: "Clear" }] },
      { dt: 1600003600, main: { temp: 15 }, weather: [{ main: "Clouds" }] },
    ];
    mockedUseHourlyWeather.mockReturnValue({
      loadingHourly: false,
      weatherHourly: mockData,
      errorHourly: null,
    });

    render(<TemperatureChart cityName="Kyiv" />);
    await waitFor(() => {
      const tempElements = screen.getAllByText(/°C/i);
      expect(tempElements.length).toBe(mockData.length);
      expect(tempElements[0]).toHaveTextContent("20.0°C");
      expect(tempElements[1]).toHaveTextContent("15.0°C");
    });
  });
});
