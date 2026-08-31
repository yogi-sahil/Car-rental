export const siteUrl = "https://financercarrental.in";

export const businessDetails = {
  owner: "Sachin Jaat",
  phone: "+91 96021 11420",
  phoneHref: "+919602111420",
  whatsappNumber: "919602111420",
  email: "sachinjaat2111@gmail.com",
  address: "Durgapura, Jaipur, Rajasthan, India",
  serviceArea: "Jaipur, Rajasthan",
  openingHours: "Open 24 hours · 7 days a week",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Durgapura%2C%20Jaipur%2C%20Rajasthan",
  instagramUrl: "https://www.instagram.com/say_dev_vicky/",
} as const;

export type Car = {
  slug: string;
  name: string;
  category: string;
  image: string;
  price: number;
  pricePerHour: number;
  includedHours: number;
  includedKm: number;
  seats: number;
  transmission: "Manual" | "Automatic";
  fuel: "Petrol" | "Diesel" | "CNG";
  luggage: number;
  mileage: string;
  deposit: string;
  summary: string;
  bestFor: string[];
  features: string[];
};

const sharedPlan = { includedHours: 24, includedKm: 300, deposit: "Refundable security deposit" };
const sharedFeatures = ["24 hours rental", "300 km included", "FastTag equipped", "24×7 roadside support", "Sanitised before pickup"];

