import { notFound } from "next/navigation";
import RecordList from "@/components/admin/RecordList";
import { getResource } from "@/lib/admin/resources";

export default async function ResourceListPage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource: key } = await params;
  const resource = getResource(key);
  if (!resource) notFound();
  return <RecordList resource={resource} />;
}
