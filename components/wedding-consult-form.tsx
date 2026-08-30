"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import flatpickr from "flatpickr";
import type { Instance } from "flatpickr/dist/types/instance";
import { businessDetails } from "@/lib/data";
import { ArrowIcon, CheckIcon } from "./icons";

const fallbackWhatsAppNumber = businessDetails.whatsappNumber;

const jaipurVenues = [
  "Fairmont Jaipur (Kukas)",
  "Rambagh Palace (Bhawani Singh Rd)",
  "The Leela Palace Jaipur (Delhi Hwy)",
  "Jai Mahal Palace (Civil Lines)",
  "Samode Palace & Haveli",
  "Chomu Palace Hotel",
  "JW Marriott Jaipur Resort & Spa",
  "Shiv Vilas Resort (Delhi Hwy)",
  "ITC Rajputana Jaipur",
  "Indana Palace / Zee Jaipur",
  "Other Palace / Resort / Private Venue in Jaipur",
];

interface WeddingConsultFormProps {
  initialConvoy?: string;
}

export function WeddingConsultForm({ initialConvoy = "" }: WeddingConsultFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState("");
  const [consultationId, setConsultationId] = useState("");
  const [captureStatus, setCaptureStatus] = useState<"captured" | "whatsapp-only">("whatsapp-only");

  const [eventType, setEventType] = useState("Wedding / Baraat Convoy");
  const [venue, setVenue] = useState(jaipurVenues[0]);
  const [customVenue, setCustomVenue] = useState("");
  const [fleetSize, setFleetSize] = useState("5–8 Luxury Cars");
  const [convoyDetails, setConvoyDetails] = useState(
    initialConvoy || "2x Toyota Fortuner + 3x Mahindra Scorpio N + 1x Mahindra Thar"
  );
  const [drivingPreference, setDrivingPreference] = useState("Self-Drive Fleet");

  const dateInput = useRef<HTMLInputElement>(null);
  const calendar = useRef<Instance | null>(null);

  // Sync if initialConvoy changes from builder
  useEffect(() => {
    if (initialConvoy) {
      setConvoyDetails(initialConvoy);
    }
  }, [initialConvoy]);

  useEffect(() => {
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
    const reference = `WED-${Date.now().toString(36).toUpperCase()}`;

    const finalVenue =
      venue.includes("Other") && customVenue.trim() ? `${customVenue} (Custom Venue)` : venue;

    const payload = {
      secret: process.env.NEXT_PUBLIC_LEAD_CAPTURE_SECRET || "",
      leadId: reference,
      eventType,
      name: value("name", "Not provided"),
      phone: value("phone", "Not provided"),
      email: value("email", "Not provided"),
      venue: finalVenue,
      fleetSize,
      convoyDetails,
      dates: value("dates", "Not selected"),
      drivingPreference,
      additionalNotes: value("notes", "None"),
      source: "Wedding & Bulk Fleet Consultation Page",
      pageUrl: window.location.href,
    };

    const message = [
      "👑 *WEDDING & BULK FLEET CONSULTATION INQUIRY*",
      `*Inquiry ID:* ${reference}`,
      "----------------------------------",
      `👤 *Client Name:* ${payload.name}`,
      `📞 *Mobile:* ${payload.phone}`,
      `✉️ *Email:* ${payload.email}`,
      `🎉 *Event Type:* ${payload.eventType}`,
      `🏰 *Palace / Venue:* ${payload.venue}`,
      `📅 *Event Dates:* ${payload.dates}`,
      `🚗 *Convoy Requested:* ${payload.convoyDetails}`,
      `🔢 *Total Fleet Size:* ${payload.fleetSize}`,
      `🔑 *Drive Preference:* ${payload.drivingPreference}`,
      payload.additionalNotes !== "None" ? `📝 *Special Notes:* ${payload.additionalNotes}` : "",
      "----------------------------------",
      "Please share a customized proposal and vehicle availability for this wedding event in Jaipur.",
    ]
      .filter(Boolean)
      .join("\n");

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
        `financer-wedding-${reference}`,
        JSON.stringify({ ...payload, storedAt: new Date().toISOString() })
      );
    } catch {}

    setConsultationId(reference);
    setCaptureStatus(captured ? "captured" : "whatsapp-only");
    setWhatsappLink(link);
    window.open(link, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="wedding-consult-success">
        <span className="success-icon">
          <CheckIcon />
        </span>
        <small className="booking-reference">CONSULTATION ID · {consultationId}</small>
        <h2>Your Wedding Fleet Request is Ready!</h2>
        <p>
          {captureStatus === "captured"
            ? "Your request has been logged in our VIP Event Sheet. Please tap the WhatsApp button below so our dedicated Fleet Coordinator can discuss tailored package rates and palace delivery timings."
            : "WhatsApp is ready with your multi-car fleet details. Tap Send so our Jaipur team can review your event dates and prepare a custom proposal."}
        </p>
        <div className="success-actions">
          <a className="button button-primary" href={whatsappLink} target="_blank" rel="noreferrer">
            Open WhatsApp Consultation <ArrowIcon />
          </a>
          <button
            type="button"
            className="button button-light"
            onClick={() => {
              setSubmitted(false);
            }}
          >
            Edit / Submit another inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wedding-consult-wrapper" id="wedding-consult-section">
      <div className="wedding-consult-card">
        <div className="consult-head">
          <span className="consult-kicker">PERSONALIZED CONCIERGE PROPOSAL</span>
          <h2>Request a tailored wedding fleet consultation</h2>
          <p>
            Tell us about your event schedule, palace venue and vehicle mix. Our Fleet Manager will respond with custom
            multi-car package terms and availability.
          </p>
        </div>

        <form className="wedding-form" onSubmit={submit}>
          <div className="form-group-grid">
            <label>
              <span>Event / Occasion Type</span>
              <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
                <option value="Wedding / Baraat Convoy">Wedding / Baraat Convoy</option>
                <option value="Grand VIP & Celebrity Escort">Grand VIP & Celebrity Escort</option>
                <option value="Palace Guest & Family Shuttle">Palace Guest & Family Shuttle</option>
                <option value="Destination Palace Wedding (Multi-Day)">Destination Palace Wedding (Multi-Day)</option>
                <option value="Corporate Executive Delegation">Corporate Executive Delegation</option>
                <option value="Pre-Wedding Shoot & Film Production">Pre-Wedding Shoot & Film Production</option>
                <option value="Other High-Profile Event">Other High-Profile Event</option>
              </select>
            </label>

            <label>
              <span>Palace / Event Venue</span>
              <select value={venue} onChange={(e) => setVenue(e.target.value)}>
                {jaipurVenues.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>

            {venue.includes("Other") && (
              <label className="span-two custom-venue-field">
                <span>Enter Venue / Hotel Name & Area in Jaipur</span>
                <input
                  type="text"
                  placeholder="e.g. Alila Fort Bishangarh, Mundota Fort, Resort name..."
                  value={customVenue}
                  onChange={(e) => setCustomVenue(e.target.value)}
                  required
                />
              </label>
            )}

            <label>
              <span>Event Dates (Pickup → Return)</span>
              <input
                ref={dateInput}
                name="dates"
                type="hidden"
                placeholder="Choose event dates"
                aria-label="Event dates"
              />
            </label>

            <label>
              <span>Total Fleet Size</span>
              <select value={fleetSize} onChange={(e) => setFleetSize(e.target.value)}>
                <option value="2–4 Luxury Cars">2–4 Luxury Cars (Small Escort)</option>
                <option value="5–8 Luxury Cars">5–8 Luxury Cars (Grand Convoy)</option>
                <option value="9–15 Luxury Cars">9–15 Luxury Cars (Full Guest Fleet)</option>
                <option value="15+ Luxury Vehicles">15+ Luxury Vehicles (Mega Event)</option>
              </select>
            </label>

            <label className="span-two">
              <span>Selected Convoy / Preferred Vehicles</span>
              <input
                type="text"
                name="convoyDetails"
                value={convoyDetails}
                onChange={(e) => setConvoyDetails(e.target.value)}
                placeholder="e.g. 2x Fortuner + 3x Scorpio N + 1x Thar"
                required
              />
            </label>

            <label>
              <span>Drive Coordination</span>
              <select value={drivingPreference} onChange={(e) => setDrivingPreference(e.target.value)}>
                <option value="Self-Drive Fleet (Keys handed to your family/guests)">
                  Self-Drive Fleet (Keys handed to your family/guests)
                </option>
                <option value="Chauffeur / Driver Coordination Assistance">
                  Chauffeur / Driver Coordination Assistance
                </option>
                <option value="Mixed (Lead car self-drive, family cars chauffeur)">
                  Mixed (Lead car self-drive, family cars chauffeur)
                </option>
              </select>
            </label>

            <label>
              <span>Full Name</span>
              <input name="name" type="text" placeholder="Groom / Planner / Coordinator Name" required />
            </label>

            <label>
              <span>WhatsApp Mobile Number</span>
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

            <label>
              <span>Email Address</span>
              <input name="email" type="email" placeholder="you@example.com" required />
            </label>

            <label className="span-two">
              <span>Special Event Requirements (Optional)</span>
              <textarea
                name="notes"
                rows={3}
                placeholder="e.g., Specific car colours, minimal silk ribbon decoration, midnight airport pickups, standby car requirements..."
              ></textarea>
            </label>
          </div>

          <div className="consult-form-footer">
            <button className="button button-primary submit-consult-btn" type="submit" disabled={submitting}>
              {submitting ? "Preparing proposal…" : "Get Tailored Fleet Proposal"} {!submitting && <ArrowIcon />}
            </button>
            <p className="consult-privacy-note">
              No static pricing or advance payment taken online. Our Fleet Manager directly coordinates custom discounts
              and palace delivery schedules.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
