"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import flatpickr from "flatpickr";
import type { Instance } from "flatpickr/dist/types/instance";
import { ArrowIcon, CalendarIcon, MapIcon } from "./icons";

export function BookingForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const dateInput = useRef<HTMLInputElement>(null);
  const calendar = useRef<Instance | null>(null);

  useEffect(() => {
    if (!dateInput.current) return;
    const picker = flatpickr(dateInput.current, {
      mode: "range",
      minDate: "today",
      dateFormat: "Y-m-d",
      altInput: true,
      altFormat: "d M Y",
      allowInput: false,
      disableMobile: true,
      monthSelectorType: "static",
      showMonths: window.matchMedia("(min-width: 900px)").matches ? 2 : 1,
      nextArrow: "→",
      prevArrow: "←",
    });
    calendar.current = picker;
    return () => { picker.destroy(); calendar.current = null; };
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const dates = String(form.get("dates") || "");
    if (!dates) {
      setMessage("Select your pickup and return dates to continue.");
      calendar.current?.open();
      return;
    }
    const params = new URLSearchParams({ pickup: String(form.get("pickup")), dates, car: String(form.get("carType")) });
    router.push(`/booking?${params.toString()}`);
  }

  return (
    <form className="search-card" onSubmit={submit}>
      <div className="search-card-heading"><span>Find your drive</span><small>Live request · confirmation by our Jaipur team</small></div>
      <label className="search-field"><span><MapIcon /> Pickup hub</span><select name="pickup" defaultValue="Jaipur Airport"><option>Jaipur Airport</option><option>Jaipur Railway Station</option><option>Vaishali Nagar</option><option>Mansarovar</option><option>Jagatpura</option><option>Sindhi Camp</option></select></label>
      <label className="search-field"><span><CalendarIcon /> Trip dates</span><input ref={dateInput} name="dates" type="hidden" placeholder="Pickup → Return" aria-label="Pickup and return dates" /></label>
      <label className="search-field"><span>Car preference</span><select name="carType" defaultValue="SUV"><option>Hatchback</option><option>Sedan</option><option>SUV</option><option>7-seater</option></select></label>
      <button className="button button-primary search-submit" type="submit">Show available cars <ArrowIcon /></button>
      {message && <p className="form-message" role="status">{message}</p>}
    </form>
  );
}
