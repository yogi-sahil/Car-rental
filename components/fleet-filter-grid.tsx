"use client";

import { useMemo, useState } from "react";
import type { Car } from "@/lib/data";
import { CarCard } from "./car-card";
import { FilterIcon, ResetIcon, SearchIcon, XIcon } from "./icons";

interface FleetFilterGridProps {
  cars: Car[];
}

type BodyCategory = "all" | "suv" | "sedan" | "hatchback" | "crossover";
type TransmissionFilter = "all" | "Automatic" | "Manual";
type FuelFilter = "all" | "Petrol" | "Diesel" | "CNG";
type SeatsFilter = "all" | 4 | 5 | 7;
type PriceRangeFilter = "all" | "under-3000" | "3000-5000" | "above-5000";
type SortOption = "featured" | "price-asc" | "price-desc" | "seats-desc" | "name-asc";

function getBodyCategory(car: Car): BodyCategory {
  const text = `${car.category} ${car.name}`.toLowerCase();
  if (text.includes("sedan")) return "sedan";
  if (text.includes("hatchback")) return "hatchback";
  if (text.includes("crossover")) return "crossover";
  if (text.includes("suv") || text.includes("thar")) return "suv";
  return "suv";
}

export function FleetFilterGrid({ cars }: FleetFilterGridProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<BodyCategory>("all");
  const [transmission, setTransmission] = useState<TransmissionFilter>("all");
  const [fuel, setFuel] = useState<FuelFilter>("all");
  const [seats, setSeats] = useState<SeatsFilter>("all");
  const [priceRange, setPriceRange] = useState<PriceRangeFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  // Calculate counts for categories
  const categoryCounts = useMemo(() => {
    const counts: Record<BodyCategory, number> = {
      all: cars.length,
      suv: 0,
      sedan: 0,
      hatchback: 0,
      crossover: 0,
    };
    cars.forEach((c) => {
      const cat = getBodyCategory(c);
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [cars]);

  // Filter cars based on current state
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      // 1. Search Query
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchesName = car.name.toLowerCase().includes(q);
        const matchesCat = car.category.toLowerCase().includes(q);
        const matchesFuel = car.fuel.toLowerCase().includes(q);
        const matchesTrans = car.transmission.toLowerCase().includes(q);
        const matchesSummary = car.summary.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesFuel && !matchesTrans && !matchesSummary) {
          return false;
        }
      }

      // 2. Category
      if (category !== "all") {
        if (getBodyCategory(car) !== category) return false;
      }

      // 3. Transmission
      if (transmission !== "all" && car.transmission !== transmission) {
        return false;
      }

      // 4. Fuel
      if (fuel !== "all" && car.fuel !== fuel) {
        return false;
      }

      // 5. Seats
      if (seats !== "all" && car.seats !== seats) {
        return false;
      }

      // 6. Price Range
      if (priceRange === "under-3000" && car.price >= 3000) return false;
      if (priceRange === "3000-5000" && (car.price < 3000 || car.price > 5000)) return false;
      if (priceRange === "above-5000" && car.price <= 5000) return false;

      return true;
    });
  }, [cars, search, category, transmission, fuel, seats, priceRange]);

  // Sort filtered cars
  const sortedCars = useMemo(() => {
    const list = [...filteredCars];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "seats-desc":
        return list.sort((a, b) => b.seats - a.seats);
      case "name-asc":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case "featured":
      default:
        return list;
    }
  }, [filteredCars, sortBy]);

  // Check if any filter is active
  const hasActiveFilters =
    search !== "" ||
    category !== "all" ||
    transmission !== "all" ||
    fuel !== "all" ||
    seats !== "all" ||
    priceRange !== "all" ||
    sortBy !== "featured";

  const resetAllFilters = () => {
    setSearch("");
    setCategory("all");
    setTransmission("all");
    setFuel("all");
    setSeats("all");
    setPriceRange("all");
    setSortBy("featured");
  };

  const categories: { id: BodyCategory; label: string }[] = [
    { id: "all", label: "All Fleet" },
    { id: "suv", label: "SUVs & 4x4" },
    { id: "sedan", label: "Sedans" },
    { id: "hatchback", label: "Hatchbacks" },
    { id: "crossover", label: "Crossovers" },
  ];

  return (
    <div className="fleet-filter-system">
      {/* 1. Top Controls Bar: Search & Category Pills */}
      <div className="filter-controls-shell">
        <div className="filter-search-row">
          <div className="filter-search-box">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search car (e.g. Scorpio, Thar, Swift, Automatic, CNG)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search vehicles"
            />
            {search && (
              <button
                type="button"
                className="filter-search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <XIcon />
              </button>
            )}
          </div>

          <div className="filter-sort-box">
            <label htmlFor="fleet-sort-select">Sort by:</label>
            <div className="select-wrapper">
              <select
                id="fleet-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="featured">Featured / Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="seats-desc">Seats: 7 to 4</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills Navigation */}
        <div className="filter-category-tabs" role="tablist" aria-label="Car body type filter">
          {categories.map((cat) => {
            const count = categoryCounts[cat.id] || 0;
            const isActive = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`category-pill ${isActive ? "active" : ""}`}
                onClick={() => setCategory(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="count-badge">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Dropdowns Bar */}
        <div className="filter-dropdowns-bar">
          <div className="filter-select-group">
            <label htmlFor="transmission-filter">Transmission</label>
            <select
              id="transmission-filter"
              value={transmission}
              onChange={(e) => setTransmission(e.target.value as TransmissionFilter)}
            >
              <option value="all">All Transmissions</option>
              <option value="Automatic">Automatic ({cars.filter((c) => c.transmission === "Automatic").length})</option>
              <option value="Manual">Manual ({cars.filter((c) => c.transmission === "Manual").length})</option>
            </select>
          </div>

          <div className="filter-select-group">
            <label htmlFor="fuel-filter">Fuel Type</label>
            <select
              id="fuel-filter"
              value={fuel}
              onChange={(e) => setFuel(e.target.value as FuelFilter)}
            >
              <option value="all">All Fuel Types</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="CNG">CNG</option>
            </select>
          </div>

          <div className="filter-select-group">
            <label htmlFor="seats-filter">Seating</label>
            <select
              id="seats-filter"
              value={seats}
              onChange={(e) => setSeats(e.target.value === "all" ? "all" : (Number(e.target.value) as SeatsFilter))}
            >
              <option value="all">All Seating (4, 5, 7)</option>
              <option value="4">4-Seater (Thar)</option>
              <option value="5">5-Seater (Compact/Sedan)</option>
              <option value="7">7-Seater (Scorpio/Fortuner)</option>
            </select>
          </div>

          <div className="filter-select-group">
            <label htmlFor="price-filter">Budget (24h/300km)</label>
            <select
              id="price-filter"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value as PriceRangeFilter)}
            >
              <option value="all">All Price Ranges</option>
              <option value="under-3000">Under ₹3,000/day</option>
              <option value="3000-5000">₹3,000 – ₹5,000/day</option>
              <option value="above-5000">₹5,000+ (Premium/7-Seater)</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="filter-reset-button"
              onClick={resetAllFilters}
              title="Reset all filters"
            >
              <ResetIcon />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Active Filter Chips Row */}
        {hasActiveFilters && (
          <div className="active-chips-row">
            <span className="active-chips-label">Active filters:</span>
            {search && (
              <button
                type="button"
                className="filter-chip"
                onClick={() => setSearch("")}
              >
                Search: &ldquo;{search}&rdquo; <XIcon />
              </button>
            )}
            {category !== "all" && (
              <button
                type="button"
                className="filter-chip"
                onClick={() => setCategory("all")}
              >
                Category: {categories.find((c) => c.id === category)?.label} <XIcon />
              </button>
            )}
            {transmission !== "all" && (
              <button
                type="button"
                className="filter-chip"
                onClick={() => setTransmission("all")}
              >
                {transmission} <XIcon />
              </button>
            )}
            {fuel !== "all" && (
              <button
                type="button"
                className="filter-chip"
                onClick={() => setFuel("all")}
              >
                Fuel: {fuel} <XIcon />
              </button>
            )}
            {seats !== "all" && (
              <button
                type="button"
                className="filter-chip"
                onClick={() => setSeats("all")}
              >
                {seats} Seats <XIcon />
              </button>
            )}
            {priceRange !== "all" && (
              <button
                type="button"
                className="filter-chip"
                onClick={() => setPriceRange("all")}
              >
                Price: {priceRange === "under-3000" ? "< ₹3,000" : priceRange === "3000-5000" ? "₹3k – ₹5k" : "> ₹5,000"} <XIcon />
              </button>
            )}
            {sortBy !== "featured" && (
              <button
                type="button"
                className="filter-chip"
                onClick={() => setSortBy("featured")}
              >
                Sorted <XIcon />
              </button>
            )}
            <button
              type="button"
              className="filter-clear-all-text"
              onClick={resetAllFilters}
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* 2. Results Header / Counter */}
      <div className="fleet-results-bar">
        <div className="fleet-results-count">
          <strong>{sortedCars.length}</strong> {sortedCars.length === 1 ? "car available" : "cars available"}
          {sortedCars.length < cars.length && (
            <span> (filtered from {cars.length} total)</span>
          )}
        </div>
        <div className="fleet-results-badge">
          <span>✓ 24h & 300 km included on every car</span>
        </div>
      </div>

      {/* 3. Fleet Grid or Empty State */}
      {sortedCars.length > 0 ? (
        <div className="fleet-grid">
          {sortedCars.map((car, index) => (
            <CarCard car={car} eager={index === 0} key={car.slug} />
          ))}
        </div>
      ) : (
        <div className="fleet-empty-state">
          <div className="empty-state-icon">
            <FilterIcon />
          </div>
          <h3>No cars match your selected filters</h3>
          <p>
            We couldn&apos;t find any self-drive car matching your exact search and filter criteria. Try broadening your selection or resetting filters.
          </p>
          <button
            type="button"
            className="button button-primary"
            onClick={resetAllFilters}
          >
            <ResetIcon /> Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
