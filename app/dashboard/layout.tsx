import Sidebar from "@/components/Sidebar/Sidebar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div /* className={inter.className} */>
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="flex">
        <div className="max-md:hidden max-md:w-0">
          <Sidebar />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
