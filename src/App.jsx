import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
