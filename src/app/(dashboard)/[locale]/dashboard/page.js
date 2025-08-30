"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Home, Calendar, BookOpen, FolderOpen, Image,
  FileText, ShoppingBag, Users, Eye, TrendingUp
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import CommonLoader from "@/component/common/CommonLoader";
import { useUserContext } from "@/context/userContext";


const COLORS = ["#6366f1", "#14b8a6"];

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const {userLoading}=useUserContext()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("https://nova-next-gen-server.onrender.com/api/v1/dashboard");
      setDashboardData(res.data.data);
    } catch (err) {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const stats = dashboardData
    ? [
        {
          title: "Total Users",
          value: dashboardData.totalUsers,
          change: "+12%",
          icon: Users,
        },
        {
          title: "Active Projects",
          value: dashboardData.activeProjects,
          change: "+8%",
          icon: FolderOpen,
        },
        {
          title: "Total Blogs",
          value: dashboardData.totalBlogs,
          change: "+5%",
          icon: FileText,
        },
        {
          title: "Total Events",
          value: dashboardData.totalEvents,
          change: "+15%",
          icon: Calendar,
        },
      ]
    : [];

  // if (loading) {
  //   return <CommonLoader/>
  // }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <main className="p-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* {stats.map(({ title, value, change, icon: Icon }) => (
          <div
            key={title}
            className="bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="p-2 bg-gradient-to-r from-slate-600 to-slate-500 rounded-lg">
                <Icon className="text-white" size={20} />
              </div>
              <span className="text-green-400 text-sm font-medium">{change}</span>
            </div>
            <h3 className="text-gray-300 text-sm mb-1">{title}</h3>
            <p className="text-white text-2xl font-bold">{value}</p>
          </div>
        ))} */}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white/10 rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold mb-6 text-white">User Growth</h3>
          <div className="h-64">
            {/* <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData.barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Bar dataKey="users" fill="#38bdf8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer> */}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold mb-6 text-white">User Status</h3>
          <div className="h-64">
            {/* <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dashboardData.pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {dashboardData.pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
