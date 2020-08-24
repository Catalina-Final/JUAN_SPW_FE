import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Routes from "./containers/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import PublicNavbar from "./containers/PublicNavbar";

function App() {
  return (
    <div className="App">
      <Router>
        <PublicNavbar />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
