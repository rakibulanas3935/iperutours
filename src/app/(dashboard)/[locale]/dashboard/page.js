"use client";
import React, { useEffect, useState } from "react";
import {
  Users,
  Image,
  Home,
  FolderOpen,
  ShoppingBag,
} from "lucide-react";

import CommonLoader from "@/component/common/CommonLoader";
import useAxiosGet from "@/utils/useAxiosGet";

const Dashboard = () => {
  const [dashboardData, getDashboardData, dashBoardDataLoading, setDashboardData] = useAxiosGet([])
  const fetchDashboardData = async () => {
    getDashboardData("http://localhost:3000/api/v1/dashboard", (res) => {
      setDashboardData(res?.data);
    });
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (dashBoardDataLoading) return <CommonLoader />;


  const stats = [
    {
      title: "Users",
      value: dashboardData.totalUsers,
      icon: <Users className="w-6 h-6 text-white" />,
      color: "bg-brand-primary",
    },
    {
      title: "Countries",
      value: dashboardData.totalCountries,
      icon: <Home className="w-6 h-6 text-white" />,
      color: "bg-accent-teal",
    },
    {
      title: "Destinations",
      value: dashboardData.totalPlaces,
      icon: <Image className="w-6 h-6 text-white" />,
      color: "bg-accent-yellow",
    },
    {
      title: "Tours",
      value: dashboardData.totalTours,
      icon: <FolderOpen className="w-6 h-6 text-white" />,
      color: "bg-accent-pink",
    },
    {
      title: "Bookings",
      value: dashboardData.totalBookings,
      icon: <ShoppingBag className="w-6 h-6 text-white" />,
      color: "bg-brand-secondary",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-background text-text-body p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-text-title">Dashboard</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div
              key={index + 1}
              className={`flex items-center p-6 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg ${stat?.color}`}
            >
              <div className="flex-shrink-0">{stat?.icon}</div>
              <div className="ml-4">
                <p className="text-white text-sm font-medium">{stat?.title}</p>
                <p className="text-white text-2xl font-bold">{stat?.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Placeholder */}

      </div>
    </div>
  );
};

export default Dashboard;
