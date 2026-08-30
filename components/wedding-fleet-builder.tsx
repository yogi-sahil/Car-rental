"use client";

import Image from "next/image";
import { useState } from "react";
import { Car } from "@/lib/data";
import { ArrowIcon, CheckIcon } from "./icons";

interface WeddingFleetBuilderProps {
  cars: Car[];
  onSelectConvoy?: (convoyText: string) => void;
}

export function WeddingFleetBuilder({ cars, onSelectConvoy }: WeddingFleetBuilderProps) {
  // Map of car slug -> count
  const [quantities, setQuantities] = useState<Record<string, number>>({
    "toyota-fortuner": 2,
    "mahindra-scorpio-n": 3,
    "mahindra-thar": 1,
  });

  const updateQuantity = (slug: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[slug] || 0;
      const next = Math.max(0, Math.min(10, current + delta));
      return { ...prev, [slug]: next };
    });
  };

  const applyPreset = (preset: Record<string, number>) => {
    setQuantities(preset);
  };

  // Calculate totals
  const totalVehicles = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalSeats = Object.entries(quantities).reduce((acc, [slug, count]) => {
    const car = cars.find((c) => c.slug === slug);
    return acc + (car ? car.seats * count : 0);
  }, 0);

  const selectedList = Object.entries(quantities)
    .filter(([_, count]) => count > 0)
    .map(([slug, count]) => {
      const car = cars.find((c) => c.slug === slug);
      return { name: car?.name || slug, count, seats: (car?.seats || 5) * count };
    });

  const convoySummaryText = selectedList.length
    ? selectedList.map((item) => `${item.count}x ${item.name}`).join(" + ")
    : "Custom Multi-Car Convoy";

  const handleProceed = () => {
    if (onSelectConvoy) {
      onSelectConvoy(convoySummaryText);
    }
    const formElement = document.getElementById("wedding-consult-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="wedding-fleet-builder" id="convoy-builder">
      <div className="builder-header">
        <div>
          <span className="builder-kicker">CUSTOM MULTI-CAR CONVOY BUILDER</span>
          <h2>Mix & match your wedding fleet</h2>
          <p>
            Choose how many of each vehicle you need for your wedding events, VIP movement or guest logistics. We’ll
            tailor a single unified package with dedicated fleet coordination.
          </p>
        </div>

        <div className="builder-presets">
          <span>Quick Presets:</span>
          <button
            type="button"
            className="preset-btn"
            onClick={() =>
              applyPreset({
                "toyota-fortuner": 2,
                "mahindra-scorpio-n": 3,
                "mahindra-thar": 1,
              })
            }
          >
            Baraat Convoy (6)
          </button>
          <button
            type="button"
            className="preset-btn"
            onClick={() =>
              applyPreset({
                "toyota-fortuner": 3,
                "mahindra-scorpio-n": 4,
              })
            }
          >
            VIP Escort (7)
          </button>
          <button
            type="button"
            className="preset-btn"
            onClick={() =>
              applyPreset({
                "mahindra-scorpio-n": 3,
                "maruti-brezza": 3,
                "hyundai-creta": 2,
              })
            }
          >
            Guest Shuttle (8)
          </button>
          <button type="button" className="preset-btn reset" onClick={() => setQuantities({})}>
            Reset
          </button>
        </div>
      </div>

      <div className="builder-layout">
        {/* Car Selection Grid */}
        <div className="builder-grid">
          {cars.map((car) => {
            const count = quantities[car.slug] || 0;
            return (
              <div className={`builder-card ${count > 0 ? "active-selected" : ""}`} key={car.slug}>
                <div className="builder-card-image">
                  <Image src={car.image} alt={car.name} fill sizes="(max-width: 768px) 100vw, 300px" />
                  <span className="builder-card-badge">{car.category}</span>
                </div>
                <div className="builder-card-body">
                  <div className="builder-card-title-row">
                    <h3>{car.name}</h3>
                    <small>{car.seats} Seats · {car.fuel}</small>
                  </div>

                  <div className="builder-counter-row">
                    <span className="builder-counter-label">Quantity:</span>
                    <div className="builder-counter">
                      <button
                        type="button"
                        onClick={() => updateQuantity(car.slug, -1)}
                        disabled={count === 0}
                        aria-label={`Decrease count for ${car.name}`}
                      >
                        −
                      </button>
                      <strong>{count}</strong>
                      <button
                        type="button"
                        onClick={() => updateQuantity(car.slug, 1)}
                        disabled={count >= 10}
                        aria-label={`Increase count for ${car.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sticky Live Summary Sidebar */}
        <aside className="builder-sidebar">
          <div className="builder-summary-card">
            <span className="summary-kicker">LIVE CONVOY ESTIMATOR</span>
            <h3>Your Selected Fleet</h3>

            <div className="summary-metrics">
              <div className="summary-metric-box">
                <strong>{totalVehicles}</strong>
                <span>Total Vehicles</span>
              </div>
              <div className="summary-metric-box">
                <strong>{totalSeats}</strong>
                <span>Guest Capacity</span>
              </div>
            </div>

            <div className="summary-list">
              <strong>Fleet Breakdown:</strong>
              {selectedList.length === 0 ? (
                <p className="summary-empty">No vehicles selected yet. Click + on any car above to start building.</p>
              ) : (
                <ul>
                  {selectedList.map((item) => (
                    <li key={item.name}>
                      <span>
                        <b>{item.count}×</b> {item.name}
                      </span>
                      <small>{item.seats} seats</small>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="summary-perks">
              <div className="summary-perk-item">
                <CheckIcon /> <span>Dedicated Event Fleet Manager</span>
              </div>
              <div className="summary-perk-item">
                <CheckIcon /> <span>Palace/Hotel Direct Handover</span>
              </div>
              <div className="summary-perk-item">
                <CheckIcon /> <span>Backup Vehicle on Standby</span>
              </div>
              <div className="summary-perk-item">
                <CheckIcon /> <span>Spotless Ceramic Detailed Cars</span>
              </div>
            </div>

            <button
              type="button"
              className="button button-primary summary-action-btn"
              disabled={totalVehicles === 0}
              onClick={handleProceed}
            >
              {totalVehicles === 0 ? "Select at least 1 car" : "Request Custom Quote for this Fleet"} <ArrowIcon />
            </button>
            <p className="summary-note">
              No immediate payment required. We will review car availability and send you a custom tailored proposal.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
