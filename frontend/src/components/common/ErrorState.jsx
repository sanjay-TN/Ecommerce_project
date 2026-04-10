export default function ErrorState({ message, action }) {
  return (
    <div className="rounded-3xl border border-red-100 bg-red-50 p-6 text-red-700">
      <p className="font-semibold">Something went wrong</p>
      <p className="mt-2 text-sm">{message}</p>
      {action}
    </div>
  );
}
