import "../globals.css";
import { Poppins, Inter } from "next/font/google";
import BottomNav from "@/components/layout/BottomNav";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="bg-[#E8D9C5] flex justify-center">
        <div className="w-full max-w-[430px] min-h-screen bg-[#F7EEE2] rounded-[32px] shadow-lg relative pb-24">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
