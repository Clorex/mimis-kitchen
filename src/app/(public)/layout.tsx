import BottomNav from "@/components/layout/BottomNav";

export const metadata = {
  title: "Mimi's Kitchen | Good Food. No Stress. | Lekki, Lagos",
  description: "Freshly prepared Nigerian meals in Lekki. Jollof rice, fried rice, egusi soup and more. Fast pickup and delivery in Lagos.",
  keywords: "food delivery lekki, best jollof in lekki, nigerian food lagos, mimi kitchen",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#EDE1CF] min-h-screen flex justify-center">
      <div className="w-full max-w-[420px] min-h-screen bg-[#F4E8D7] relative">
        {children}
        <BottomNav />
      </div>
    </div>
  );
}
