export const hourOptions = [
  { value: 1, label: "1 hr" },
  { value: 2, label: "2 hrs" },
  { value: 3, label: "3 hrs" },
  { value: 4, label: "4 hrs" },
  { value: 5, label: "5 hrs" },
  { value: 6, label: "6 hrs" },
  { value: 7, label: "7 hrs" },
  { value: 8, label: "8 hrs" },
];
export const hourOptionsWithZero = [{ value: 0, label: "-" }, ...hourOptions];

// Event Types
export const eventTypes = [
  "GALA",
  "WEDDING",
  "SWEET_SIXTEEN",
  "BAR_OR_BAT_MITZVAH",
  "CORPORATE",
  "BABY_SHOWER",
  "BIRTHDAY",
  "SPECIAL",
] as const;
export type EventType = (typeof eventTypes)[number];

export const eventTypeLabels: Record<EventType, string> = {
  GALA: "Gala",
  WEDDING: "Wedding",
  SWEET_SIXTEEN: "Sweet Sixteen",
  BAR_OR_BAT_MITZVAH: "Bar or Bat Mitzvah",
  CORPORATE: "Corporate",
  BABY_SHOWER: "Baby Shower",
  BIRTHDAY: "Birthday Party",
  SPECIAL: "Special Event",
};
export const eventTypeOptions = eventTypes.map((type) => ({
  value: type,
  label: eventTypeLabels[type],
}));

// Food Types
export const foodTypes = ["COCKTAIL", "DINNER", "COCKTAIL_DINNER"] as const;
export type FoodType = (typeof foodTypes)[number];

export const foodTypeLabels: Record<FoodType, string> = {
  COCKTAIL: "Cocktail",
  DINNER: "Dinner",
  COCKTAIL_DINNER: "Cocktail & Dinner",
};
export const foodTypeOptions = foodTypes.map((type) => ({
  value: type,
  label: foodTypeLabels[type],
}));

export const dinnerServices = ["PLATED", "BUFFET"] as const;
export type DinnerService = (typeof dinnerServices)[number];

export const dinnerServiceLabels: Record<DinnerService, string> = {
  PLATED: "Plated",
  BUFFET: "Buffet",
};
export const dinnerServiceOptions = dinnerServices.map((type) => ({
  value: type,
  label: dinnerServiceLabels[type],
}));
