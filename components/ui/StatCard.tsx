export default function StatCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-black/5">
      <p className="text-3xl font-extrabold text-navy sm:text-4xl">{value}</p>
      <p className="mt-2 text-sm text-black/60">{label}</p>
    </div>
  );
}
