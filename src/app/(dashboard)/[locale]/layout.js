import { Geist, Geist_Mono } from "next/font/google";
import "../../(withoutDashboard)/[locale]/globals.css";
import { ToastContainer } from "react-toastify";
import DashboardSidebar from "../component/DashboardSideBar";
import { UserProvider } from "@/context/userContext";
import { CategoryProvider } from "@/context/categoryContext";
import { SubCategoryProvider } from "@/context/subCategoryContext";
import { NewPlaceProvider } from "@/context/newPlaceContext";
import { TourProvider } from "@/context/tourContext";
import { CountryProvider } from "@/context/countryContext";
import { BookingProvider } from "@/context/bookingContext";



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
        <CountryProvider>
        <TourProvider>
           <BookingProvider>
        <NewPlaceProvider>
        <CategoryProvider>
          <SubCategoryProvider>
           
          <body
            className={`bg-neutral-background font-sans text-text-body ${geistSans.variable} ${geistMono.variable}`}
          >
            <div className="min-h-screen bg-brand-primary relative overflow-hidden text-white">
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
         </BookingProvider>
        </TourProvider>
        </CountryProvider>
      </UserProvider>
    </html>
  );
}
