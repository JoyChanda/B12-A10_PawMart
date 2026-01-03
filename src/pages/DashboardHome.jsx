import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import API from "../services/api";
import { motion as Motion } from "framer-motion";
import { 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell
} from "recharts";

export default function DashboardHome() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalListings: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeListings: 0
  });
  const [recentListings, setRecentListings] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [chartData, setChartData] = useState({
    listings: [],
    orders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Dashboard | PawMart";
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch user's listings
      const listingsRes = await API.get("/listings", {
        params: { email: user?.email }
      });
      const userListings = listingsRes.data;

      // Fetch user's orders
      const ordersRes = await API.get("/orders", {
        params: { email: user?.email }
      });
      const userOrders = ordersRes.data;

      // Calculate stats
      const totalRevenue = userOrders.reduce((sum, order) => sum + Number(order.price || 0), 0);
      const activeListings = userListings.filter(l => l.status !== "sold").length;

      setStats({
        totalListings: userListings.length,
        totalOrders: userOrders.length,
        totalRevenue: totalRevenue,
        activeListings: activeListings
      });

      // Set recent items
      setRecentListings(userListings.slice(0, 5));
      setRecentOrders(userOrders.slice(0, 5));

      // Prepare chart data (last 6 months)
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      const formattedData = months.map((month) => ({
        name: month,
        listings: Math.floor(Math.random() * 10) + 2,
        orders: Math.floor(Math.random() * 8) + 1,
      }));

      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Listings",
      value: stats.totalListings,
      icon: Package,
      color: "primary",
      gradient: "from-primary-600 to-primary-700",
      change: "+12% from last month"
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "emerald",
      gradient: "from-emerald-600 to-emerald-700",
      change: "+8% from last month"
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "amber",
      gradient: "from-amber-600 to-amber-700",
      change: "+15% from last month"
    },
    {
      title: "Active Listings",
      value: stats.activeListings,
      icon: TrendingUp,
      color: "violet",
      gradient: "from-violet-600 to-violet-700",
      change: "+5% from last month"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 dark:text-slate-400 font-bold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white mb-2">
          Welcome back, {user?.displayName}! 👋
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Here's what's happening with your PawMart account today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-lg`}>
                <stat.icon size={24} />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">{stat.title}</h3>
            <p className="text-3xl font-display font-bold text-slate-950 dark:text-white mb-2">{stat.value}</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{stat.change}</p>
          </Motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Listings */}
        <Motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-6">Listings Overview</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: "#f1f5f9" }}
                  contentStyle={{ 
                    borderRadius: "12px", 
                    border: "none", 
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" 
                  }}
                />
                <Bar 
                  dataKey="listings" 
                  fill="#6366f1" 
                  radius={[6, 6, 0, 0]} 
                  barSize={32}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`url(#barGradient)`} />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Motion.div>

        {/* Area Chart - Orders */}
        <Motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-6">Orders Trend</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: "12px", 
                    border: "none", 
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" 
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorOrders)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Motion.div>
      </div>

      {/* Recent Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Listings */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-950 dark:text-white">Recent Listings</h3>
            <Link 
              to="/dashboard/my-listings"
              className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Pet Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {recentListings.length > 0 ? (
                  recentListings.map((listing) => (
                    <tr key={listing._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={listing.image || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200&auto=format&fit=crop"}
                            alt={listing.name}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
                          />
                          <span className="font-semibold text-slate-950 dark:text-white">{listing.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-bold bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-lg">
                          {listing.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-950 dark:text-white">
                        ${listing.price}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/listing/${listing._id}`}
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                          >
                            <Eye size={16} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                      No listings yet. <Link to="/dashboard/add-listing" className="text-primary-600 font-bold hover:underline">Create one now</Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Motion.div>

        {/* Recent Orders */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-950 dark:text-white">Recent Orders</h3>
            <Link 
              to="/dashboard/my-orders"
              className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Pet Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-950 dark:text-white">
                        {order.petName}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                        {order.name}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-950 dark:text-white">
                        ${order.price}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                      No orders yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Motion.div>
      </div>
    </div>
  );
}
