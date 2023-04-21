import { Grid, Paper } from "@mui/material";
import React, { useContext, useState } from "react";
import { DataContext } from "../App";
import Map from "../components/Map";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { AIRBNB_PRICE_FILTER } from "../constants";
import * as d3 from "d3";
import InteractBarChart from "../components/InteractBarChart";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
  ArcElement,
} from "chart.js";
import { Bar, Line, Radar, PolarArea } from "react-chartjs-2";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { count } from "d3";

//bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
//line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function Tourism() {
  const data = useSelector((globalState) => globalState.airbnbData); //useContext(DataContext); // importing data
  const dispatch = useDispatch();
  //const tdata = data.slice(0, 10);
  const [tdata, setTdata] = useState(data); // tdata : tourism data

  // slider
  function valuetext(value) {
    return `${value} $`;
  }

  const [value, setValue] = useState([0, 10000]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch({
      type: AIRBNB_PRICE_FILTER,
      payload: { price: value, roomtype: roomtype },
    });
    setReviewsMonth(get_reviews_month());
    setPricesMonth(get_prices_month());
    setAvailabilities(get_availabilities());
    setReviews(get_reviews());
  };

  //let unique = [...new Set(data.map(el => el.room_type))];
  //console.log(unique)

//bar chart data (number of reviews)
function get_reviews() {
  const array_nbh = [
    "Brooklyn",
    "Manhattan",
    "Queens",
    "Staten Island",
    "Bronx",
  ];

  let nb_rev = [];

  let availabilitiesByNbh = d3
    .rollups(
      data, //.filter((el)=>{return el.month!=""}), //input array
      (xs) => d3.sum(xs, (x) => x.number_of_reviews), //reducing fct
      (d) => d.neighbourhood_group // grouping fct
    )
    .map(([k, v]) => ({ neighbourhood_group: k, number_of_reviews: v })) //d3.group(data, d => d.month)
    .sort((el) => el.neighbourhood_group);

  let countByNbh = d3.rollup(
    data, //.filter((el)=>{return el.neighbourhood_group!=""}), //input array,
    (v) => v.length,
    (d) => d.neighbourhood_group
  ); //d3.group(data, d => d.month)
  //console.log("--- : ", pricesByMonth.filter((e)=>e.month=="10")[0].price)

  for (const n of array_nbh) {
    let tmp = availabilitiesByNbh.filter((e) => e.neighbourhood_group == n);
    //console.log("---- : ",tmp && tmp[0])
    if (tmp && tmp[0]) {
      nb_rev.push(
        //parseInt(tmp[0].availabilities) / parseInt(countByNbh.get(n)) //moyenne
        parseInt(tmp[0].number_of_reviews)//nombre (somme)
      );
    } else {
      nb_rev.push(0);
    }
  }
  return nb_rev;
}

