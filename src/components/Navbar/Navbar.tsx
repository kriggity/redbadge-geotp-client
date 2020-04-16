import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

type SiteBarProps = {
  clearToken: any;
  signedIn: boolean;
};
type SiteBarState = {
  open: boolean;
  direction: boolean;
  signedIn: boolean;
};

class SiteBar extends React.Component<SiteBarProps, SiteBarState> {
  constructor(props: SiteBarProps) {
    super(props);
    this.state = {
      open: false,
      direction: false,
      signedIn: false,
    };
  }
  handleDrawerOpen = () => {
    this.setState({
      open: true,
      signedIn: this.props.signedIn,
    });
  };
  handleDrawerClose = () => {
    this.setState({
      open: false,
    });
  };
  navLinks = () => {
    if (!this.props.signedIn) {
      return (
        <>
          <ListItem button>
            <ListItemText>
              <Link className="navLink" to="/signin">
                Sign In
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
              <Link className="navLink" to="/createaccount">
                Create Account
              </Link>
            </ListItemText>
          </ListItem>
        </>
      );
    } else {
      return (
        <>
          <ListItem button>
            <ListItemText>
              <Link className="navLink" to="/myaccount">
                My Account
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
              <Link className="navLink" to="/" onClick={this.props.clearToken}>
                Sign Out
              </Link>
            </ListItemText>
          </ListItem>
        </>
      );
    }
  };
  render() {
    return (
      <>
        <AppBar position="relative" color="transparent">
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography noWrap align="center">
              <Link to="/" className="brand" color="primary">
                GeoTP
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="persistent" anchor="left" open={this.state.open}>
          <div>
            <IconButton onClick={this.handleDrawerClose}>
              {this.state.direction ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List className="navList">{this.navLinks()}</List>
        </Drawer>
      </>
    );
  }
}

export default SiteBar;
