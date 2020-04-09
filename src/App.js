import React from 'react';

// Components
import LocationList from './components/LocationList/LocationList'
// import Fetch from './components/Fetch/Fetch'


import './App.css';

export default class App extends React.Component {
  
  render() {

    let props = {coords: {
      latitude: 39.9122681,
      longitude: -86.1355665
    }}

    return (
      <div>
        <h3>
          App works
        </h3>

        <h2>
          {props.coords.latitude}
        </h2>
        {/* <LocationList props = {props} /> */}
        <LocationList {...props} />
        {/* <Fetch {...props} /> */}

      </div>
    )
    }   
}
