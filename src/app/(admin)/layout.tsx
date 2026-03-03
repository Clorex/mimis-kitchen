import "../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#FCECEF] flex justify-center">
        <div className="w-full max-w-[430px] min-h-screen bg-white rounded-[32px] shadow-lg overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
