import { Suspense } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardLayout from "./components/DashboardLayout";
import Loading from "./components/Loading";
import Home from "./pages/Home";
import PetsSupplies from "./pages/PetsSupplies";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardHome from "./pages/DashboardHome";
import AddListing from "./pages/AddListing";
import ListingDetails from "./pages/ListingDetails";
import MyListings from "./pages/MyListings";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import NotFound404 from "./pages/NotFound404";
import ManageUsers from "./pages/ManageUsers";
import PrivateRoute from "./components/PrivateRoute";
import ScrollToTop from "./components/ScrollToTop";
import useAuth from "./hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "./firebase.config";
import toast from "react-hot-toast";

function AppContent() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout");
      console.error(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  // Check if current route is dashboard
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-500 font-sans">
      <ScrollToTop />
      
      {/* Conditionally render Navbar & Footer only for non-dashboard routes */}
      {!isDashboardRoute && <Navbar user={user} handleLogout={handleLogout} />}
      
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/pets-supplies" element={<PetsSupplies />} />
          <Route
            path="/category-filtered-product/:categoryName"
            element={<PetsSupplies />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          
          {/* Listing Details - Public but requires login for order */}
          <Route path="/listing/:id" element={<ListingDetails />} />

          {/* Additional Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />

          {/* Dashboard Routes - All Private */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="add-listing" element={<AddListing />} />
            <Route path="my-listings" element={<MyListings />} />
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </Suspense>
      
      {!isDashboardRoute && <Footer />}
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
