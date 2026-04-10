export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[240px] items-center justify-center">
      <div className="rounded-3xl bg-white px-6 py-5 text-center shadow-soft">
        <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-brand-blue border-t-brand-yellow" />
        <p className="text-sm font-medium text-slate-600">{label}</p>
      </div>
    </div>
  );
}
