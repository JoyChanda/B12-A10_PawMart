import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import Home from "./pages/Home";
import PetsSupplies from "./pages/PetsSupplies";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddListing from "./pages/AddListing";
import ListingDetails from "./pages/ListingDetails";
import PrivateRoute from "./components/PrivateRoute";
import useAuth from "./hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "./firebase.config";
import toast from "react-hot-toast";
import NotFound404 from "./pages/NotFound404";

export default function App() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar user={user} handleLogout={handleLogout} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets-supplies" element={<PetsSupplies />} />
          <Route
            path="/category-filtered-product/:categoryName"
            element={<PetsSupplies />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/listing/:id"
            element={
              <PrivateRoute>
                <ListingDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-listing"
            element={
              <PrivateRoute>
                <AddListing />
              </PrivateRoute>
            }
          />
          {/* 404 Page */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
