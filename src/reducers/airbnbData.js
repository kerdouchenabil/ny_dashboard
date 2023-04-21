import { AIRBNB_PRICE_FILTER } from "../constants";
import DATA from "../data/df_with_months.json";

const DATA_SLICE = DATA.data.slice(0, 2000);

/*
export default function reducer(data = {data:DATA_SLICE, filter:{}}, action) {
  //DATA.data//.slice(0, 10000); //array
  const { type, payload } = action;
  switch (type) {
    case AIRBNB_PRICE_FILTER:
      const newv = payload.sort(); //payload : [a,b]
      return DATA_SLICE.filter((el) => {
        return el.price >= newv[0] && el.price <= newv[1];
      });

    default:
      return data;
  }
}
*/

export default function reducer(data = DATA_SLICE, action) {
  //DATA.data//.slice(0, 10000); //array
  const { type, payload } = action;
  switch (type) {
    case AIRBNB_PRICE_FILTER:
      const newv = payload["price"].sort(); //payload : [a,b]
      var newdata = DATA_SLICE

      if(payload["roomtype"]){
        newdata = newdata.filter((el) => {
          return el.room_type == payload["roomtype"];
        });
      }

      if( ! payload["roomtype"]){ // return total number of houses
        newdata = DATA_SLICE
      }

      //price
      newdata = newdata.filter((el) => {
        return el.price >= newv[0] && el.price <= newv[1];
      });

      return newdata
    default:
      return data;
  }
}
