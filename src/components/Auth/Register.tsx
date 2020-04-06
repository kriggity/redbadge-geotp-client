import React from "react";
import { TextField, Button } from "@material-ui/core";
import APIURL from "../../helpers/environments";

type AcceptedProps = {
  title: string;
};
type RegisterState = {
  fullname: string;
  email: string;
  password: string;
};
let apiurl: string = APIURL;

class Register extends React.Component<AcceptedProps, RegisterState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      password: "",
    };
  }
  handleSubmit = (event: any): void => {
    event.preventDefault();

    fetch(apiurl + "/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          fullname: this.state.fullname,
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
            id="fullname"
            name="fullname"
            label="Full Name"
            type="text"
            fullWidth
            onChange={(e) => this.setState({ fullname: e.target.value })}
          />
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
          <Button type="submit" color="primary">
            Create Account
          </Button>
        </form>
      </>
    );
  }
}

export default Register;
