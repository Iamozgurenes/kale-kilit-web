import { notFound } from "next/navigation";
import RecordForm from "@/components/admin/RecordForm";
import { getResource } from "@/lib/admin/resources";


export default async function ResourceCreatePage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource: key } = await params;
  const resource = getResource(key);
  if (!resource) notFound();
  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold">Yeni {resource.singular.toLowerCase()}</h1>
      <RecordForm resource={resource} />
    </div>
  );
}
