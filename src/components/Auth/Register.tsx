import React from "react";
import { CardContent, CardActions, TextField, Button } from "@material-ui/core";
import APIURL from "../../helpers/environments";

type AcceptedProps = {
  updateToken: any;
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

    if (this.state.email !== "" && this.state.password !== "") {
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
        .then((result) => {
          // console.log(result);
          this.props.updateToken(result.sessionToken, result.user.id);
        })
        .catch((error) => console.log("error", error));
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardContent>
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
            required
            fullWidth
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            required
            fullWidth
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </CardContent>
        <CardActions>
          <Button type="reset">Clear Form</Button>
          <Button type="submit" color="primary">
            Create Account
          </Button>
        </CardActions>
      </form>
    );
  }
}

export default Register;
