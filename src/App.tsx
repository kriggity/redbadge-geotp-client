import React from "react";
import Auth from "./components/Auth/Auth";
import Sitebar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Container from '@material-ui/core/Container';

import "./App.css";

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <Sitebar />
      <Auth />
      <Container fixed>Main</Container>
      <Footer />
    </div>
  );
}

export default App;
