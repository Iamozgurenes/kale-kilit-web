"use client";

import PocketBase from "pocketbase";

const URL =
  process.env.NEXT_PUBLIC_POCKETBASE_URL ?? "https://db.kalekilitadana.com";

let client: PocketBase | null = null;

export function getAdminPb() {
  if (!client) {
    client = new PocketBase(URL);
    client.autoCancellation(false);
  }
  return client;
}

export function isAdminAuthed() {
  const pb = getAdminPb();
  return pb.authStore.isValid && Boolean(pb.authStore.record);
}
