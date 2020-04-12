import * as React from "react";
// import * as PropTypes from "prop-types";
import {
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ValidateEmail from "../Utilities/ValidateEmail";
import APIURL from "../../helpers/environments";
import "./MyAccount.css";

interface IMyAccountProps {
  // userId: number | null;
  signedIn: boolean;
  clearToken: any;
}
interface IMyAccountState {
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

  signedIn: boolean;
  sessionToken: any;
  userId: any;

  disabled: boolean;
  open: boolean;
  delOpen: boolean;
  delMessage: string;
  delConfirm: boolean;
}

let apiurl: string = APIURL;

class MyAccount extends React.Component<IMyAccountProps, IMyAccountState> {
  constructor(props: IMyAccountProps) {
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
      passwordErrorText: "Please enter your password to save any changes.",

      signedIn: false,
      sessionToken: localStorage.getItem("token"),
      userId: localStorage.getItem("id"),

      disabled: true, // Form Submit Button
      open: false, // Save Confirmation Modal

      delOpen: false, // Delete Confirmation Modal
      delMessage: "Are you certain you want to delete this account?",
      delConfirm: false,
    };
  }
  componentWillMount() {}
  componentDidMount() {
    if (this.state.sessionToken) {
      this.fetchUser();
    }
  }
  componentDidUpdate(
    prevProps: IMyAccountProps,
    prevState: IMyAccountState
  ): void {
    if (prevState.signedIn !== this.props.signedIn) {
      this.setState({
        signedIn: this.props.signedIn,
      });
    }
  }

  fetchUser = (): void => {
    // if (this.state.signedIn) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", this.state.sessionToken);

    let requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${apiurl}/api/users/${this.state.userId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          fullname: result.fullname,
          email: result.email,
          // password not needed here
        });
      })
      .catch((error) => console.log("error", error));
    // }
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
      passwordErrorText: "Please enter your password to save any changes.",
    });
  };
  handleChange = (event: any) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    } as IMyAccountState); // needs 'as MyAccountState' to actually work

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
        passwordErrorText: "Please enter your password to save any changes.",
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
      /****
       * Update the DB
       *****/
      // TODO: Verify this.state.email does not already exist in the DB

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", this.state.sessionToken);

      let raw: any = JSON.stringify({
        user: {
          fullname: this.state.fullname,
          email: this.state.email,
          password: this.state.password,
        },
      });

      let requestOptions: any = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      // console.log(requestOptions);
      fetch(`${apiurl}/api/users/${this.state.userId}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          this.handleOpen();
        })
        .catch((error) => console.log("error", error));
    }
  };
  /*
   * Delete Functionality
   */
  delHandleOpen = (): void => {
    this.setState({
      delOpen: true,
    });
  };
  delHandleSubmit = (event: any): void => {
    event.preventDefault();

    // Send userId to DELETE endpoint
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", this.state.sessionToken);

    let requestOptions: any = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${apiurl}/api/users/delete/${this.state.userId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        // Change the modal text and confirmation flag
        this.setState({
          delMessage: "Your account has been deleted.",
          delConfirm: true,
        });
      })
      .catch((error) => console.log("error", error));
  };
  delHandleClose = (event: any): void => {
    event.preventDefault();
    // If this is the second stage of the modal after the account has been deleted, clear the localStorage so the recently deleted data isn't present
    if (this.state.delConfirm) {
      this.props.clearToken();
    }
    this.setState({
      delOpen: false,
      delConfirm: false,
    });
  };
  delButtons = () => {
    if (this.state.delConfirm) {
      // The account has already been deleted. Just close the modal.
      return (
        <>
          <Button onClick={this.delHandleClose}>Close</Button>
        </>
      );
    } else {
      // This initial modal buttons
      return (
        <>
          <Button onClick={this.delHandleClose}>No</Button>
          <Button onClick={this.delHandleSubmit}>Yes</Button>
        </>
      );
    }
  };

  /******************
   * Render the Page
   ******************/
  render(): JSX.Element {
    if (!this.props.signedIn) {
      return (
        <div className="myAccount">
          <h3>
            Please <Link to="/signin">Sign In</Link> to edit your account.
          </h3>
        </div>
      );
    } else {
      return (
        <div className="myAccount">
          <CardHeader title="My Account" />
          <form onSubmit={this.handleSubmit}>
            <CardContent>
              <TextField
                id="fullname"
                name="fullname"
                label="Full Name"
                type="text"
                fullWidth
                value={this.state.fullname}
                onBlur={this.handleChange}
                onChange={this.handleChange}
              />
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                required
                fullWidth
                error={this.state.emailError}
                value={this.state.email}
                onBlur={this.handleChange}
                onChange={this.handleChange}
                helperText={this.state.emailErrorText}
              />
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                required
                fullWidth
                error={this.state.passwordError}
                value={this.state.password}
                onBlur={this.handleChange}
                onChange={this.handleChange}
                helperText={this.state.passwordErrorText}
              />
            </CardContent>
            <CardActions>
              {/* <Button type="reset">Clear Form</Button> */}
              <Button
                type="submit"
                color="primary"
                disabled={this.state.disabled}
              >
                Update Account Information
              </Button>
              <Button color="secondary" onClick={this.delHandleOpen}>
                Delete Account
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
              <DialogContentText>Successfully Updated</DialogContentText>
              <DialogActions>
                <Button onClick={this.handleClose}>Close</Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
          <Dialog
            open={this.state.delOpen}
            onClose={this.delHandleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <DialogContent>
              <DialogContentText>{this.state.delMessage}</DialogContentText>
              <DialogActions>{this.delButtons()}</DialogActions>
            </DialogContent>
          </Dialog>
        </div>
      );
    }
  }
}

export default MyAccount;
