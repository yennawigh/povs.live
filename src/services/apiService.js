import { ref, get, set, onValue, off, push } from "firebase/database";
import { db } from "@/lib/firebase";

let activeSubscriptions = {};

export const apiService = {
  async getServerInfo(serverName) {
    try {
      if (activeSubscriptions[serverName]) {
        off(activeSubscriptions[serverName]);
        delete activeSubscriptions[serverName];
      }

      const serverRef = ref(db, `${serverName}`);
      const snapshot = await get(serverRef);
      const data = snapshot.val();

      if (!data) return null;

      activeSubscriptions[serverName] = serverRef;

      return {
        STREAMERS: data.STREAMERS || { twitch: [], kick: [] },
        BACKGROUND: data.BACKGROUND,
        NAME: data.NAME,
        LOGO: data.LOGO,
        CODE: data.CODE,
        COLOR: data.COLOR,
        ANNOUNCEMENT: data.ANNOUNCEMENT,
        GAME_WORDS: data.GAME_WORDS || [],
        CHARACTERS: data.CHARACTERS || [],
      };
    } catch (error) {
      console.error("Error fetching server info:", error);
      return null;
    }
  },

  cleanup(serverName) {
    if (activeSubscriptions[serverName]) {
      off(activeSubscriptions[serverName]);
      delete activeSubscriptions[serverName];
    }
  },

  async updateServerInfo(serverName, data) {
    try {
      const serverRef = ref(db, `${serverName}`);
      await set(serverRef, data);
      return true;
    } catch (error) {
      console.error("Error updating server info:", error);
      return false;
    }
  },

  subscribeToServer(serverName, callback) {
    const serverRef = ref(db, `${serverName}`);
    const unsubscribe = onValue(serverRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        callback({
          STREAMERS: data.STREAMERS || { twitch: [], kick: [] },
          BACKGROUND: data.BACKGROUND,
          NAME: data.NAME,
          LOGO: data.LOGO,
          CODE: data.CODE,
          COLOR: data.COLOR,
          ANNOUNCEMENT: data.ANNOUNCEMENT,
          GAME_WORDS: data.GAME_WORDS || [],
          CHARACTERS: data.CHARACTERS || [],
        });
      }
    });

    return unsubscribe;
  },

  watchServerChanges(serverName, onChange) {
    const serverRef = ref(db, `${serverName}`);

    const unsubscribe = onValue(
      serverRef,
      (snapshot) => {
        const data = snapshot.val();
        if (!data) return;

        onChange({
          STREAMERS: data.STREAMERS || { twitch: [], kick: [] },
          BACKGROUND: data.BACKGROUND,
          NAME: data.NAME,
          LOGO: data.LOGO,
          CODE: data.CODE,
          COLOR: data.COLOR,
          ANNOUNCEMENT: data.ANNOUNCEMENT,
          GAME_WORDS: data.GAME_WORDS || [],
          CHARACTERS: data.CHARACTERS || [],
        });
      },
      (error) => {
        console.error("Error watching server changes:", error);
      }
    );

    return () => {
      off(serverRef);
      unsubscribe();
    };
  },

  async sendMessage(serverName, message) {
    try {
      const contactsRef = ref(db, `${serverName}/CONTACTS`);
      const snapshot = await get(contactsRef);
      const contacts = snapshot.val() || {};

      // Get next index
      const nextIndex = Object.keys(contacts).length;

      await set(ref(db, `${serverName}/CONTACTS/${nextIndex}`), {
        message,
        timestamp: Date.now(),
      });
      return true;
    } catch (error) {
      console.error("Error sending message:", error);
      return false;
    }
  },
};
