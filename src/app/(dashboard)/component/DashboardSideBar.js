"use client";
import React, { useEffect, useState } from "react";
import {
    Home,
    Users,
    Menu,
    X,
    Search,
    Bell,
    Settings,
    User,
    LogOut,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import CommonLoader from "@/component/common/CommonLoader";

const DashboardSidebar = () => {
    const [activeItem, setActiveItem] = useState("dashboard");
    const [activeItemName, setActiveItemName] = useState("Dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, setReload, userLoading } = useUserContext();
    const [initialLoading, setInitialLoading] = useState(true);

    const router = useRouter();

    // Simulate initial loading
    useEffect(() => {
        if (!userLoading) {
            const timer = setTimeout(() => setInitialLoading(false), 500); // small delay
            return () => clearTimeout(timer);
        }
    }, [userLoading]);

    const menuItems = [
        { name: "Dashboard", value: "dashboard", route: "/dashboard", icon: Home, isAdmin: true },
        { name: "Country", value: "country", route: "/dashboard/country", icon: Users, isAdmin: true },
        { name: "Destination", value: "destination", route: "/dashboard/destination", icon: Users, isAdmin: true },
        { name: "User", value: "user", route: "/dashboard/create-user", icon: Users, isAdmin: true },
        { name: "Person Type", value: "tourType", route: "/dashboard/personType", icon: Users, isAdmin: true },
        { name: "Tours", value: "add-tours", route: "/dashboard/add-tours", icon: Users, isAdmin: true },
        { name: "Booking", value: "order", route: "/dashboard/order", icon: Users, isAdmin: false },
        { name: "Payment", value: "payment", route: "/dashboard/payment", icon: Users, isAdmin: true },
    ];

    // if (initialLoading) return <CommonLoader />;
    return (
        <>
            {/* Sidebar Background Blur */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-brand-primary text-white  z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <Link href={"/"} className="flex items-center">
                            <Image
                                src="/image.png"
                                alt="IpTours"
                                width={150}
                                height={40}
                                priority
                            />
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-white hover:text-accent-pink"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <nav className="space-y-2">
                        {menuItems
                            .filter((item) => user?.role === "admin" || !item.isAdmin)
                            .map(({ name, value, route, icon: Icon }) => (
                                <Link href={route} key={value}>
                                    <button
                                        onClick={() => {
                                            setActiveItem(value);
                                            setSidebarOpen(false);
                                            setActiveItemName(name);
                                        }}
                                        className={`w-full flex items-center px-4 py-3 rounded-xl space-x-3 transition-all ${activeItem === value
                                            ? "bg-brand-secondary text-white shadow"
                                            : "text-white hover:bg-white/10 hover:text-white"
                                            }`}
                                    >
                                        <Icon size={20} />
                                        <span>{name}</span>
                                    </button>
                                </Link>
                            ))}

                        {/* Logout */}
                        <button
                            onClick={() => {
                                localStorage.clear();
                                router.push("/");
                                setReload(true);
                                setSidebarOpen(false);
                                setActiveItemName("logout");
                            }}
                            className="w-full flex items-center px-4 py-3 rounded-xl space-x-3 transition-all text-white hover:bg-white/10 hover:text-white"
                        >
                            <LogOut size={20} />
                            <span>Log Out</span>
                        </button>
                    </nav>
                </div>
            </div>

            {/* Main Header */}
            <div className="lg:ml-64">
                <header className="sticky top-0 bg-white  z-30 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden text-text-title hover:text-brand-secondary"
                            >
                                <Menu size={24} />
                            </button>
                            <h2 className="text-xl font-semibold text-text-title">
                                {activeItemName}
                            </h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center bg-white/10 rounded-full px-4 py-2 border border-neutral-line">
                                <Search className="text-text-body mr-2" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-transparent text-text-body  outline-none w-48"
                                />
                            </div>
                            <button className="relative p-2 text-text-body hover:text-text-body">
                                <Bell size={20} />
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-pink rounded-full animate-ping"></span>
                            </button>
                            <Settings
                                className="text-text-body hover:text-text-body cursor-pointer"
                                size={20}
                            />
                            <div className="w-8 h-8 bg-accent-pink rounded-full flex items-center justify-center">
                                <User className="text-text-body" size={16} />
                            </div>
                        </div>
                    </div>
                </header>
            </div>



        </>
    );
};

export default DashboardSidebar;