const [reviews, setReviews] = useState(get_reviews());

  // bar chart
  const bar_options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Number of houses/reviews per neighbourhood group",
      },
    },
    scales: {
      y_houses: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y_reviews: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };
  let labels = ["Brooklyn", "Manhattan", "Queens", "Staten Island", "Bronx"];
  const bar_data = {
    labels,
    datasets: [
      {
        label: "Number of houses",
        data: [
          data.filter((el) => el.neighbourhood_group == labels[0]).length,
          data.filter((el) => el.neighbourhood_group == labels[1]).length,
          data.filter((el) => el.neighbourhood_group == labels[2]).length,
          data.filter((el) => el.neighbourhood_group == labels[3]).length,
          data.filter((el) => el.neighbourhood_group == labels[4]).length,
        ],
        backgroundColor: "rgba(255, 9, 32, 0.5)",
        yAxisID: 'y_houses',
      },
      {
        label: "Number of reviews",
        data: reviews,/*[
          data.filter((el) => el.neighbourhood_group == labels[0] && el.number_of_reviews>0).length,
          data.filter((el) => el.neighbourhood_group == labels[1] && el.number_of_reviews>0).length,
          data.filter((el) => el.neighbourhood_group == labels[2] && el.number_of_reviews>0).length,
          data.filter((el) => el.neighbourhood_group == labels[3] && el.number_of_reviews>0).length,
          data.filter((el) => el.neighbourhood_group == labels[4] && el.number_of_reviews>0).length,
        ]*/
        backgroundColor: "rgba(53, 140, 235, 0.7)",
        yAxisID: 'y_reviews',
      },
    ],
  };

  function nb_entire_home_apt(data) {
    return (
      <h2>{data.filter((el) => el.room_type == "Entire home/apt").length}</h2>
    );
  }
  function nb_private_room(data) {
    return (
      <h2>{data.filter((el) => el.room_type == "Private room").length}</h2>
    );
  }
  function nb_shared_room(data) {
    return <h2>{data.filter((el) => el.room_type == "Shared room").length}</h2>;
  }
  function nb_total_houses(data) {
    return <h2>{data.length}</h2>;
  }

  // room types
  //roomtypes = ['Entire home/apt', 'Private room', 'Shared room']
  const [roomtype, setRoomtype] = useState(null);
  function handleChangeRoomtype(newValue) {
    setRoomtype(newValue);
    dispatch({
      type: AIRBNB_PRICE_FILTER,
      payload: { price: value, roomtype: newValue },
    });
    setReviewsMonth(get_reviews_month());
    setPricesMonth(get_prices_month());
    setAvailabilities(get_availabilities());
    setReviews(get_reviews());
    //console.log("dispatch payload:", {"price":value, "roomtype":roomtype, "newValue": newValue})
  }
  //

  // line chart
  /*
  const line_options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Number of reviews per month (for Hosts and Investors)",
      },
    },
  };
  */
  const line_options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Reviews and Prices over the months",
      },
    },
    scales: {
      y_review: {
        type: "linear",
        display: true,
        position: "left",
      },
      y_price: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function get_reviews_month() {
    let res = [];
    const array_months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    array_months.forEach((m) =>
      res.push(data.filter((el) => el.month == m).length)
    );
    return res;
  }
  const [reviewsMonth, setReviewsMonth] = useState(get_reviews_month());

  ///////////
  function get_prices_month() {
    const array_months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];

    let avg_prices = [];

    let pricesByMonth = d3
      .rollups(
        data.filter((el) => {
          return el.month != "";
        }), //input array
        (xs) => d3.sum(xs, (x) => x.price), //reducing fct
        (d) => d.month // grouping fct
      )
      .map(([k, v]) => ({ month: k, price: v })) //d3.group(data, d => d.month)
      .sort((el) => el.month);

    let countByMonth = d3.rollup(
      data.filter((el) => {
        return el.month != "";
      }), //input array,
      (v) => v.length,
      (d) => d.month
    ); //d3.group(data, d => d.month)
    //console.log("--- : ", pricesByMonth.filter((e)=>e.month=="10")[0].price)

    for (const m of array_months) {
      let tmp = pricesByMonth.filter((e) => e.month == m);
      //console.log("---- : ",tmp && tmp[0])
      if (tmp && tmp[0]) {
        avg_prices.push(parseInt(tmp[0].price) / parseInt(countByMonth.get(m)));
      } else {
        avg_prices.push(0);
      }
    }
    //console.log("avg_prices : ", avg_prices)
    return avg_prices;
  }

  const [pricesMonth, setPricesMonth] = useState(get_prices_month());
  //console.log("avg_prices : ", get_prices_month())

  const line_data = {
    labels,
    datasets: [
      {
        label: "Number of reviews",
        data: reviewsMonth,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y_review",
      },
      {
        label: "Average price",
        data: pricesMonth,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y_price",
      },
    ],
  };

  ////// polar area chart
  function get_availabilities() {
    const array_nbh = [
      "Brooklyn",
      "Manhattan",
      "Queens",
      "Staten Island",
      "Bronx",
    ];

    let avg_availabilities = [];

    let availabilitiesByNbh = d3
      .rollups(
        data, //.filter((el)=>{return el.month!=""}), //input array
        (xs) => d3.sum(xs, (x) => x.availability_365), //reducing fct
        (d) => d.neighbourhood_group // grouping fct
      )
      .map(([k, v]) => ({ neighbourhood_group: k, availabilities: v })) //d3.group(data, d => d.month)
      .sort((el) => el.neighbourhood_group);

    let countByNbh = d3.rollup(
      data, //.filter((el)=>{return el.neighbourhood_group!=""}), //input array,
      (v) => v.length,
      (d) => d.neighbourhood_group
    ); //d3.group(data, d => d.month)
    //console.log("--- : ", pricesByMonth.filter((e)=>e.month=="10")[0].price)

    for (const n of array_nbh) {
      let tmp = availabilitiesByNbh.filter((e) => e.neighbourhood_group == n);
      //console.log("---- : ",tmp && tmp[0])
      if (tmp && tmp[0]) {
        avg_availabilities.push(
          parseInt(tmp[0].availabilities) / parseInt(countByNbh.get(n))
        );
      } else {
        avg_availabilities.push(0);
      }
    }
    //console.log("avg_prices : ", avg_prices)
    return avg_availabilities;
  }

  const [availabilities, setAvailabilities] = useState(get_availabilities());

  const polar_data = {
    labels: ["Brooklyn", "Manhattan", "Queens", "Staten Island", "Bronx"],
    datasets: [
      {
        label: "Average availability / 365 days",
        data: availabilities,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="Tourism">
      <ResponsiveAppBar />
      <Grid container spacing={5}>
        <Grid item xs={8}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: "23%",
                height: 90,
              },
            }}
          >
            <Paper
              onClick={() => handleChangeRoomtype("Entire home/apt")} ////////////
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              elevation={5}
            >
              {nb_entire_home_apt(data)}
              <div>Entire home/apt</div>
            </Paper>
            <Paper
              onClick={() => handleChangeRoomtype("Private room")}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              elevation={5}
            >
              {nb_private_room(data)}
              <div>Private room</div>
            </Paper>
            <Paper
              onClick={() => handleChangeRoomtype("Shared room")}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              elevation={5}
            >
              {nb_shared_room(data)}
              <div>Shared room</div>
            </Paper>
            <Paper
              onClick={() => handleChangeRoomtype(null)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              elevation={5}
            >
              {nb_total_houses(data)}
              <div>Total number of houses</div>
            </Paper>
          </Box>

          <Map data={data} position={[40.71546, -73.87854]} />

          <Box
            sx={{
              width: "100%",
              height: "50",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
              <p>Prices per neighbourhood</p>
                <InteractBarChart />
                
              </Grid>
              <Grid item xs={8}>
              <Line options={line_options} data={line_data} height={"100"} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2>Price range</h2>
            <Slider
              sx={{ width: "90%" }}
              getAriaLabel={() => "Price range"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />
            <br />
            <Bar options={bar_options} data={bar_data} height={"150"} />
            <br /> <p>Average availability days/365 per neighbourhood group</p>
            <Box
              sx={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <PolarArea data={polar_data} height={"50"} width={"100"} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
