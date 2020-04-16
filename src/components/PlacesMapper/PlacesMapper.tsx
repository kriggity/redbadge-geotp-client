import React, { Component } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'
import Distance from "../Utilities/Distance";


type MapperProps = {
    nearbyTPSellers: Array<any>,
    lat: any,
    long: any
}

type PlacesState = {
    
}

class PlacesMapper extends React.Component<MapperProps , {}> {
    
    constructor(props: MapperProps) {
        super(props)
        this.state = {
            lat: this.props.lat,
            long: this.props.long
        //     nearbyTPSellers: props.nearbyTPSellers
        }
    }

        render() {
            console.log("in render of PlacesMapper with props:")
            console.log(this.props)

            return (
            <div>
                {console.log("in the return of PlacesMapper")}
                {this.props.nearbyTPSellers.map((place, index) => (
                    <ListItem key={index}>
                        <ListItemText>
                            {console.log("place.name ", place.name)}
                            {console.log("place.id ", place.id)}
                            <a 
                                href={`//www.google.com/maps/search/?api=1&query=${place.geometry.location.lat},${place.geometry.location.lng}`} target="_blank" rel="noreferrer noopener">
                                {place.name}<br/>{place.vicinity}
                            </a>
                            <p>
                                {Distance(
                                this.props.lat,
                                this.props.long,
                                place.geometry.location.lat,
                                place.geometry.location.lng,
                                "M"
                                )} away
                            </p>

                        </ListItemText>
                        <ListItemText>
                            <ToggleSwitch id={place.id} name={place.name} address={place.address} />
                        </ListItemText>
                    </ListItem>
                ))}
            </div>
            )
        }
}

export default PlacesMapper;