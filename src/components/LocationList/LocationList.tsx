import * as React from "react";
import {
  List,
  //   ListItem,
  //   ListItemText,
  CircularProgress,
} from "@material-ui/core";
import PlacesMapper from "../PlacesMapper/PlacesMapper";
import { GeolocatedProps, geolocated } from "react-geolocated"; // this is what gets the Lat/Long
import APIURL from "../../helpers/environments";

let apiurl: string = APIURL;

// interface ILocListProps {
//   coords: {
//     latitude: string;
//     longitude: string;
//   };
//   isGeolocationAvailable: boolean; // boolean flag indicating that the browser supports the Geolocation API
//   isGeolocationEnabled: boolean;
// }

interface ILocListState {
  nearbyTPSellers: any;
  latitude: any;
  longitude: any;
  fetchComplete: boolean;
}

class LocationList extends React.Component<GeolocatedProps, ILocListState> {
  constructor(props: GeolocatedProps) {
    super(props);
    this.state = {
      nearbyTPSellers: [],
      latitude: null,
      longitude: null,
      fetchComplete: false,
    };
  }
  componentDidUpdate() {
    if (
      this.state.latitude !== this.props.coords?.latitude &&
      this.state.longitude !== this.props.coords?.longitude
    ) {
      this.setState({
        latitude: this.props.coords?.latitude,
        longitude: this.props.coords?.longitude,
      });
      if (
        this.props.coords?.latitude !== undefined &&
        this.props.coords?.longitude !== undefined
      ) {
        this.fetchList(
          this.props.coords?.latitude,
          this.props.coords?.longitude
        );
      }
    }
  }

  fetchList = (lat: any, long: any): any => {
    const myHeaders: any = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let url: string = `${apiurl}/googleapi/locations/${lat},${long}`;

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let data: any = JSON.parse(result);
        this.setState({
          nearbyTPSellers: data.results,
          fetchComplete: true,
        });
      })
      .catch((error) => console.log("error", error));
  };

  render(): JSX.Element {
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.state.fetchComplete ? (
      <div>
        <List>
          <PlacesMapper
            nearbyTPSellers={this.state.nearbyTPSellers}
            lat={this.state.latitude}
            long={this.state.longitude}
          />
        </List>
      </div>
    ) : (
      <div id="gettingData">
        <h4>Finding Locations...</h4>
        <CircularProgress />
      </div>
    );
  }
}

// export default LocationList;
export default geolocated()(LocationList);
