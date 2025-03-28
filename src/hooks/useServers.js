import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";

export function useServers() {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const serversRef = ref(db, "/");

    const unsubscribe = onValue(serversRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const serverList = Object.entries(data).map(([id, server]) => ({
          id,
          ...server,
        }));
        setServers(serverList);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { servers, loading };
}
