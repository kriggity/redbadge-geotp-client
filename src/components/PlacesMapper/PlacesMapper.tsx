import * as React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

type MapperProps = {
  nearbyTPSellers: Array<any>;
};

type PlacesState = {};

class PlacesMapper extends React.Component<MapperProps, {}> {
  //   constructor(props: MapperProps) {
  // super(props);
  // this.state = {
  //     nearbyTPSellers: props.nearbyTPSellers
  // }
  //   }

  // locMapper = (arr: any): any => {
  //   if (arr !== "" || arr !== null || arr !== "undefined") {
  //     return Object.values(arr).map((loc?: any, idx?: number) => (
  //       <li key={idx}>{loc?.name}</li>
  //     ));
  //   } else {
  //     return (
  //       <>
  //         <p>No Nearby Retail Locations</p>
  //       </>
  //     );
  //   }
  // };

  render(): JSX.Element {
    return (
      <div>
        {this.props.nearbyTPSellers.map((place, index) => (
          <ListItem key={index}>
            <ListItemText>
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
              <ToggleSwitch id={place.id} name={place.name} />
            </ListItemText>
          </ListItem>
        ))}
      </div>
    );
  }
}

export default PlacesMapper;
