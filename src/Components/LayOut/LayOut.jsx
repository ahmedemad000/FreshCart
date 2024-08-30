import Style from "./LayOut.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

export default function LayOut() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    console.log("Mounting LayOut");
  }, []);
  return (
    <>
      <NavBar />
      <div className="container max-w-screen-xl mx-auto pt-5 p-3">
        <Outlet />
      <Footer />
      </div>
    </>
  );
}
