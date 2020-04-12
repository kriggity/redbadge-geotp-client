import React from "react";
import Auth from "./components/Auth/Auth";
import Sitebar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LocationList from './components/LocationList/LocationList'


import Container from '@material-ui/core/Container';

import "./App.css";

let latitude: number = 39.9122681
let longitude: number = -86.1355665

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <Sitebar />
      <Auth />
      <LocationList latitude={latitude} longitude={longitude} />

      {/* <Container fixed>Main</Container> */}
      <Footer />
    </div>
  );
}

export default App;
