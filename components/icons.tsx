import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const PhoneIcon = (p: IconProps) => <svg {...base} {...p}><path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.9Z" /></svg>;
export const ArrowIcon = (p: IconProps) => <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const MapIcon = (p: IconProps) => <svg {...base} {...p}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
export const CalendarIcon = (p: IconProps) => <svg {...base} {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>;
export const UsersIcon = (p: IconProps) => <svg {...base} {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
export const ShieldIcon = (p: IconProps) => <svg {...base} {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg>;
export const StarIcon = (p: IconProps) => <svg {...base} {...p} fill="currentColor" stroke="none"><path d="m12 2.2 3 6.1 6.7 1-4.8 4.7 1.1 6.7-6-3.2-6 3.2 1.1-6.7-4.8-4.7 6.7-1 3-6.1Z" /></svg>;
export const CheckIcon = (p: IconProps) => <svg {...base} {...p}><path d="m5 12 4 4L19 6" /></svg>;
export const MenuIcon = (p: IconProps) => <svg {...base} {...p}><path d="M4 6h16M4 12h16M4 18h16" /></svg>;
export const XIcon = (p: IconProps) => <svg {...base} {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>;
export const WhatsAppIcon = (p: IconProps) => <svg {...base} {...p}><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.5 9.5 0 0 1-3.8-.9L3 21l1.8-5a9 9 0 1 1 16.2-4.5Z" /><path d="M8.4 8.1c.2-.4.4-.4.7-.4h.5l.8 2c.1.3 0 .5-.1.7l-.6.7c-.2.2-.1.4 0 .6.5.9 1.3 1.6 2.2 2.1.3.2.5.2.7-.1l.8-1c.2-.2.4-.3.7-.2l2 .9c.3.1.4.3.4.5 0 .8-.4 1.5-1 2-.5.4-1.2.7-2.1.5-1.1-.2-2.6-.8-4.2-2.2-1.9-1.7-3.2-3.9-3.3-5.2-.1-.6.1-1 .5-1.4Z" /></svg>;
export const SearchIcon = (p: IconProps) => <svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
export const CarIcon = (p: IconProps) => <svg {...base} {...p}><path d="m5 17-1 2v2M19 17l1 2v2M3 12l2-6h14l2 6" /><path d="M5 12h14a2 2 0 0 1 2 2v3H3v-3a2 2 0 0 1 2-2Z" /><circle cx="7" cy="15" r="1" fill="currentColor" stroke="none" /><circle cx="17" cy="15" r="1" fill="currentColor" stroke="none" /></svg>;
export const ClockIcon = (p: IconProps) => <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
export const ChevronIcon = (p: IconProps) => <svg {...base} {...p}><path d="m9 18 6-6-6-6" /></svg>;
export const FilterIcon = (p: IconProps) => <svg {...base} {...p}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>;
export const ResetIcon = (p: IconProps) => <svg {...base} {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>;
