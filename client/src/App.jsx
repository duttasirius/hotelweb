import React from "react";
import Navbar from "./components/Navbar";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";
import HotelReg from "./components/HotelReg";
import Layout from "./pages/hotelOwner/Layout";
import DashBoard from "./pages/hotelOwner/DashBoard";
import AddRoom from "./pages/hotelOwner/AddRoom";
import ListRoom from "./pages/hotelOwner/ListRoom";
import About from "./pages/About";
import AuthModal from "./components/AuthModal";
import { useAppContext } from "./context/AppContex";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const { showHotelReg, isOwner, authLoading } = useAppContext();
  const { user } = useAuth();

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl bg-white px-6 py-5 text-sm font-semibold text-slate-700 shadow-sm">
          Loading your session...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Toaster />

      {!isOwnerPath && <Navbar />}

      {showHotelReg && user && <HotelReg />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/rooms" element={<AllRooms />} />

          <Route path="/rooms/:id" element={<RoomDetails />} />

          <Route
            path="/auth"
            element={user ? <Navigate to="/" replace /> : <AuthModalPage />}
          />

          <Route
            path="/my-bookings"
            element={user ? <MyBookings /> : <Navigate to="/auth" replace />}
          />

          <Route path="/about" element={<About />} />

          <Route
            path="/owner"
            element={user && isOwner ? <Layout /> : <Navigate to="/" replace />}
          >
            <Route index element={<DashBoard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
        </Routes>
      </main>

      {!isOwnerPath && <Footer />}
    </div>
  );
};

const AuthModalPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 pt-20">
      <AuthModal onClose={() => navigate("/")} />
    </div>
  );
};

export default App;
