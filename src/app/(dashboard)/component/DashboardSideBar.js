"use client";
import React, { useState } from 'react';
import {
    Home, Calendar, BookOpen, FolderOpen, Image,
    FileText, ShoppingBag, Users, Menu, X, Search,
    Bell, Settings, User,
    LogOut
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CommonLoader from '@/component/common/CommonLoader';
import { useUserContext } from '@/context/userContext';


const DashboardSidebar = () => {
    const [activeItem, setActiveItem] = useState('dashboard');
    const [activeItemName, setActiveItemName] = useState('Dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user,setReload,userLoading } = useUserContext()

    const menuItems = [
        {
            name: "Dashboard",
            value: "dashboard",
            route: "/dashboard",
            icon: Home,
            isAdmin: true,
        },
        {
            name: "Add New Place",
            value: "add-new-place",
            route: "/dashboard/add-new-place",
            icon: Users,
            isAdmin: false,
        },
        {
            name: "Category",
            value: "category",
            route: "/dashboard/category",
            icon: Users,
            isAdmin: false,
        },
        {
            name: "Sub Category",
            value: "subcategory",
            route: "/dashboard/sub-category",
            icon: Users,
            isAdmin: false,
        },
        {
            name: "Add Tours",
            value: "add-tours",
            route: "/dashboard/add-tours",
            icon: Users,
            isAdmin: false,
        },
        {
            name: "Create New User",
            value: "create-user",
            route: "/dashboard/create-user",
            icon: Users,
            isAdmin: true,
        },
        {
            name: "Events",
            value: "events",
            route: "/dashboard/events",
            icon: Calendar,
            isAdmin: true,
        },
        {
            name: "Learn",
            value: "learn",
            route: "/dashboard/learn",
            icon: BookOpen,
            isAdmin: true,
        },
        {
            name: "Projects",
            value: "projects",
            route: "/dashboard/projects",
            icon: FolderOpen,
            isAdmin: false,
        },
        {
            name: "Gallery",
            value: "gallery",
            route: "/dashboard/gallery",
            icon: Image,
            isAdmin: false,
        },
        {
            name: "Blog",
            value: "blog",
            route: "/dashboard/blog",
            icon: FileText,
            isAdmin: true,
        },
        // {
        //     name: "Merchandise",
        //     value: "merchandise",
        //     route: "/dashboard/merchandise",
        //     icon: ShoppingBag,
        //     isAdmin: true,
        // },
    ];

     const router = useRouter();
    //  if(userLoading || !user){
    //     return <CommonLoader/>
    //  }
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
            <div className={`fixed top-0 left-0 h-full w-64 bg-white/10 backdrop-blur-md border-r border-white/20 z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <Link href={'/'}><h1 className="text-2xl font-bold cursor-pointer">Deep Sky Society</h1></Link>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white hover:text-gray-300">
                            <X size={24} />
                        </button>
                    </div>
                    <nav className="space-y-2">
                        {menuItems
                            .filter((item) => user?.role === 'admin' || !item.isAdmin)
                            .map(({ name, value, route, icon: Icon }) => (
                                <Link href={route} key={value}>
                                    <button

                                        onClick={() => {
                                            setActiveItem(value);
                                            setSidebarOpen(false);
                                            setActiveItemName(name)
                                        }}
                                        className={`w-full flex items-center px-4 py-3 rounded-xl space-x-3 transition-all ${activeItem === value
                                            ? 'bg-white/20 text-white shadow'
                                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        <Icon size={20} />
                                        <span>{name}</span>
                                    </button>
                                </Link>
                            ))}
                          
                                    <button

                                        onClick={() => {
                                            localStorage.clear();
                                            router.push('/')
                                            setReload(true)

                                            setSidebarOpen(false);
                                            setActiveItemName('logout')
                                        }}
                                        className={`w-full flex items-center px-4 py-3 rounded-xl space-x-3 transition-all text-gray-300 hover:bg-white/10 hover:text-white
                                            `}
                                    >
                                        <LogOut size={20} />
                                        <span>Log Out</span>
                                    </button>
                                
                    </nav>

                </div>
            </div>
            <div className="lg:ml-64">
                <header className="sticky top-0 bg-white/10 backdrop-blur-md border-b border-white/20 z-30 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white hover:text-gray-300">
                                <Menu size={24} />
                            </button>
                            <h2 className="text-xl font-semibold">{activeItemName}</h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center bg-white/10 rounded-full px-4 py-2 border border-white/20">
                                <Search className="text-gray-300 mr-2" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-transparent text-white placeholder-gray-300 outline-none w-48"
                                />
                            </div>
                            <button className="relative p-2 text-gray-300 hover:text-white">
                                <Bell size={20} />
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                            </button>
                            <Settings className="text-gray-300 hover:text-white cursor-pointer" size={20} />
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                <User className="text-white" size={16} />
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
};

export default DashboardSidebar;
