import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Auth from "./components/Auth/Auth";
import Sitebar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./components/Home/Home";
import MyAccount from "./components/User/MyAccount";

import { Container } from "@material-ui/core";

import "./App.css";

type AppProps = {
  // tokenProp: string | null;
};
type AppState = {
  sessionToken: string | null;
  signedIn: boolean;
  userId: number | null;
  userName: string | null;
};
// let newToken: string = "";

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      sessionToken: localStorage.getItem("token"),
      signedIn: false,
      userId: null,
      userName: null,
    };
  }
  componentDidMount() {
    if (
      this.state.sessionToken === "" ||
      this.state.sessionToken == null ||
      this.state.sessionToken === undefined
    ) {
      this.setState({
        signedIn: false,
        userId: null,
      });
    } else {
      this.setState({
        signedIn: true,
      });
    }
    let lsId: string | null = localStorage.getItem("id");
    let lsUname: string | null = localStorage.getItem("userName");
    if (lsId !== "" || lsId !== null || lsId !== undefined) {
      this.setState({
        userId: Number(lsId),
        userName: lsUname,
      });
    }
  }
  updateToken = (newToken: string, newId: string, newName: string) => {
    if (newToken !== undefined) {
      localStorage.setItem("token", newToken);
      this.setState({
        sessionToken: newToken,
        signedIn: true,
      });
    }
    if (newId !== undefined) {
      localStorage.setItem("id", newId);
      localStorage.setItem("userName", newName);
      this.setState({
        userId: Number(newId),
        userName: newName,
      });
    }
  };
  clearToken = () => {
    localStorage.clear();
    this.setState({
      sessionToken: "",
      signedIn: false,
      userId: null,
      userName: null,
    });
  };
  render() {
    return (
      <div className="App">
        <Router>
          <Sitebar
            clearToken={this.clearToken}
            signedIn={this.state.signedIn}
          />
          <Container fixed>
            <Switch>
              <Route exact path="/">
                <Home signedIn={this.state.signedIn} />
              </Route>
              <Route exact path="/signin">
                <Auth
                  loginProp={true}
                  updateToken={this.updateToken}
                  signedIn={this.state.signedIn}
                  uName={this.state.userName}
                />
              </Route>
              <Route exact path="/createaccount">
                <Auth
                  loginProp={false}
                  updateToken={this.updateToken}
                  signedIn={this.state.signedIn}
                  uName={this.state.userName}
                />
              </Route>
              <Route exact path="/myaccount">
                <MyAccount />
              </Route>
            </Switch>
          </Container>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
