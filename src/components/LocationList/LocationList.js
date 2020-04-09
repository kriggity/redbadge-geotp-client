import React, { Component } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PlacesMapper from '../PlacesMapper/PlacesMapper'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'
// import ThumbsUp from './ThumbsUp'

let APIkey = "AIzaSyDaHf49sjmm-90iUkBQpHv6I2O4kwJ_i9o";
let BaseURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
let url;

const fetchedPlaces = [
    {
        geometry: {
            location: {
                lat: 39.9128257,
                lng: -86.1331574
            },
            id: "803155afd6ab36d24de9b16f508b0ecb26dcab5d",
            name: "BP"
        }
    },
    {
        geometry: {
            location: {
                lat: 39.9120178,
                lng: -86.13350679999999
            },
            id: "23e5a9213966c482b029f8e0a7f6b72f5e62593e",
            name: "Walgreens"
        }
    },
    {
        geometry: {
            location: {
                lat: 39.9131351,
                lng: -86.1320994
            },
            id: "8e0f2942e1bf6cdbfb3621e35acac93460d430ec",
            name: "CVS"
        }
    }
]

export default class LocationList extends React.Component {
        
        constructor(props) {
            super(props)
            this.state = {
                latitude: props.coords.latitude,
                longitude: props.coords.longitude,
                // use nearbyTPSellers to track session statuses 
                // When it gets filled from the fetch, use the results[n].id to retrieve the switch status (a Boolean)
                // store the switch status in 
                nearbyTPSellers: [],
                isFetching: true
            }
    }
    
     componentDidMount() {

            console.log("inside componentDidMount for the fetch *************")
    //**** Skip the fetch & put places in nearbyTPSellers at beginning ******
            let location = `${this.state.latitude},${this.state.longitude}`
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

    // componentWillUnmount() {
    //     // PUT all the data from the placesStatus array into the places database table
    // }

      
    render() {
        console.log("in the render ******************")
        console.log(this.state)
        const {isFetching} = this.state;
       
        return (
            <>
            {console.log("in the return *********************")}
            { isFetching ? 
            <div>
                Loading...
            </div> : 
            <div>
            This is LocationList
            <List>
                <PlacesMapper nearbyTPSellers={this.state.nearbyTPSellers} />
            </List>
            </div>}

            </>
        );
    }
}

