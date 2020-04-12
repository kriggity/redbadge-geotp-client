import React, { Component } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PlacesMapper from '../PlacesMapper/PlacesMapper'

let APIkey = "AIzaSyDaHf49sjmm-90iUkBQpHv6I2O4kwJ_i9o";
let BaseURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
let url;

type AcceptedProps = {
    latitude: number,
    longitude: number
}

type PlacesState = {
    nearbyTPSellers: Array<any>,
    isFetching: Boolean,
}
  

class LocationList extends React.Component<AcceptedProps, PlacesState> {
    constructor(props: AcceptedProps){
        super(props)
        this.state = {
            nearbyTPSellers: [],
            isFetching: true
        }
    }

    componentDidMount() {
        let location = `${this.props.latitude},${this.props.longitude}`
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


    render(){
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

export default LocationList;