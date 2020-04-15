import React, { Component } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
  List,
  CircularProgress,
} from "@material-ui/core";
// import PlacesMapper from "../PlacesMapper/PlacesMapper";
import { GeolocatedProps, geolocated } from "react-geolocated"; // this is what gets the Lat/Long
import APIURL from "../../helpers/environments";
import PlacesMapper from '../PlacesMapper/PlacesMapper'



let APIkey = "AIzaSyDaHf49sjmm-90iUkBQpHv6I2O4kwJ_i9o";
let BaseURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
let url;



let apiurl: string = APIURL;

interface ILocListState {
  nearbyTPSellers: any;
  latitude: any;
  longitude: any;
  fetchComplete: boolean;
  isFetching: Boolean,

}

class LocationList extends React.Component<GeolocatedProps, ILocListState> {
  constructor(props: GeolocatedProps) {
    super(props);
    this.state = {
      nearbyTPSellers: [],
      latitude: null,
      longitude: null,
      fetchComplete: false,
      isFetching: true

    };
  }



  componentDidUpdate() {
    console.log("LocationList this.state: ", this.state)
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
        this.continueProcessing(
          this.props.coords?.latitude,
          this.props.coords?.longitude
        );
      }
    }
  }

    continueProcessing = (lat: any, long: any): any => {
      console.log('lat, long : ', lat, long)
        let location = `${lat},${long}`
        const proxyurl = "https://strawberry-crumble-15669.herokuapp.com/"
    
        url = `${BaseURL}?location=${location}&radius=1609&type=convenience_store|department_store|drugstore|gas_station|grocery_or_supermarket|hardware_store|home_goods_store|pharmacy|shopping_mall|store|supermarket&key=${APIkey}`
    
        fetch(proxyurl + url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({isFetching: false})
    
            this.setState({
                nearbyTPSellers: data.results,
            });
        })
        .catch(err => console.log(err))
    }
    


render(): JSX.Element {

  const {isFetching} = this.state;
  console.log(isFetching)
 
  return (
      <>
      { isFetching ? 
      <div>
          Loading...
      </div> : 
      <div>
      <List>
          {/* <h2>{this.state.nearbyTPSellers}</h2> */}
          <PlacesMapper nearbyTPSellers={this.state.nearbyTPSellers} />
      </List>
      </div>}

      </>
  );

}
}

export default geolocated()(LocationList);
