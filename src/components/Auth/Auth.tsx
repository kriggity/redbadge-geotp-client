import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import "./Auth.css";

type AuthProps = {
  loginProp: boolean;
  updateToken: any;
  signedIn: boolean;
  uName: string | null;
};
type AuthState = {
  showLogin: boolean;
};

class Auth extends React.Component<AuthProps, AuthState> {
  constructor(props: AuthProps) {
    super(props);
    this.state = {
      showLogin: this.props.loginProp,
    };
    this.toggleLogin = this.toggleLogin.bind(this);
  }
  toggleLogin = () => {
    this.setState({ showLogin: !this.state.showLogin });
  };
  render() {
    if (this.props.signedIn) {
      return (
        <div className="Auth">
          <Card>
            <CardContent>
              <h3>Welcome, {this.props.uName}.</h3>
              <Link to="/">Show me where the TP is!</Link>
            </CardContent>
          </Card>
        </div>
      );
    } else {
      return (
        <div className="Auth">
          <Card>
            <CardHeader
              title={this.state.showLogin ? "Sign In" : "Create Account"}
            />
            {this.state.showLogin ? (
              <Login updateToken={this.props.updateToken} />
            ) : (
              <Register updateToken={this.props.updateToken} />
            )}
            <CardActionArea onClick={this.toggleLogin}>
              <p>
                {this.state.showLogin
                  ? "Not a contributor? Create an Account"
                  : "Already a contributor? Sign In"}
              </p>
            </CardActionArea>
          </Card>
        </div>
      );
    }
  }
}

export default Auth;
