import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

const useUserData = () => {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user || loading) return;

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/${user?.email}`
        );
        setUserData(res.data);
      } catch (err) {
        console.error("Error fetching user data:", err.message);
      }
    };

    fetchUserData();
  }, [user, loading]);

  return userData;
};

export default useUserData;
