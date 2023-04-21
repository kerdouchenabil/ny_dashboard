import React from "react";
import { Routes, Route} from "react-router-dom";
import Home from "../components/Home";

import Tourism from "./Tourism";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Hosting from "./Hosting";
import Investment from "./Investment";

export default function Main() {
  return (
    <div className="Main">
      {/* <ResponsiveAppBar /> */}
      <Routes>
        <Route path="Tourism" element={<Tourism />} />
        <Route path="Hosting" element={<Hosting />} />
        <Route path="Investment" element={<Investment />} />
        <Route
          path="*"
          element={
            <Home /> /** "*" aulieu de "/" en dernier comme par default */
          }
        />
      </Routes>

      
    </div>
  );
}
