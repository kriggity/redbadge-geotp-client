import React, { Component } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

type MapperProps = {
  nearbyTPSellers: Array<any>,
};

type PlacesState = {};

class PlacesMapper extends React.Component<MapperProps, {}> {
  constructor(props: MapperProps) {
    super(props);
    // this.state = {
    //     nearbyTPSellers: props.nearbyTPSellers
    // }
  }

  render() {
    // console.log("in render of PlacesMapper with props:");

    // console.log(this.props);

    return (
      <div>
        {/* {console.log("in the return of PlacesMapper")} */}
        {this.props.nearbyTPSellers.map((place, index) => (
          <ListItem key={index}>
            <ListItemText>
              {/* {console.log("place.name ", place.name)} */}
              {/* {console.log("place.id ", place.id)} */}
              <a
                href={`//www.google.com/maps/search/?api=1&query=${place.geometry.location.lat},${place.geometry.location.lng}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {place.name}
                <br />
                {place.vicinity}
              </a>
            </ListItemText>
            <ListItemText>
              <ToggleSwitch id={place.id} name={place.name} address={place.vicinity}/>
            </ListItemText>
          </ListItem>
        ))}
      </div>
    );
  }
}

export default PlacesMapper;
