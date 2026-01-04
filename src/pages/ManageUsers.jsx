import React, { useEffect, useState } from "react";
import API from "../services/api";
import useAuth from "../hooks/useAuth";
import { motion as Motion } from "framer-motion";
import { User, Shield, ShieldAlert, Trash2, Loader2, Search, Mail } from "lucide-react";
import toast from "react-hot-toast";

export default function ManageUsers() {
  const { user: currentUser, isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title = "Manage Users | Admin Panel";
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRole = async (email, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      await API.patch(`/users/role/${email}`, { role: newRole });
      toast.success(`User role updated to ${newRole}`);
      fetchUsers(); // Refresh list
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <ShieldAlert size={64} className="text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Access Denied</h1>
        <p className="text-slate-500 dark:text-slate-400">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white mb-2">
          User Management
        </h1>
        <p className="text-slate-800 dark:text-slate-400 font-medium">
          Manage roles and system access for all registered users.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary-600 mb-2" />
                    <p className="text-slate-500 font-medium">Fetching users...</p>
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img 
                          src={u.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.email}`} 
                          className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700" 
                          alt="" 
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{u.name}</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <Mail size={12} />
                            {u.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        u.role === "admin" 
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" 
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}>
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400 font-medium">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {u.email !== currentUser?.email ? (
                        <button
                          onClick={() => handleToggleRole(u.email, u.role)}
                          className={`p-2 rounded-lg transition-colors ${
                            u.role === "admin"
                              ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                              : "text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                          }`}
                          title={u.role === "admin" ? "Demote to User" : "Promote to Admin"}
                        >
                          {u.role === "admin" ? <Shield size={20} /> : <ShieldAlert size={20} />}
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-slate-400">Current User</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-500 font-medium">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
