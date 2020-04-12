import React from "react";
import {
  CardContent,
  CardActions,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import ValidateEmail from "../Utilities/ValidateEmail";
import APIURL from "../../helpers/environments";
import "./Auth.css";

type RegisterProps = {
  updateToken: any;
};
type RegisterState = {
  fullname: string;
  fullnameValid: boolean;
  fullnameError: boolean;
  fullnameErrorText: string;
  email: string;
  emailValid: boolean;
  emailError: boolean;
  emailErrorText: string;
  password: string;
  passwordValid: boolean;
  passwordError: boolean;
  passwordErrorText: string;

  disabled: boolean;
  open: boolean;
};
let apiurl: string = APIURL;

class Register extends React.Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      fullname: "",
      fullnameValid: true,
      fullnameError: false,
      fullnameErrorText: "",
      email: "",
      emailValid: true,
      emailError: false,
      emailErrorText: "",
      password: "",
      passwordValid: true,
      passwordError: false,
      passwordErrorText: "",

      disabled: true, // Form Submit Button
      open: false, // Save Confirmation Modal
    };
  }
  clearForm = (event: any): void => {
    event.preventDefault();
    this.setState({
      fullname: "",
      fullnameValid: true,
      fullnameError: false,
      fullnameErrorText: "",
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
  handleOpen = (): void => {
    this.setState({
      open: true,
    });
  };
  handleClose = (event: any): void => {
    event.preventDefault();
    this.setState({
      open: false,
      disabled: true,
      password: "",
      passwordErrorText: "",
    });
  };
  handleChange = (event: any): void => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    } as RegisterState); // needs 'as MyAccountState' to actually work
    if (this.state.fullname === "") {
      this.setState({
        fullnameValid: false,
        fullnameError: true,
        fullnameErrorText: "Name required",
      });
    } else {
      this.setState({
        fullnameValid: true,
        fullnameError: false,
        fullnameErrorText: "",
      });
    }
    if (ValidateEmail(this.state.email) || this.state.email !== "") {
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
    } else {
      this.setState({
        passwordValid: false,
        passwordError: true,
        passwordErrorText: "Valid password required",
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
  handleSubmit = (event: any): void => {
    event.preventDefault();
    if (this.state.fullname === "") {
      this.setState({
        fullname: "Contributor",
      });
    }
    if (this.state.email === "" && this.state.password === "") {
      this.setState({
        emailError: true,
        emailErrorText: "Valid email address required",
        emailValid: false,
        passwordError: true,
        passwordErrorText: "Valid password address required",
        passwordValid: false,
      });
    } else if (this.state.email === "") {
      this.setState({
        emailError: true,
        emailErrorText: "Valid email address required",
        emailValid: false,
      });
    } else if (this.state.password === "") {
      this.setState({
        passwordError: true,
        passwordErrorText: "Valid password address required",
        passwordValid: false,
      });
    } else {
      // TODO: Verify this.state.email does not already exist in the DB
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
          this.props.updateToken(result.sessionToken, result.user.id, result.user.fullname);
          this.handleOpen();
        })
        .catch((error) => console.log("error", error));
    }
  };
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} id="register">
          <CardContent>
            <TextField
              id="fullname"
              name="fullname"
              label="Full Name"
              type="text"
              required
              fullWidth
              value={this.state.fullname}
              error={this.state.fullnameError}
              helperText={this.state.fullnameErrorText}
              onChange={this.handleChange}
              onBlur={this.handleChange}
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              required
              fullWidth
              value={this.state.email}
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
              required
              fullWidth
              value={this.state.password}
              error={this.state.passwordError}
              helperText={this.state.passwordErrorText}
              onChange={this.handleChange}
              onBlur={this.handleChange}
            />
          </CardContent>
          <CardActions>
            <Button onClick={this.clearForm} type="reset">
              Clear Form
            </Button>
            <Button
              type="submit"
              color="primary"
              disabled={this.state.disabled}
            >
              Create Account
            </Button>
          </CardActions>
        </form>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <DialogContent>
            <DialogContentText>Account Created</DialogContentText>
            <DialogActions>
              <Button onClick={this.handleClose}>Close</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default Register;
