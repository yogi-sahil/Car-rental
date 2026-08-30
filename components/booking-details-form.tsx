"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import flatpickr from "flatpickr";
import type { Instance } from "flatpickr/dist/types/instance";
import { businessDetails, cars, destinations } from "@/lib/data";
import { ArrowIcon, CheckIcon } from "./icons";

const fallbackWhatsAppNumber = businessDetails.whatsappNumber;

const standardPickupHubs = [
  "Jaipur Airport",
  "Jaipur Railway Station",
  "Vaishali Nagar",
  "Mansarovar",
  "Jagatpura",
  "Sindhi Camp",
];

export function BookingDetailsForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState("");
  const [leadId, setLeadId] = useState("");
  const [captureStatus, setCaptureStatus] = useState<"captured" | "whatsapp-only">("whatsapp-only");
  const [prefill, setPrefill] = useState({
    pickup: "Jaipur Airport",
    customPickup: "",
    car: "",
    destination: "",
  });
  const dateInput = useRef<HTMLInputElement>(null);
  const calendar = useRef<Instance | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlPickup = params.get("pickup") || "Jaipur Airport";
    const isStandard = standardPickupHubs.includes(urlPickup);

    setPrefill({
      pickup: isStandard ? urlPickup : "Other",
      customPickup: isStandard ? "" : urlPickup,
      car: params.get("car") || "",
      destination: params.get("destination") || "",
    });

    if (!dateInput.current) return;
    const picker = flatpickr(dateInput.current, {
      mode: "range",
      minDate: "today",
      dateFormat: "Y-m-d",
      altInput: true,
      altFormat: "d M Y",
      disableMobile: true,
      monthSelectorType: "static",
      showMonths: window.matchMedia("(min-width: 900px)").matches ? 2 : 1,
      nextArrow: "→",
      prevArrow: "←",
    });
    calendar.current = picker;
    const dates = params.get("dates");
    if (dates) picker.setDate(dates.split(" to "), false, "Y-m-d");
    return () => {
      picker.destroy();
      calendar.current = null;
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!dateInput.current?.value) {
      calendar.current?.open();
      return;
    }

    setSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const value = (field: string, fallback: string) => String(formData.get(field) || fallback).trim();
    const reference = `FCR-${Date.now().toString(36).toUpperCase()}`;
    const query = new URLSearchParams(window.location.search);

    const pickupChoice = value("pickupSelect", "Jaipur Airport");
    const customLoc = value("customPickup", "");
    const finalPickup = pickupChoice === "Other" ? (customLoc || "Custom location requested") : pickupChoice;

    const payload = {
      secret: process.env.NEXT_PUBLIC_LEAD_CAPTURE_SECRET || "",
      leadId: reference,
      name: value("name", "Not provided"),
      phone: value("phone", "Not provided"),
      email: value("email", "Not provided"),
      car: value("car", "Best available match"),
      dates: value("dates", "Not selected"),
      pickup: finalPickup,
      destination: value("destination", "Jaipur / not decided"),
      source: "Website booking form",
      pageUrl: window.location.href,
      utmSource: query.get("utm_source") || "direct",
      utmMedium: query.get("utm_medium") || "none",
      utmCampaign: query.get("utm_campaign") || "",
      notes: "24 hours · 300 km included",
    };
    const message = [
      "Hi Financer Car Rental, I want to book a self-drive car.",
      "",
      `Booking ID: ${reference}`,
      `Name: ${payload.name}`,
      `Mobile: ${payload.phone}`,
      `Car: ${payload.car}`,
      `Dates: ${payload.dates}`,
      `Pickup: ${payload.pickup}`,
      `Destination: ${payload.destination}`,
      "Plan: 24 hours · 300 km included",
    ].join("\n");
    const configuredNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || fallbackWhatsAppNumber;
    const link = `https://wa.me/${configuredNumber}?text=${encodeURIComponent(message)}`;

    let captured = false;
    const sheetEndpoint = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL;
    if (sheetEndpoint) {
      try {
        await fetch(sheetEndpoint, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });
        captured = true;
      } catch {
        captured = false;
      }
    }

    try {
      window.localStorage.setItem(
        `financer-lead-${reference}`,
        JSON.stringify({ ...payload, storedAt: new Date().toISOString() })
      );
    } catch {}
    setLeadId(reference);
    setCaptureStatus(captured ? "captured" : "whatsapp-only");
    setWhatsappLink(link);
    window.open(link, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted)
    return (
      <div className="booking-success">
        <span>
          <CheckIcon />
        </span>
        <small className="booking-reference">BOOKING ID · {leadId}</small>
        <h2>{captureStatus === "captured" ? "Request captured. WhatsApp is ready." : "Your WhatsApp request is ready."}</h2>
        <p>
          {captureStatus === "captured"
            ? "Your enquiry was sent to the Financer lead sheet. Please also tap Send in WhatsApp so our Jaipur team can reply quickly."
            : "Google Sheets capture is not configured yet, so WhatsApp is the delivery channel. Tap Send there so our Jaipur team receives your request."}
        </p>
        <a className="button button-primary" href={whatsappLink} target="_blank" rel="noreferrer">
          Open WhatsApp again <ArrowIcon />
        </a>
      </div>
    );

  return (
    <form className="booking-details-form" onSubmit={submit}>
      <div className="form-section">
        <span>01</span>
        <div>
          <h2>Your trip</h2>
          <p>Tell us where and when you want the keys.</p>
        </div>
      </div>
      <div className="form-grid">
        <label>
          <span>Pickup hub</span>
          <select
            name="pickupSelect"
            value={prefill.pickup}
            onChange={(e) => setPrefill({ ...prefill, pickup: e.target.value })}
          >
            {standardPickupHubs.map((hub) => (
              <option key={hub} value={hub}>
                {hub}
              </option>
            ))}
            <option value="Other">Other (Enter custom location / address)...</option>
          </select>
        </label>

        <label>
          <span>Pickup & return</span>
          <input
            ref={dateInput}
            name="dates"
            type="hidden"
            placeholder="Choose your trip dates"
            aria-label="Booking pickup and return dates"
          />
        </label>

        {prefill.pickup === "Other" && (
          <label className="span-two custom-pickup-block">
            <span>Specify pickup location or address in Jaipur</span>
            <input
              name="customPickup"
              type="text"
              placeholder="e.g. C-Scheme, Raja Park, Tonk Road, Hotel / Home address"
              value={prefill.customPickup}
              onChange={(e) => setPrefill({ ...prefill, customPickup: e.target.value })}
              required
            />
          </label>
        )}

        <label>
          <span>Preferred car</span>
          <select
            name="car"
            value={prefill.car}
            onChange={(e) => setPrefill({ ...prefill, car: e.target.value })}
          >
            <option value="">Best available match</option>
            {cars.map((car) => (
              <option key={car.slug}>{car.name}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Destination</span>
          <select
            name="destination"
            value={prefill.destination}
            onChange={(e) => setPrefill({ ...prefill, destination: e.target.value })}
          >
            <option value="">Jaipur / not decided</option>
            {destinations.map((item) => (
              <option key={item.slug}>{item.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-section">
        <span>02</span>
        <div>
          <h2>Your details</h2>
          <p>Used only to coordinate this booking request.</p>
        </div>
      </div>
      <div className="form-grid">
        <label>
          <span>Full name</span>
          <input name="name" type="text" placeholder="Your name" autoComplete="name" required />
        </label>
        <label>
          <span>Mobile number</span>
          <input
            name="phone"
            type="tel"
            placeholder="+91 98765 43210"
            autoComplete="tel"
            inputMode="tel"
            pattern="[+0-9 -]{8,18}"
            required
          />
        </label>
        <label className="span-two">
          <span>Email address</span>
          <input name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
        </label>
      </div>

      <label className="consent-row">
        <input type="checkbox" required />
        <span>
          I agree to be contacted about this request and understand that availability and price are confirmed after KYC
          review.
        </span>
      </label>
      <button className="button button-primary form-submit" type="submit" disabled={submitting}>
        {submitting ? "Saving request…" : "Request availability"} {!submitting && <ArrowIcon />}
      </button>
      <p className="form-privacy">No payment is taken. Your details are used only for booking coordination.</p>
    </form>
  );
}

