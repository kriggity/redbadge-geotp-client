import React from "react";
import { CardContent, CardActions, TextField, Button } from "@material-ui/core";
import APIURL from "../../helpers/environments";

type AcceptedProps = {
  updateToken: any;
};
type LoginState = {
  email: string;
  emailValid: boolean;
  emailError: boolean;
  emailErrorText: string;
  password: string;
  passwordValid: boolean;
  passwordError: boolean;
  passwordErrorText: string;

  disabled: boolean;
};
let apiurl: string = APIURL;

class Login extends React.Component<AcceptedProps, LoginState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      email: "",
      emailValid: false,
      emailError: false,
      emailErrorText: "",
      password: "",
      passwordValid: false,
      passwordError: false,
      passwordErrorText: "",

      disabled: true,
    };
  }

  clearForm = (event: any) => {
    event.preventDefault();
    this.setState({
      email: "",
      emailValid: false,
      emailError: false,
      emailErrorText: "",
      password: "",
      passwordValid: false,
      passwordError: false,
      passwordErrorText: "",

      disabled: true,
    });
  };

  ValidateEmail(mail: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  handleChange = (event: any) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    } as LoginState); // needs 'as LoginState' to actually work

    if (this.ValidateEmail(this.state.email)) {
      this.setState({
        emailValid: true,
        emailError: false,
        emailErrorText: "",
      });
    } else {
      this.setState({
        emailError: true,
        emailErrorText: "Valid email address required",
        emailValid: false,
      });
    }
    if (this.state.password !== "") {
      this.setState({
        passwordValid: true,
        passwordError: false,
        passwordErrorText: "",
      });
    }
    if (this.state.emailValid && this.state.passwordValid) {
      this.setState({
        disabled: false,
      });
    } else if (!this.state.emailValid || !this.state.passwordValid) {
      this.setState({
        disabled: true,
      });
    }
  };

  handleSubmit = (event: any) => {
    event.preventDefault();

    if (this.state.email === "") {
      this.setState({
        emailError: true,
        emailErrorText: "Valid email address required",
        emailValid: false,
      });
    }
    if (this.state.password === "") {
      this.setState({
        passwordError: true,
        passwordErrorText: "Valid password required",
        passwordValid: false,
      });
    }

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
      .then((result) => {
        let id: number = parseInt(result.user.id, 10);
        let userName: string = result.user.fullname;
        this.props.updateToken(result.sessionToken, id, userName);
      })
      .catch((error) => console.log("error", error));
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        <CardContent>
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            required
            error={this.state.emailError}
            helperText={this.state.emailErrorText}
            onChange={this.handleChange}
            onBlur={this.handleChange}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            required
            error={this.state.passwordError}
            helperText={this.state.passwordErrorText}
            onChange={this.handleChange}
            onBlur={this.handleChange}
          />
        </CardContent>
        <CardActions>
          <Button type="reset" onClick={this.clearForm}>
            Clear Form
          </Button>
          <Button color="primary" type="submit" disabled={this.state.disabled}>
            Sign In
          </Button>
        </CardActions>
      </form>
    );
  }
}

export default Login;
