"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import type { RecordModel } from "pocketbase";
import RecordForm from "@/components/admin/RecordForm";
import { getAdminPb } from "@/lib/admin/client";
import { getResource } from "@/lib/admin/resources";

export default function ResourceEditPage() {
  const params = useParams<{ resource: string; id: string }>();
  const resource = getResource(params.resource);
  const [record, setRecord] = useState<RecordModel | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!resource) return;
    void getAdminPb()
      .collection(resource.collection)
      .getOne(params.id)
      .then(setRecord)
      .catch(() => setMissing(true));
  }, [params.id, resource]);

  if (!resource) notFound();
  if (missing) notFound();
  if (!record) return <p className="text-sm text-black/60">Yükleniyor...</p>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold">{resource.singular} düzenle</h1>
      <RecordForm resource={resource} record={record} />
    </div>
  );
}
