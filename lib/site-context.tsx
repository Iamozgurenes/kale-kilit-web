"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  defaultSiteSettings,
  type CmsBrand,
  type SiteSettings,
} from "@/lib/cms/types";
import type { Service } from "@/lib/types/content";

type SiteContextValue = {
  site: SiteSettings;
  brands: CmsBrand[];
  services: Service[];
};

const SiteContext = createContext<SiteContextValue>({
  site: defaultSiteSettings(),
  brands: [],
  services: [],
});

export function SiteProvider({
  site,
  brands,
  services,
  children,
}: {
  site: SiteSettings;
  brands: CmsBrand[];
  services: Service[];
  children: ReactNode;
}) {
  return (
    <SiteContext.Provider value={{ site, brands, services }}>{children}</SiteContext.Provider>
  );
}

export function useSite() {
  return useContext(SiteContext).site;
}

export function useBrands() {
  return useContext(SiteContext).brands;
}

export function useServices() {
  return useContext(SiteContext).services;
}
