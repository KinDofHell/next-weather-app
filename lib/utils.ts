type FormatDateOptions = {
  hour: "2-digit" | "numeric";
  minute: "2-digit" | "numeric";
};

//Convert timestamp to default date format
export const formatDate = (
  timestamp: number,
  options: FormatDateOptions | {} = {},
) => {
  return new Date(timestamp * 1000).toLocaleTimeString([], options);
};

//Calculate style properties for temperature bars
export const calculateBarStyles = (
  temp: number,
  minTemp: number,
  tempRange: number,
) => {
  const marginBottom = ((temp - minTemp) / tempRange) * 100;
  const backgroundColor =
    temp > 15 ? "orange" : temp < 4 ? "lightblue" : "slategray";

  return { marginBottom: `${marginBottom}px`, backgroundColor };
};
