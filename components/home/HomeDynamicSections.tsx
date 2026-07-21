"use client";

import { useEffect, useState } from "react";
import ServicesPreview from "@/components/home/ServicesPreview";
import BlogPreview from "@/components/home/BlogPreview";
import { apiGet } from "@/lib/api-client";
import type { Post, Service } from "@/lib/types/content";

export default function HomeDynamicSections() {
  const [services, setServices] = useState<Service[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [servicesRes, postsRes] = await Promise.all([
          apiGet<{ items: Service[] }>("/api/services?limit=4"),
          apiGet<{ items: Post[] }>("/api/posts?limit=3"),
        ]);
        if (cancelled) return;
        setServices(servicesRes.items);
        setPosts(postsRes.items);
      } catch {
        if (!cancelled) {
          setServices([]);
          setPosts([]);
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <ServicesPreview services={services} />
      <BlogPreview posts={posts} />
    </>
  );
}
