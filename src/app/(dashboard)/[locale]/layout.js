import { Geist, Geist_Mono } from "next/font/google";
import "../../(withoutDashboard)/[locale]/globals.css";
import { ToastContainer } from "react-toastify";
import DashboardSidebar from "../component/DashboardSideBar";
import { UserProvider } from "@/context/userContext";
import { CategoryProvider } from "@/context/categoryContext";
import { SubCategoryProvider } from "@/context/subCategoryContext";
import { NewPlaceProvider } from "@/context/newPlaceContext";
import { TourProvider } from "@/context/tourContext";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dashboard | Iptours",
  description: "Dashboard area of Deep Sky Society",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <TourProvider>
        <NewPlaceProvider>
        <CategoryProvider>
          <SubCategoryProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden text-white">
              <DashboardSidebar />
              <div className="lg:ml-64">
                {children}
              </div>
            </div>
            <ToastContainer />
          </body>
          </SubCategoryProvider>
        </CategoryProvider>
        </NewPlaceProvider>
        </TourProvider>
      </UserProvider>
    </html>
  );
}
