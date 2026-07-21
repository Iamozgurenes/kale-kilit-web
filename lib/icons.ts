import {
  BadgeCheck,
  Car,
  Clock3,
  Home,
  KeyRound,
  Lock,
  Shield,
  ShieldCheck,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Home,
  Car,
  Lock,
  KeyRound,
  ShieldCheck,
  Shield,
  Wrench,
  Smartphone,
  Clock3,
  BadgeCheck,
};

export function getServiceIcon(name?: string | null): LucideIcon {
  if (!name) return Wrench;
  return ICON_MAP[name] ?? Wrench;
}
