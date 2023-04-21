import React from "react";
import InteractBarChart from "../components/InteractBarChart";
import { Grid } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";

export default function Investment() {
  return (
    <div>
      <ResponsiveAppBar/>
      <h1>Investment</h1>
      <p>Carte qui affiche un point sur un logement sélectionné.
        Un tableau à coté affiche la liste des logements disponibles.
        Des filtres peuvent etre mis en place (prix avec un slider)
      </p>
      <Grid container spacing={2}>
        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          <InteractBarChart />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
}
