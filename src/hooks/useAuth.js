import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";
import API from "../services/api";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        try {
          // Fetch additional user info (like role) from our backend
          const res = await API.get(`/users/${u.email}`);
          setDbUser(res.data);
        } catch (err) {
          console.error("Failed to fetch user role:", err.message);
          setDbUser(null);
        }
      } else {
        setUser(null);
        setDbUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { user, dbUser, loading, isAdmin: dbUser?.role === "admin" };
}