export const cars: Car[] = [
  { ...sharedPlan, slug: "mahindra-scorpio-n", name: "Mahindra Scorpio N", category: "Priority premium SUV", image: "/images/cars/mahindra-scorpio-n.webp", price: 5999, pricePerHour: 250, seats: 7, transmission: "Manual", fuel: "Diesel", luggage: 3, mileage: "Up to 15 km/l", summary: "A powerful, refined seven-seat SUV for family highways and standout Rajasthan drives.", bestFor: ["Priority SUV bookings", "Family road trips", "Long-distance highways"], features: ["Commanding seating", ...sharedFeatures] },
  { ...sharedPlan, slug: "mahindra-scorpio", name: "Mahindra Scorpio", category: "Priority classic SUV", image: "/images/cars/mahindra-scorpio-classic.webp", price: 5499, pricePerHour: 229, seats: 7, transmission: "Manual", fuel: "Diesel", luggage: 3, mileage: "Up to 15 km/l", summary: "The rugged seven-seat Rajasthan favourite for groups, highways and confident road presence.", bestFor: ["Group travel", "Rajasthan highways", "High-seating SUV fans"], features: ["Rugged road presence", ...sharedFeatures] },
  { ...sharedPlan, slug: "mahindra-thar", name: "Mahindra Thar", category: "Priority adventure SUV", image: "/images/cars/mahindra-thar.webp", price: 4999, pricePerHour: 208, seats: 4, transmission: "Automatic", fuel: "Diesel", luggage: 2, mileage: "Up to 15 km/l", summary: "An iconic high-seating SUV for scenic highways and memorable Rajasthan escapes.", bestFor: ["Couples and friends", "Aravalli road trips", "Sambhar and Pushkar plans"], features: ["High driving position", ...sharedFeatures] },
  { ...sharedPlan, slug: "maruti-swift", name: "Maruti Swift", category: "Priority city hatchback", image: "/images/cars/maruti-swift.webp", price: 2499, pricePerHour: 104, seats: 5, transmission: "Manual", fuel: "Petrol", luggage: 2, mileage: "Up to 22 km/l", summary: "A light, efficient hatchback for Jaipur traffic, easy parking and affordable getaways.", bestFor: ["Jaipur city use", "Solo travellers", "Budget road trips"], features: ["Easy city handling", ...sharedFeatures] },
  { ...sharedPlan, slug: "maruti-fronx", name: "Maruti Fronx", category: "Priority crossover", image: "/images/cars/maruti-fronx.webp", price: 2849, pricePerHour: 119, seats: 5, transmission: "Manual", fuel: "Petrol", luggage: 2, mileage: "Up to 21 km/l", summary: "A stylish, efficient crossover that balances city agility with weekend-road comfort.", bestFor: ["Couples", "Jaipur city drives", "Weekend escapes"], features: ["Crossover comfort", ...sharedFeatures] },
  { ...sharedPlan, slug: "maruti-brezza", name: "Maruti Brezza", category: "Priority compact SUV", image: "/images/cars/maruti-brezza.webp", price: 2799, pricePerHour: 117, seats: 5, transmission: "Manual", fuel: "Petrol", luggage: 3, mileage: "Up to 19 km/l", summary: "A practical compact SUV with comfortable space for Jaipur and nearby road trips.", bestFor: ["Small families", "City and highway mix", "Ajmer–Pushkar drives"], features: ["Useful ground clearance", ...sharedFeatures] },
  { ...sharedPlan, slug: "toyota-fortuner", name: "Toyota Fortuner", category: "Flagship premium SUV", image: "/images/cars/toyota-fortuner.webp", price: 9999, pricePerHour: 417, seats: 7, transmission: "Automatic", fuel: "Diesel", luggage: 4, mileage: "Up to 14 km/l", summary: "A flagship seven-seat SUV for premium group travel and long Rajasthan journeys.", bestFor: ["Premium family travel", "Executive road trips", "Long-distance comfort"], features: ["Premium road presence", ...sharedFeatures] },
  { ...sharedPlan, slug: "land-rover-defender", name: "Land Rover Defender", category: "Ultra luxury flagship SUV", image: "/images/cars/land-rover-defender.webp", price: 81000, pricePerHour: 3375, seats: 5, transmission: "Automatic", fuel: "Petrol", luggage: 4, mileage: "Up to 10 km/l", summary: "The ultimate luxury off-road icon. Unmatched road presence, royal comfort and commanding performance for elite Jaipur occasions.", bestFor: ["VIP & Celebrity movements", "Royal wedding entries", "Luxury Rajasthan tours"], features: ["Flagship luxury presence", "Air suspension", "Terrain Response 4x4", ...sharedFeatures] },
  { ...sharedPlan, slug: "hyundai-verna", name: "Hyundai Verna", category: "Premium sedan", image: "/images/cars/hyundai-verna.webp", price: 3499, pricePerHour: 146, seats: 5, transmission: "Automatic", fuel: "Petrol", luggage: 3, mileage: "Up to 18 km/l", summary: "A sleek premium sedan for comfortable city travel and smooth highway touring.", bestFor: ["Business travel", "Couples", "Comfortable highway drives"], features: ["Premium sedan comfort", ...sharedFeatures] },
  { ...sharedPlan, slug: "hyundai-creta", name: "Hyundai Creta", category: "Premium compact SUV", image: "/images/cars/hyundai-creta.webp", price: 3499, pricePerHour: 146, seats: 5, transmission: "Automatic", fuel: "Petrol", luggage: 3, mileage: "Up to 17 km/l", summary: "A refined automatic SUV for comfortable Jaipur drives and confident Rajasthan highways.", bestFor: ["Small families", "Jaipur–Udaipur drives", "Premium city travel"], features: ["Automatic climate control", ...sharedFeatures] },
  { ...sharedPlan, slug: "maruti-brezza-cng", name: "Maruti Brezza CNG", category: "Efficient CNG SUV", image: "/images/cars/maruti-brezza-cng.webp", price: 3249, pricePerHour: 135, seats: 5, transmission: "Manual", fuel: "CNG", luggage: 2, mileage: "Up to 25 km/kg", summary: "An economical compact SUV for longer local use with CNG efficiency and SUV comfort.", bestFor: ["Economical city travel", "Small families", "Long local bookings"], features: ["Factory CNG efficiency", ...sharedFeatures] },
  { ...sharedPlan, slug: "maruti-swift-cng", name: "Maruti Swift CNG", category: "Efficient CNG hatchback", image: "/images/cars/maruti-swift-cng.webp", price: 2999, pricePerHour: 125, seats: 5, transmission: "Manual", fuel: "CNG", luggage: 1, mileage: "Up to 30 km/kg", summary: "A city-friendly hatchback with lower running costs for practical Jaipur bookings.", bestFor: ["City commuters", "Budget-conscious renters", "Local Jaipur plans"], features: ["Factory CNG efficiency", ...sharedFeatures] },
  { ...sharedPlan, slug: "kia-sonet", name: "Kia Sonet", category: "Feature-rich compact SUV", image: "/images/cars/kia-sonet.webp", price: 2999, pricePerHour: 125, seats: 5, transmission: "Automatic", fuel: "Diesel", luggage: 3, mileage: "Up to 18 km/l", summary: "A feature-rich compact SUV for premium city comfort and relaxed highway cruising.", bestFor: ["Premium city use", "Small families", "Jaipur–Pushkar drives"], features: ["Connected cabin", ...sharedFeatures] },
  { ...sharedPlan, slug: "hyundai-venue", name: "Hyundai Venue", category: "Urban compact SUV", image: "/images/cars/hyundai-venue.webp", price: 2999, pricePerHour: 125, seats: 5, transmission: "Manual", fuel: "Petrol", luggage: 2, mileage: "Up to 18 km/l", summary: "A compact, comfortable SUV made for Jaipur streets and easy weekend highways.", bestFor: ["Urban travel", "Couples", "Short Rajasthan drives"], features: ["Compact SUV convenience", ...sharedFeatures] },
];

