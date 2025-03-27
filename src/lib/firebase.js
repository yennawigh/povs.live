import { initializeApp, getApps } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBGrpQe1h89K4wVi0Y7kcN_G5TTiNF-Swk",
  authDomain: "povsonline-bfbeb.firebaseapp.com",
  databaseURL: "https://povsonline-bfbeb-default-rtdb.firebaseio.com",
  projectId: "povsonline-bfbeb",
  storageBucket: "povsonline-bfbeb.firebasestorage.app",
  messagingSenderId: "221137591778",
  appId: "1:221137591778:web:c9c0c112f065a558722dbb",
  measurementId: "G-DL3MB8K4GQ",
};

let app;
let database;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);

  // Performans optimizasyonu için
  database.app.automaticDataCacheEnabled = true;
}

export const db = database;
