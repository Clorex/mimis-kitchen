"use client";

export default function AdminHeader() {
  const logout = () => {
    document.cookie = "admin-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href = "/admin/login";
  };

  return (
    <div className="bg-white shadow-sm p-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
      >
        Logout
      </button>
    </div>
  );
}
