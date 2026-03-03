"use client";

export default function Sidebar({ active, setActive }: any) {
  const items = ["dashboard", "menu", "orders", "analytics"];

  return (
    <div className="w-full md:w-64 bg-white shadow-md p-6 space-y-6">
      <h2 className="text-xl font-bold">Admin Panel</h2>

      <nav className="space-y-2">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`w-full text-left px-4 py-2 rounded-lg capitalize ${
              active === item
                ? "bg-orange-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
    </div>
  );
}

