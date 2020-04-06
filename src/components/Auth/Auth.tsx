import React from "react";
import Login from "./Login";
import Register from "./Register";
import { Card, CardContent, Link } from "@material-ui/core";
import "./Auth.css";

type AuthProps = {};
type AuthState = {
  showLogin: boolean;
};

class Auth extends React.Component<AuthProps, AuthState> {
  constructor(props: AuthProps) {
    super(props);
    this.state = {
      showLogin: true,
    };
    this.toggleLogin = this.toggleLogin.bind(this);
  }
  toggleLogin = () => {
    this.setState({ showLogin: !this.state.showLogin });
  };
  render() {
    return (
      <div className="Auth">
        <Card>
          <CardContent>
            {this.state.showLogin ? (
              <Login title="Sign In" />
            ) : (
              <Register title="Register" />
            )}
            <div>
              <Link onClick={this.toggleLogin}>
                {this.state.showLogin ? "Create Account" : "Sign In"}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Auth;
