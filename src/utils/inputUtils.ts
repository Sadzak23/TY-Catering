// Get today's date in user's local timezone
export const getTodayInLocalTimezone = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getTimeLabel = (value?: string): string =>
  value
    ? new Date(`1970-01-01T${value}`).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "/";

// Generate time options in 30-minute intervals
export const timeOptions = (() => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const value = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      const label = getTimeLabel(value);
      times.push({ value, label });
    }
  }
  return times;
})();
