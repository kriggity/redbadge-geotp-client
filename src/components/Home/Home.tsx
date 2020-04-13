import React from "react";
import Comments from "../Comments/Comments";
// import Locations from "../Locations/Locations";
import LocationList from "../LocationList/LocationList";

type HomeProps = {
  signedIn: boolean;
};
type HomeState = {};
let latitude: number = 39.9122681;
let longitude: number = -86.1355665;

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
          <LocationList latitude={latitude} longitude={longitude}/>
          {/* {this.props.signedIn ? (
            <>
              <ul>
                <li>Add Location</li>
                <li>Edit Location Status</li>
                <li>Confirm Thumbs Up</li>
              </ul>
            </>
          ) : (
            <></>
          )} */}
        </div>

        <div className="comments">
          <Comments />
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
