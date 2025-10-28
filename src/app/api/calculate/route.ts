import { CalculatorData } from "@/sections/Calculator";
import {
  DinnerService,
  dinnerServiceLabels,
  EventType,
  eventTypeLabels,
  FoodType,
  foodTypeLabels,
} from "@/utils/calculatorOptions";
import { calculateTotal, formatCurrency } from "@/utils/calculatorUtils";
import { getTimeLabel } from "@/utils/inputUtils";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const req: CalculatorData = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    if (req.eventType !== "SPECIAL") {
      const { barPrice, foodPrice, total } = calculateTotal(req);

      const tyQuoteEmailData = [
        {
          label: "Contact Info",
          content: [{ label: "Email", value: req.email }],
        },
        {
          label: "Event Info",
          content: [
            {
              label: "Type of Event",
              value: eventTypeLabels[req.eventType as EventType],
            },
            {
              label: "Event Date",
              value: dayjs(req.eventDate).format("MMM DD, YYYY"),
            },
            {
              label: "Event Time",
              value: `${getTimeLabel(req.startTime)} - ${getTimeLabel(
                req.endTime
              )}`,
            },
            { label: "Number of guests", value: req.guests },
          ],
        },
        {
          label: "Bar Service",
          content: [
            {
              label: "Beer & Wine",
              value: req.barSimpleH ? `${req.barSimpleH}h` : undefined,
            },
            {
              label: "Standard bar",
              value: req.barStandardH ? `${req.barStandardH}h` : undefined,
            },
            {
              label: "Premium bar",
              value: req.barPremiumH ? `${req.barPremiumH}h` : undefined,
            },
          ],
        },
        {
          label: "Food Service",
          content: [
            {
              label: "Food Type",
              value: foodTypeLabels[req.foodType as FoodType],
            },
            {
              label: "Cocktail Hours",
              value: req.cocktailHours ? `${req.cocktailHours}h` : undefined,
            },
            { label: "Savory Items", value: req.savory },
            { label: "Sweet Items", value: req.sweet },
            {
              label: "Dinner Service",
              value: dinnerServiceLabels[req.dinnerService as DinnerService],
            },
            { label: "Salad Option", value: req.salad },
            { label: "Main Option", value: req.main },
          ],
        },
        {
          label: "Quote Summary",
          content: [
            { label: "Bar Service", value: formatCurrency(barPrice) },
            { label: "Food Service", value: formatCurrency(foodPrice) },
            { label: "Total", value: formatCurrency(total) },
          ],
        },
      ];

      const tyQuoteEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
        </head>
          <body>
          ${tyQuoteEmailData
            .map(
              (section) => `
            <h2>${section.label}</h2>
            ${section.content
              .map((item) =>
                item.value
                  ? `<p><strong>${item.label}:</strong> ${item.value}</p>`
                  : ""
              )
              .join("\n")}
          `
            )
            .join("<br/>")}
          </body>
        </html>
          `;

      const customerQuoteEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            p { white-space: pre-line; }
            span { font-weight: bold; }
          </style>
        </head>
          <body>
            <h2>Thank you for considering Truly Yours Catering for your upcoming event!</h2>
            <p>Based on the details you provided, your custom catering quote total is <span>${formatCurrency(
              total
            )}.</span></p>
            <p>This includes food & beverage options for the hours selected, premium ingredients, and the elegant presentation that defines every Truly Yours experience.</p>
            <p>Should you wish to review menu options, refine your selections, or discuss additional enhancements such as tablescapes, service staff, or rentals, our team would be happy to assist.</p>
            <p>Please don’t hesitate to reach out to us at info@trulyyourscateringco.com for any questions or adjustments.</p>
            <p>We look forward to creating a memorable and refined dining experience for you and your guests.</p>
            <br></br>
            <p>Truly Yours Catering.
            Your Vision. Our Expertise.</p>
            <p>Truly Yours
            📧 info@trulyyourscateringco.com
            🌐 www.trulyyourscateringco.com</p>
        </html>
          `;

      const emailPromises = [
        transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_TO,
          subject: "New Event Quote Request",
          html: tyQuoteEmailHtml,
        }),
        transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: req.email,
          subject: "Your Custom Catering Quote from Truly Yours Catering",
          html: customerQuoteEmailHtml,
        }),
      ];

      await Promise.all(emailPromises);

      return NextResponse.json({ success: true });
    } else {
      const specialEventData = [
        {
          label: "Contact Info",
          content: [
            { label: "Email", value: req.email },
            { label: "Phone", value: req.phone },
            {
              label: "Call Time",
              value: `${getTimeLabel(req.callTimeFrom)} - ${getTimeLabel(
                req.callTimeTo
              )}`,
            },
          ],
        },
        {
          label: "Event Info",
          content: [
            { label: "Type of Event", value: "Special Event" },
            {
              label: "Event Date",
              value: req.eventDate
                ? dayjs(req.eventDate).format("MMM DD, YYYY")
                : null,
            },
            {
              label: "Event Time",
              value: `${getTimeLabel(req.startTime)} - ${getTimeLabel(
                req.endTime
              )}`,
            },
            { label: "Guests", value: req.guests },
          ],
        },
        {
          label: "Requires Custom Consultation",
          content: [],
        },
      ];

      const specialEventEmailHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
  </head>
    <body>
    ${specialEventData
      .map(
        (section) => `
      <h2>${section.label}</h2>
      ${section.content
        .map((item) =>
          item.value
            ? `<p><strong>${item.label}:</strong> ${item.value}</p>`
            : ""
        )
        .join("\n")}
    `
      )
      .join("<br/>")}
    </body>
  </html>
`;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: "New Event Quote Request",
        html: specialEventEmailHtml,
      });

      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Email send failed" }, { status: 500 });
  }
}
