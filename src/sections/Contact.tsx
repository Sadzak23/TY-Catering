"use client";

import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import { Button } from "@/components/Button";

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  guests: string;
  message: string;
}

export const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    guests: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Your message was sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventDate: "",
          guests: "",
          message: "",
        });
      } else {
        toast.error(data.error || "Failed to send your message.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact">
      <form className="contactForm" onSubmit={handleSubmit}>
        <h3>Contact us</h3>
        <p>we are excited to get planning!</p>
        <h4>Contact Information</h4>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone no."
          value={formData.phone}
          onChange={handleChange}
        />

        <h4>Event Type</h4>
        <DatePicker
          selected={
            formData.eventDate ? dayjs(formData.eventDate).toDate() : null
          }
          onChange={(date: Date | null) =>
            setFormData((prev) => ({
              ...prev,
              eventDate: dayjs(date).format("MMM DD, YYYY"),
            }))
          }
          placeholderText="Event Date"
          minDate={new Date()}
          className="customDateInput"
          required
        />
        <input
          type="text"
          name="guests"
          placeholder="Expected number of guests"
          required
          value={formData.guests}
          onChange={handleChange}
        />

        <h4>Tell us anything more that can help!</h4>
        <textarea
          name="message"
          rows={5}
          placeholder="Type here..."
          value={formData.message}
          onChange={handleChange}
        />

        <Button
          label={isLoading ? "Sending..." : "Submit"}
          type="submit"
          disabled={isLoading}
        />
      </form>
      <ToastContainer hideProgressBar closeOnClick pauseOnFocusLoss={false} />
    </section>
  );
};