export type Destination = {
  slug: string;
  name: string;
  eyebrow: string;
  image: string;
  distance: string;
  driveTime: string;
  idealTrip: string;
  summary: string;
  intro: string;
  route: string;
  highlights: string[];
  tips: string[];
  recommendedCar: string;
};

export const destinations: Destination[] = [
  {
    slug: "amer-fort",
    name: "Amer Fort",
    eyebrow: "Jaipur heritage drive",
    image: "/images/locations/amer-fort.webp",
    distance: "11 km from central Jaipur",
    driveTime: "30–40 min",
    idealTrip: "Half day",
    summary: "A sunrise drive to Jaipur’s grand hill fort, with Maota Lake views and easy add-ons nearby.",
    intro: "Amer is one of Jaipur’s easiest and most rewarding self-drive outings. Start early to avoid city traffic, park in the designated visitor area, and combine the fort with Panna Meena ka Kund and Jaigarh for a relaxed heritage circuit.",
    route: "MI Road → Hawa Mahal Road → Amer Road → Amer Fort parking",
    highlights: ["Amer Fort courtyards", "Maota Lake viewpoint", "Panna Meena ka Kund", "Jaigarh Fort extension"],
    tips: ["Leave before 8 AM in peak season", "Use designated fort parking", "Keep water and sun protection", "Expect slower traffic near Amer bazaar"],
    recommendedCar: "Swift or Brezza",
  },
  {
    slug: "nahargarh-fort",
    name: "Nahargarh Fort",
    eyebrow: "Jaipur sunset drive",
    image: "/images/locations/nahargarh-fort.webp",
    distance: "20 km from central Jaipur",
    driveTime: "45–60 min",
    idealTrip: "Half day",
    summary: "A winding Aravalli drive ending with one of the best panoramic views over the Pink City.",
    intro: "Nahargarh makes a memorable self-drive plan for late afternoon. The hill road is scenic but requires calm driving around bends. Arrive well before sunset, explore Madhavendra Bhawan, and descend before it gets too late.",
    route: "Jaipur city → Amer Road → Nahargarh Fort Road",
    highlights: ["Jaipur city panorama", "Madhavendra Bhawan", "Aravalli ridge road", "Sunset viewpoint"],
    tips: ["Avoid stopping on blind curves", "Check closing time before leaving", "Drive down before heavy post-sunset traffic", "Carry a light jacket in winter"],
    recommendedCar: "Brezza or Thar",
  },
  {
    slug: "pushkar",
    name: "Pushkar",
    eyebrow: "Easy weekend escape",
    image: "/images/locations/pushkar.webp",
    distance: "145 km from Jaipur",
    driveTime: "2.5–3 hrs",
    idealTrip: "1–2 days",
    summary: "A calm lake town with ghats, cafés and desert-edge experiences—ideal for an unhurried weekend drive.",
    intro: "The Jaipur–Pushkar route is straightforward and works well for first-time Rajasthan self-drivers. Leave early, pause around Kishangarh if needed, and keep the car parked while exploring the compact lake and market area on foot.",
    route: "Jaipur → Kishangarh Expressway → Ajmer bypass → Pushkar",
    highlights: ["Pushkar Lake ghats", "Brahma Temple area", "Savitri hill views", "Desert sunset experiences"],
    tips: ["Respect no-photography areas around ghats", "Use hotel or designated parking", "Avoid driving inside narrow market lanes", "Fuel up before the return journey"],
    recommendedCar: "Swift or Fronx",
  },
  {
    slug: "ajmer",
    name: "Ajmer",
    eyebrow: "Culture & lakeside drive",
    image: "/images/locations/ajmer.webp",
    distance: "135 km from Jaipur",
    driveTime: "2.5–3 hrs",
    idealTrip: "Full day",
    summary: "A history-rich day trip combining Ana Sagar Lake, old-city landmarks and an optional Pushkar extension.",
    intro: "Ajmer is connected to Jaipur by a comfortable highway, making it a practical full-day self-drive trip. Park outside congested old-city zones and use local transport for the final stretch where traffic restrictions apply.",
    route: "Jaipur → NH48/Kishangarh Expressway → Ajmer",
    highlights: ["Ana Sagar Lake", "Daulat Bagh", "Adhai Din Ka Jhonpra area", "Pushkar add-on"],
    tips: ["Use authorised parking near busy landmarks", "Keep footwear and dress etiquette in mind", "Check local traffic diversions", "Start back before evening highway rush"],
    recommendedCar: "Verna or Creta",
  },
  {
    slug: "sambhar-lake",
    name: "Sambhar Salt Lake",
    eyebrow: "Open-sky Rajasthan",
    image: "/images/locations/sambhar-lake.webp",
    distance: "80 km from Jaipur",
    driveTime: "1.5–2 hrs",
    idealTrip: "Full day",
    summary: "Vast salt flats, pastel sunsets and a quiet road-trip mood within easy reach of Jaipur.",
    intro: "Sambhar is best for travellers who value landscape and photography over a packed sightseeing list. Stay on marked public access roads, avoid soft salt-crust areas, and plan your return before dark if you are unfamiliar with the route.",
    route: "Jaipur → Phulera Road → Sambhar Lake town",
    highlights: ["Salt-lake horizon", "Sambhar heritage train area", "Birdlife in season", "Sunset photography"],
    tips: ["Never drive onto unmarked salt flats", "Carry drinking water", "Mobile signal can vary", "Check weather before monsoon travel"],
    recommendedCar: "Brezza or Scorpio N",
  },
  {
    slug: "ranthambore",
    name: "Ranthambore",
    eyebrow: "Wild Rajasthan road trip",
    image: "/images/locations/ranthambore.webp",
    distance: "190 km from Jaipur",
    driveTime: "3.5–4.5 hrs",
    idealTrip: "2–3 days",
    summary: "A highway escape to Sawai Madhopur for fort views, forest stays and pre-booked national-park safaris.",
    intro: "A self-drive car gives you flexibility for the Jaipur–Sawai Madhopur journey and local hotel transfers. Private vehicles cannot replace authorised safari vehicles inside restricted park zones, so book official safari slots separately.",
    route: "Jaipur → Tonk Road → Lalsot → Sawai Madhopur",
    highlights: ["Ranthambore Fort", "Authorised wildlife safari", "Padam Talao viewpoints", "Sawai Madhopur stays"],
    tips: ["Pre-book safari permits", "Do not drive into restricted forest zones", "Avoid late-night rural driving", "Choose a higher-clearance car for comfort"],
    recommendedCar: "Scorpio N or Fortuner",
  },
];

