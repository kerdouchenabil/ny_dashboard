//
import React from "react";
import { Link } from "react-router-dom";
// grid
import Grid from "@mui/material/Grid";
// comps
import "../css/home.css";
import Card from "./HomeCard";

import nyc_img from "../data/dataset-cover.jpg"; // Tell webpack this JS file uses this image
import tourism_img from "../data/tourism_img.jpg"; // Tell webpack this JS file uses this image
import hosting_img from "../data/hosting_img.png"; // Tell webpack this JS file uses this image
import investment_img from "../data/investment_img.png"; // Tell webpack this JS file uses this image

export default function Home() {
  return (
    <div className="Home">
      
      <Grid container spacing={5}>
      <Grid item xs={12}>
      <img src={nyc_img} alt="Tourism" className="home_img_link"/>
      <h1>Welcome to New York City Airbnb Interactive Dashboard</h1>
      <h3><i>Made by Nabil KERDOUCHE</i></h3>
      </Grid>
      
      <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          <Link to="Tourism">
            <Card
              img={tourism_img}
              title={"Tourism"}
              text="Dou you want to visit NY City ? Click here !"
            />
          </Link>
        </Grid>
        <Grid item xs={3}>
          <Link to="Tourism">
            <Card
              img={hosting_img}
              title={"Hosting"}
              text="You want to become a superhost in NY City ? Click here !"
            />
          </Link>
        </Grid>

        <Grid item xs={3}>
          <Link to="Tourism">
            <Card
              img={investment_img}
              title={"Investment"}
              text="Are you interested on investment in NY City ? Click here !"
            />
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
