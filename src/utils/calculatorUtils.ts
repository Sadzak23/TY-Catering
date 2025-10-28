import { CalculatorData } from "@/sections/Calculator";
import { calculatorData } from "@/utils/data";

const calculateCocktailPricePP = (data: CalculatorData): number => {
  const savoryCount = data.savory ? Number(data.savory) : 0;
  const sweetCount = data.sweet ? Number(data.sweet) : 0;
  const cocktailPricePP =
    (calculatorData.cocktail.savory * savoryCount +
      calculatorData.cocktail.sweet * sweetCount) *
    Number(data.cocktailHours);

  return cocktailPricePP;
};

const calculateDinnerPricePP = (data: CalculatorData): number => {
  if (data.dinnerService && data.guests) {
    const basePricePP = calculatorData.dinner[data.dinnerService];
    const extraSaladPricePP =
      data.salad === "choice" ? calculatorData.dinner.extraSalad : 0;
    const extraMainPricePP =
      data.main === "choice" ? calculatorData.dinner.extraMain : 0;
    return basePricePP + extraSaladPricePP + extraMainPricePP;
  }
  return 0;
};

const calculateFoodPrice = (
  data: CalculatorData,
  guestsCount: number
): number => {
  switch (data.foodType) {
    case "COCKTAIL":
      return calculateCocktailPricePP(data) * guestsCount;
    case "DINNER":
      return calculateDinnerPricePP(data) * guestsCount;
    case "COCKTAIL_DINNER": {
      const cocktailPrice = calculateCocktailPricePP(data) * guestsCount;
      const dinnerPrice = calculateDinnerPricePP(data) * guestsCount;
      return cocktailPrice + dinnerPrice;
    }
  }
  return 0;
};

const calculateBarPrice = (
  data: CalculatorData,
  guestsCount: number
): number => {
  const bwPrice = (data.barSimpleH ?? 0) * calculatorData.bar.SIMPLE;
  const standardPrice = (data.barStandardH ?? 0) * calculatorData.bar.STANDARD;
  const premiumPrice = (data.barPremiumH ?? 0) * calculatorData.bar.PREMIUM;

  return (bwPrice + standardPrice + premiumPrice) * guestsCount;
};

export const calculateTotal = (data: CalculatorData) => {
  const guestsCount = Number(data.guests ?? 0);
  const barPrice = calculateBarPrice(data, guestsCount);
  const foodPrice = calculateFoodPrice(data, guestsCount);

  const total = barPrice + foodPrice;

  return { barPrice, foodPrice, total };
};

export const formatCurrency = (number?: string | number) =>
  `$${Number(number ?? 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
