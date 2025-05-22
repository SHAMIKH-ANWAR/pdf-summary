export function UpgradeRequired() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Upgrade Required</h1>
      <p className="mb-4">
        Your current plan does not support this feature. Please upgrade your plan to continue.
      </p>
      <a href="/pricing" className="bg-blue-500 text-white px-4 py-2 rounded">
        Upgrade Now
      </a>
    </div>
  );
}