export type PickupLocation = {
  slug: string;
  name: string;
  zone: string;
  image: string;
  availability: string;
  summary: string;
  intro: string;
  bestFor: string[];
  nearby: string[];
  handover: string;
};

export const pickupLocations: PickupLocation[] = [
  {
    slug: "jaipur-airport",
    name: "Jaipur Airport",
    zone: "Sanganer · Terminal 2",
    image: "/images/flash-jaipur-hero.webp",
    availability: "Pre-booked slots · 24×7 request",
    summary: "Start your Jaipur self-drive trip soon after landing with a scheduled airport-area handover.",
    intro: "Share your flight number and expected arrival time when requesting the car. The confirmed meeting point, delivery charge if any, KYC status and handover contact are sent before arrival.",
    bestFor: ["Fly-in travellers", "Rajasthan road trips", "Late arrival requests"],
    nearby: ["Sanganer", "Jagatpura", "Tonk Road", "Malviya Nagar"],
    handover: "Airport-area meeting point confirmed after flight and KYC verification.",
  },
  {
    slug: "jaipur-railway-station",
    name: "Jaipur Railway Station",
    zone: "Gopalbari · Station Road",
    image: "/images/locations/amer-fort.webp",
    availability: "Daily scheduled handovers",
    summary: "Collect a self-drive car near Jaipur Junction and continue to your hotel or highway route.",
    intro: "Station traffic and platform exits can change, so the exact nearby handover point is coordinated on call. Keep your arrival train details available and allow time for the vehicle inspection.",
    bestFor: ["Rail travellers", "Central Jaipur stays", "Same-day onward drives"],
    nearby: ["Gopalbari", "MI Road", "Sindhi Camp", "Civil Lines"],
    handover: "A low-congestion meeting point near the station is shared before arrival.",
  },
  {
    slug: "vaishali-nagar",
    name: "Vaishali Nagar",
    zone: "West Jaipur",
    image: "/images/locations/nahargarh-fort.webp",
    availability: "Daily · advance slot recommended",
    summary: "A convenient west-Jaipur pickup area for local plans and Ajmer–Pushkar highway departures.",
    intro: "Vaishali Nagar works well for guests staying in west Jaipur. Ask for the nearest supported hub or doorstep delivery, then confirm the address and any applicable delivery fee.",
    bestFor: ["West Jaipur residents", "Ajmer–Pushkar drives", "Doorstep delivery requests"],
    nearby: ["Chitrakoot", "Shyam Nagar", "Sodala", "Ajmer Road"],
    handover: "Hub pickup or supported-address delivery is confirmed with the final quote.",
  },
  {
    slug: "mansarovar",
    name: "Mansarovar",
    zone: "South-west Jaipur",
    image: "/images/locations/sambhar-lake.webp",
    availability: "Daily scheduled slots",
    summary: "Pick up in Mansarovar for city use, family plans and fast access towards Ajmer Road.",
    intro: "Choose Mansarovar when your stay is in south-west Jaipur. The team coordinates a practical meeting point with enough space for document checks and a calm vehicle walk-around.",
    bestFor: ["Family bookings", "Local Jaipur use", "Ajmer Road departures"],
    nearby: ["New Sanganer Road", "Durgapura", "Sodala", "Patrakar Colony"],
    handover: "The exact sector and meeting point are confirmed before the booking starts.",
  },
  {
    slug: "jagatpura",
    name: "Jagatpura",
    zone: "South-east Jaipur",
    image: "/images/locations/pushkar.webp",
    availability: "Daily · airport-side requests",
    summary: "A practical pickup zone for Jagatpura, Malviya Nagar and Jaipur Airport-side travellers.",
    intro: "Jagatpura is useful for south-east Jaipur stays and early airport-side plans. Share your address so the closest supported handover option can be matched to the selected car.",
    bestFor: ["Airport-side stays", "Students and professionals", "Tonk Road access"],
    nearby: ["Malviya Nagar", "Sanganer", "Pratap Nagar", "Jaipur Airport"],
    handover: "Hub or delivery availability depends on the address, time and selected vehicle.",
  },
  {
    slug: "sindhi-camp",
    name: "Sindhi Camp",
    zone: "Central Jaipur · Bus stand",
    image: "/images/locations/ajmer.webp",
    availability: "Daily scheduled handovers",
    summary: "Collect near Jaipur’s central bus terminal for convenient access to the old city and major roads.",
    intro: "Because Sindhi Camp can be busy, the handover is arranged at a nearby accessible point rather than an unsafe roadside stop. Allow time to inspect the vehicle before entering city traffic.",
    bestFor: ["Bus travellers", "Central Jaipur hotels", "Old-city sightseeing"],
    nearby: ["Bani Park", "MI Road", "Jaipur Junction", "Chandpole"],
    handover: "A nearby accessible meeting point is shared after arrival details are confirmed.",
  },
];


