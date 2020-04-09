import React, { Component } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'


// const PlacesMapper = props => {
// export default PlacesMapper;


export default class PlacesMapper extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            nearbyTPSellers: props.nearbyTPSellers
        }
    }

    // if(props.firstRender) { 

    //     return null;
    // }
    // let placesMapper = placesArray => placesArray.map((place, index) => {
    // let placesMapper = placesArray.map((place, index) => {
        render() {

            console.log("in render of PlacesMapper with props:")

            console.log(this.props)
        

            return (
            <div>
                {console.log("in the return of PlacesMapper")}
                {console.log(this.props.nearbyTPSellers[0])}
                {this.props.nearbyTPSellers.map((place, index) => (
                    <ListItem key={index}>
                        <ListItemText>
                            {console.log("place.name ", place.name)}
                            {console.log("place.id ", place.id)}
                            <a 
                                href={`//www.google.com/maps/search/?api=1&query=${place.geometry.location.lat},${place.geometry.location.lng}`} target="_blank" rel="noreferrer noopener">
                                {place.name}<br/>{place.vicinity}
                            </a>
                        </ListItemText>
                        <ListItemText>
                            <ToggleSwitch id={place.id}/>
                        </ListItemText>
                    </ListItem>
                ))}
            </div>
            )
        }
}
