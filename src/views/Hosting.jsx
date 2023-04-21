import React from "react";
import { Grid } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";

///
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


///

export default function Hosting() {

  const data = useSelector((globalState) => globalState.airbnbData); //useContext(DataContext); // importing data
  const dispatch = useDispatch();

  return (
    <div>
      <ResponsiveAppBar />
      <h1>Hosting</h1>
      <p>
        line chart avec pour chaque month, le nombre de reviews length (ou
        moyenne ?) month: represents month of last review
      </p>
      <Grid container spacing={2}>
        <Grid item xs={8}>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
}
