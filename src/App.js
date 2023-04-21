import "./css/App.css";
import React from "react";
import Main from "./views/Main";
import { BrowserRouter } from "react-router-dom";

// creating data as context
//import DATA from "./data/df_with_months.json"; //"./data/json_airbnb";
//const data = DATA.data//.slice(0, 10000); //array ////////////////// to update
//export const DataContext = React.createContext(data);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/*<DataContext.Provider value={data}>*/}
        <Main />
        {/*</DataContext.Provider>*/}
      </BrowserRouter>
    </div>
  );
}

export default App;
