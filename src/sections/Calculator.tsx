"use client";

import { Button } from "@/components/Button";
import { DateInput } from "@/components/DateInput";
import { Select } from "@/components/Select";
import {
  DinnerService,
  dinnerServiceOptions,
  type EventType,
  eventTypeOptions,
  FoodType,
  foodTypeOptions,
  hourOptions,
  hourOptionsWithZero,
} from "@/utils/calculatorOptions";
import { getTodayInLocalTimezone, timeOptions } from "@/utils/inputUtils";
import { useState, type FC } from "react";
import { toast } from "react-toastify";

export interface CalculatorData {
  email?: string;
  phone?: string;
  callTimeFrom?: string;
  callTimeTo?: string;
  eventDate?: string;
  startTime?: string;
  endTime?: string;
  guests?: string;
  eventType?: EventType;
  barSimpleH?: number;
  barStandardH?: number;
  barPremiumH?: number;
  foodType?: FoodType | "";
  savory?: string;
  sweet?: string;
  cocktailHours?: string;
  dinnerService?: DinnerService | "";
  salad?: "single" | "choice" | "";
  main?: "single" | "choice" | "";
}

const placeholder = "-";
const defaultFormData: CalculatorData = {
  cocktailHours: "2",
};

export const Calculator: FC = () => {
  const [formData, setFormData] = useState<CalculatorData>(defaultFormData);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const res = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(
          formData.eventType === "SPECIAL"
            ? "Thank you for your inquiry! We will contact you shortly."
            : "Check your email for the quote!"
        );
        setFormData(defaultFormData);
      } else {
        toast.error(data.error || "Failed to calculate. Please try again.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <section id="calculator">
        <h2>Calculate your next event</h2>

        <div className="form-row">
          <DateInput
            label="Event Date"
            name="eventDate"
            required
            min={getTodayInLocalTimezone()}
            value={formData.eventDate}
            onChange={handleChange}
          />
          <div className="form-row-group">
            <Select
              label="Start Time"
              name="startTime"
              required
              value={formData.startTime}
              placeholder={placeholder}
              onChange={handleChange}
              options={timeOptions}
            />
            <Select
              label="End Time"
              name="endTime"
              required
              value={formData.endTime}
              placeholder={placeholder}
              onChange={handleChange}
              options={timeOptions}
            />
          </div>
          <label title="Number of Guests">
            Number of Guests
            <input
              type="number"
              name="guests"
              placeholder={placeholder}
              required
              value={formData.guests ?? ""}
              onChange={handleChange}
              min={1}
            />
          </label>
          <Select
            label="Event Type"
            name="eventType"
            required
            value={formData.eventType}
            placeholder={placeholder}
            onChange={handleChange}
            options={eventTypeOptions}
          />
          {formData.eventType !== "SPECIAL" && (
            <label title="Email">
              Email
              <input
                type="email"
                name="email"
                placeholder={placeholder}
                required
                value={formData.email ?? ""}
                onChange={handleChange}
              />
            </label>
          )}
        </div>

        {formData.eventType === "SPECIAL" ? (
          <>
            <h3>Contact info</h3>
            <div className="form-row">
              <label title="Email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder={placeholder}
                  required
                  value={formData.email ?? ""}
                  onChange={handleChange}
                />
              </label>
              <label title="Phone Number">
                Phone Number
                <input
                  type="tel"
                  name="phone"
                  placeholder={placeholder}
                  value={formData.phone ?? ""}
                  onChange={handleChange}
                />
              </label>

              <Select
                label="Preferred Call Time (From)"
                name="callTimeFrom"
                value={formData.callTimeFrom}
                placeholder={placeholder}
                onChange={handleChange}
                options={timeOptions}
              />
              <Select
                label="Preferred Call Time (To)"
                name="callTimeTo"
                value={formData.callTimeTo}
                placeholder={placeholder}
                onChange={handleChange}
                options={timeOptions}
              />
            </div>
            <Button label="Set up a call" type="submit" />
          </>
        ) : (
          <>
            <h3>Bar</h3>
            <div className="form-row">
              <Select
                label="Beer & Wine ($10/person)"
                name="barSimpleH"
                options={hourOptionsWithZero}
                value={formData.barSimpleH}
                onChange={handleChange}
              />
              <Select
                label="Standard bar ($13/person)"
                name="barStandardH"
                options={hourOptionsWithZero}
                value={formData.barStandardH}
                onChange={handleChange}
              />
              <Select
                label="Premium bar ($15/person)"
                name="barPremiumH"
                options={hourOptionsWithZero}
                value={formData.barPremiumH}
                onChange={handleChange}
              />
            </div>
            <h3>Food</h3>
            <div className="form-row">
              <Select
                label="Food Type"
                name="foodType"
                required
                placeholder={placeholder}
                options={foodTypeOptions}
                value={formData.foodType}
                onChange={handleChange}
              />
            </div>
            {formData.foodType?.includes("COCKTAIL") && (
              <div className="form-row">
                <Select
                  label="Cocktail hours"
                  name="cocktailHours"
                  options={hourOptions}
                  value={formData.cocktailHours}
                  onChange={handleChange}
                />

                <div className="form-row-group">
                  <Select
                    label="Savory"
                    required
                    options={[
                      { value: 0, label: "0" },
                      { value: 4, label: "4" },
                      { value: 5, label: "5" },
                      { value: 6, label: "6" },
                      { value: 7, label: "7" },
                      { value: 8, label: "8" },
                    ]}
                    value={formData.savory}
                    onChange={handleChange}
                  />
                  <Select
                    label="Sweet"
                    required
                    options={[
                      { value: 0, label: "0" },
                      { value: 2, label: "2" },
                      { value: 3, label: "3" },
                      { value: 4, label: "4" },
                    ]}
                    value={formData.sweet}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            {formData.foodType?.includes("DINNER") && (
              <div className="form-row">
                <Select
                  label="Dinner Service"
                  name="dinnerService"
                  required
                  placeholder={placeholder}
                  options={dinnerServiceOptions}
                  value={formData.dinnerService}
                  onChange={handleChange}
                />
                <Select
                  label="Salad"
                  name="salad"
                  required
                  placeholder={placeholder}
                  options={[
                    { value: "single", label: "A single salad" },
                    { value: "choice", label: "A choice of salads" },
                  ]}
                  value={formData.salad}
                  onChange={handleChange}
                />
                <Select
                  label="Main"
                  name="main"
                  required
                  placeholder={placeholder}
                  options={[
                    { value: "single", label: "A single entree" },
                    { value: "choice", label: "A choice of entrees" },
                  ]}
                  value={formData.main}
                  onChange={handleChange}
                />
              </div>
            )}
            <Button
              label={isLoading ? "Calculating..." : "Calculate"}
              type="submit"
              disabled={isLoading}
            />
          </>
        )}
      </section>
    </form>
  );
};
