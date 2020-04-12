import React from "react";
import { Link } from "react-router-dom";

type SiteBarProps = {
  clearToken: any;
  signedIn: boolean;
};
type SiteBarState = {
  // signedIn: boolean;
};

class SiteBar extends React.Component<SiteBarProps, SiteBarState> {
  constructor(props: SiteBarProps) {
    super(props);
    this.state = {
      // signedIn: this.props.signedIn,
    };
  }
  render() {
    return (
      <>
        <header className="App-header">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {!this.props.signedIn ? (
              <>
                <li>
                  <Link to="/signin">Sign In</Link>
                </li>
                <li>
                  <Link to="/createaccount">Create Account</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/myaccount">My Account</Link>
                </li>
                <li>
                  <Link to="/" onClick={this.props.clearToken}>
                    Sign Out
                  </Link>
                </li>
              </>
            )}
          </ul>
        </header>
      </>
    );
  }
}

export default SiteBar;