export const faqs = [
  ["What does the 24-hour car package include?", "Every listed car price covers a 24-hour self-drive rental with 300 km included. Fuel, tolls, parking, refundable deposit and extra kilometres are separate unless the confirmed quotation says otherwise."],
  ["What do I need to rent a self-drive car in Jaipur?", "A valid driving licence, government ID, address proof and a matching payment method are typically required. Final KYC requirements are shared before confirmation."],
  ["Is fuel included in the rental price?", "No. Cars are generally provided on a same-to-same fuel basis, so you return the vehicle with the same fuel level recorded at pickup."],
  ["Do you take a security deposit?", "A refundable security deposit may apply depending on the car, trip duration and verification profile. The exact amount and refund timeline are shown before confirmation."],
  ["Can I take the car outside Jaipur?", "Yes, intercity Rajasthan trips are supported on approved routes. Share your itinerary so state rules, kilometre plans and any restrictions can be confirmed."],
  ["Is there a kilometre limit?", "Yes. Every listed 24-hour package includes 300 km. The extra-kilometre rate is disclosed with the final quote before you confirm."],
  ["What happens if I need help during the trip?", "Financer provides a 24×7 support number for breakdown coordination, tyre or battery help, and trip assistance."],
] as const;

export type WeddingCombo = {
  id: string;
  name: string;
  eyebrow: string;
  image: string;
  tag: string;
  summary: string;
  recommendedFor: string;
  fleetComposition: string[];
  totalVehicles: string;
  seatingCapacity: string;
  highlights: string[];
};

