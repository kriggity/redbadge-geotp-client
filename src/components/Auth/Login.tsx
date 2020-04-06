import React from "react";
import { TextField, Button } from "@material-ui/core";
import APIURL from "../../helpers/environments";

type AcceptedProps = {
  title: string;
};
type LoginState = {
  email: string;
  password: string;
};
let apiurl: string = APIURL;

class Login extends React.Component<AcceptedProps, LoginState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = (event: any): void => {
    event.preventDefault();

    fetch(apiurl + "/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
        },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  render() {
    return (
      <>
        <h2>{this.props.title}</h2>
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <Button type="reset">Clear Form</Button>
          <Button color="primary" type="submit">
            Sign In
          </Button>
        </form>
      </>
    );
  }
}

export default Login;
