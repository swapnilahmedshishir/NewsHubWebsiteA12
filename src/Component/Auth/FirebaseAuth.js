import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};
// ok, we C,4
// const firebaseConfig = {
//   apiKey: "AIzaSyBuxxisDMyCJ+xgG5s-_oiVOLd2-qUwa8I",
//   authDomain: "newswebsite-3a3+8.firebaseapp.com",
//   projectId: "newswebsite-3a348",
//   storageBucket: "newswebsite-3a348.firebasestorage.app",
//   messagingSenderId: "179693389803",
//   appId: "1:179693389803:web:3538933418a8ae4b64fbae",
//   measurementId: "G-6F84RNGSTW",
// };
// VITE_CLOUDINARY_CLOUD_NAME =dtqkw4eqz;
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
