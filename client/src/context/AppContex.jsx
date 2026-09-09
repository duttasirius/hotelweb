import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user, loading: authLoading, getToken, logout } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]);
  const [rooms, setRooms] = useState([]);

  const fetchUser = async () => {
    try {
      if (!getToken()) {
        setIsOwner(false);
        setSearchedCities([]);
        return;
      }

      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setIsOwner(data.role === "hotelOwner");
        setSearchedCities(data.recentSearchCities || []);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        logout();
        setIsOwner(false);
      } else {
        toast.error(error.response?.data?.message || error.message);
        console.error(error);
      }
    }
  };

  const fetchRoom = async () => {
    try {
      const { data } = await axios.get("/api/room");

      if (data.success) {
        setRooms(data.rooms);
      }
    } catch (error) {
      console.error("ROOM FETCH ERROR:", error);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchUser();
    }
  }, [authLoading, user?.id]);

  useEffect(() => {
    fetchRoom();
  }, []);

  const value = {
    navigate,
    user,
    getToken,
    logout,
    isOwner,
    setIsOwner,
    showHotelReg,
    setShowHotelReg,
    searchedCities,
    setSearchedCities,
    axios,
    rooms,
    setRooms,
    authLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
