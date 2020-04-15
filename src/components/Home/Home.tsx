import React from "react";
// import Comments from "../Comments/Comments";
// import Locations from "../Locations/Locations";
import LocationList from "../LocationList/LocationList";

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
        <div className="locations">
          <h3>Retail Locations Close to You</h3>
          <LocationList />
        </div>
      </div>
    );
  }
}

export default Home;
