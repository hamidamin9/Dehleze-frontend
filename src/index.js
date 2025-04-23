import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./Components/Context/Context";
import AppContext from "./Components/Yasir/context/AppContext";
import FilterContext from "./Components/Yasir/context/FilterContext";
// import 'font-awesome/css/font-awesome.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
    <AppContext>
    <FilterContext>
      <App />
      </FilterContext>
      </AppContext>
    </UserProvider>
  </React.StrictMode>
);
reportWebVitals();