export const weddingCombos: WeddingCombo[] = [
  {
    id: "royal-baraat-convoy",
    name: "The Royal Groom & Baraat Convoy",
    eyebrow: "ICONIC ROYAL ENTOURAGE",
    image: "/images/wedding-baraat-convoy.webp",
    tag: "Most Popular for Weddings",
    summary: "A commanding multi-SUV convoy tailored for grand Baraat entries, groom escorts, and palace driveway arrivals in Jaipur.",
    recommendedFor: "Groom Baraat, Royal Palace Entry, Family VIPs",
    fleetComposition: [
      "2x Toyota Fortuner (Lead & Groom Car)",
      "3x Mahindra Scorpio N (Family Escort)",
      "1x Mahindra Thar (Open-Air Youth Escort)",
    ],
    totalVehicles: "6 Vehicles",
    seatingCapacity: "35+ Guests",
    highlights: ["Symmetrical black/white fleet", "Ceramic polished", "Dedicated Fleet Coordinator", "On-time palace arrival"],
  },
  {
    id: "grand-vip-entourage",
    name: "Grand VIP & Celebrity Entourage",
    eyebrow: "HIGH-STANCE ESCORT",
    image: "/images/wedding-baraat-convoy-2.webp",
    tag: "High Stance & Presence",
    summary: "An imposing, coordinated SUV lineup engineered for high-profile guests, artists, and VIP family movement across Jaipur.",
    recommendedFor: "Celebrities, Corporate Delegations, VIP Guest Relatives",
    fleetComposition: [
      "1x Land Rover Defender (Head Flagship SUV)",
      "2x Toyota Fortuner (Executive Escort)",
      "4x Mahindra Scorpio N (High Stance Entourage)",
    ],
    totalVehicles: "7 Vehicles",
    seatingCapacity: "42+ Guests",
    highlights: ["Defender flagship lead", "Uniform high-stance SUVs", "24×7 backup vehicle on standby", "Airport to Palace direct transit"],

  },
  {
    id: "palace-guest-family-shuttle",
    name: "Palace Guest & Family Shuttle Fleet",
    eyebrow: "SEAMLESS HOSPITALITY",
    image: "/images/wedding-guest-escort.webp",
    tag: "Maximum Comfort & Space",
    summary: "Balanced mix of comfortable 7-seaters and agile city SUVs to transport wedding guests between airports, hotels, and event venues.",
    recommendedFor: "Outstation Guests, Sangeet & Mehendi Transits, Multi-Venue Logistics",
    fleetComposition: [
      "3x Mahindra Scorpio N (7-Seater Group)",
      "3x Maruti Brezza / Fronx (City Agility)",
      "2x Hyundai Creta / Verna (Executive Comfort)",
    ],
    totalVehicles: "8 Vehicles",
    seatingCapacity: "40+ Guests",
    highlights: ["Spacious luggage accommodation", "Flexible multi-day packages", "Doorstep hotel/resort delivery", "Zero coordination headaches"],
  },
];

export function getCar(slug: string) {
  return cars.find((car) => car.slug === slug);
}

export function getDestination(slug: string) {
  return destinations.find((destination) => destination.slug === slug);
}

export function getPickupLocation(slug: string) {
  return pickupLocations.find((location) => location.slug === slug);
}

