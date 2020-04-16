import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Auth from "./components/Auth/Auth";
import Sitebar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./components/Home/Home";
import MyAccount from "./components/User/MyAccount";

import { Container } from "@material-ui/core";

import "./App.css";

type AppProps = {};
type AppState = {
  sessionToken: any;
  signedIn: boolean;
  userId: number | null;
  userName: string | null;
};

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      sessionToken: "",
      signedIn: false,
      userId: null,
      userName: null,
    };
  }
  getUserId = () => {
    if (this.state.signedIn) {
      return this.state.userId;
    } else {
      return null;
    }
  };
  componentDidMount() {
    if (localStorage.getItem("token") !== null) {
      this.setState({
        signedIn: true,
        sessionToken: localStorage.getItem("token"),
      });
    } else {
      this.clearToken();
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
          <Container fixed maxWidth='sm' className="mainContent">
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
                <MyAccount
                  signedIn={this.state.signedIn}
                  clearToken={this.clearToken}
                />
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
