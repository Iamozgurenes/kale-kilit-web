import {
  BadgeCheck,
  BookOpen,
  Building2,
  Car,
  CheckCircle2,
  Clock3,
  DoorOpen,
  HeartHandshake,
  Home,
  KeyRound,
  Lightbulb,
  Lock,
  MapPin,
  MapPinned,
  PhoneCall,
  Shield,
  ShieldCheck,
  Smartphone,
  Target,
  Wallet,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
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
  Zap,
  Wallet,
  PhoneCall,
  MapPin,
  MapPinned,
  CheckCircle2,
  Target,
  HeartHandshake,
  BookOpen,
  Lightbulb,
  Building2,
  DoorOpen,
};

export { Wrench as DefaultServiceIcon };

export function getIcon(name?: string | null): LucideIcon {
  if (!name) return Wrench;
  return ICON_MAP[name] ?? Wrench;
}

export function getServiceIcon(name?: string | null): LucideIcon {
  return getIcon(name);
}

export const ICON_OPTIONS = Object.keys(ICON_MAP);
