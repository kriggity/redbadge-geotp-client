import React from "react";

type HomeProps = {
  signedIn: boolean;
};
type HomeState = {};

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="Home">
        <h2>Home</h2>
        <div className="locations">
          <h3>Location List</h3>
          {this.props.signedIn ? (
            <>
              <ul>
                <li>Add Location</li>
                <li>Edit Location Status</li>
                <li>Confirm Thumbs Up</li>
              </ul>
            </>
          ) : (
            <></>
          )}
        </div>
        <p>Location List</p>
        <div className="comments">
          <h3>Comment List</h3>
          {!this.props.signedIn ? (
            <></>
          ) : (
            <>
              <ul>
                <li>Add Comment</li>
              </ul>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
