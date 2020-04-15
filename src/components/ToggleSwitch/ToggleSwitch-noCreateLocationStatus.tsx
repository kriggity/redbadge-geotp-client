import React, { Component } from "react";
// import React, { Component, button } from "react";
import Switch from "react-switch";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import './ToggleSwitch.css'
import CreateLocationStatus from '../Modal/CreateLocationStatus'
// import ThumbsUp from '../ThumbsUpVote/ThumbsUp'

type ToggleProps = {
  id: string,
  name: string,
  address: string
}
 
type ToggleState = {
  checked: boolean,
  id: string,
  name: string,
  votecount: number,
  placeInDB: boolean,
  showModalSwitch: boolean
}
  type handleChange = () => boolean;
  type createStatus = () => any;


class ToggleSwitch extends React.Component<ToggleProps, ToggleState> {
  constructor(props: ToggleProps) {
    super(props);
    this.state = { 
      checked: false,
      id: props.id,
      name: props.name,
      votecount: 0,
      placeInDB: false,
      showModalSwitch: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.createStatus = this.createStatus.bind(this);

  }

  showModal = () => {
    this.setState({ showModalSwitch: true });
  };

  hideModal = () => {
    this.setState({ showModalSwitch: false });
  };
 
  /*
    Using the location's id as fetched from the Google Places API, fetch the record from locations table in our database.
    If there is no record in the table for this location id, set placeInDB to false
  */
  componentDidMount() {
    fetch(`http://localhost:3001/api/locations/${this.props.id}`, {
      method: 'GET',
      headers: new Headers ({
          'Content-Type': 'application/json',
          // 'Authorization': props.token
      })
  }).then((res) => {
      return res.json(); 
  })
  .then((logData) => {
    console.log("the fetch returned", logData);
    if (logData === null) { 
      this.setState({ placeInDB: false}) 
    } else {
        this.setState({ placeInDB: true});
        this.setState({votecount: logData.votecount})
        if(logData.status) {
          this.setState({checked: true}) 
        } else {
          this.setState({checked: false})
        }
      }
  })
  .catch(err => console.log(err))
  }

  // const handleSubmit = (e) => {

  createStatus(e:any) {
      console.log("************* you're in createStatus ***************")
      console.log("googleid : ", this.state.id)
      console.log("name: ", this.state.name)
      e.preventDefault();

      fetch('http://localhost:3001/api/locations/add', {
      // fetch(`${APIURL}/api/jar/`, {   // calls localhost or heroku server based on APIURL which is set in helpers/environment.js
      method: 'POST',
      body: JSON.stringify(
          {
            googleid: this.state.id,
            name: this.state.name,
            status: true,
            votecount: 1
        
          }
      ),
      headers: new Headers({
          'Content-Type': 'application/json',
          // 'Authorization': props.token
      })
  }   ) .then((res) => {
      console.log("****** POST was successful ******")
      return res.json()
  })
  .then((logData) => {
      console.log("********** res.json successful - logData = ", logData);
  })
  }


  handleChange(checked: boolean) {
    console.log("in handleChange, id = ", this.state.id)
    this.setState({ checked });
  }
 
  render() {
    console.log("props : ", this.props)
  console.log("ID : ", this.props.id)
      let buttonSwitch: any;

    /* 
    In our return, we'll render a button based on the value of buttonSwitch  
    If this is a location a user has created a status for (it's in our location database table) (placeInDB is true), then set buttonSwitch to be a toggle switch which is on or off, based on the status in the location record.
    If this is not a location in our table, set buttonSwitch to be button which will launch our modal to create a new location status
    */
    this.state.placeInDB ? 
    buttonSwitch = <Switch onChange={this.handleChange} checked={this.state.checked} /> :
    buttonSwitch = <button type="button" onClick={this.showModal}>No Status</button>
    // buttonSwitch = <Link to="/createStatus">No Status</Link>
    // buttonSwitch = <button onClick={this.createStatus}>No Status</button>


    return (
      <div>
        <label>
          {console.log("placeInDB is : ", this.state.placeInDB)}
          {console.log("button : ", buttonSwitch)}
          {buttonSwitch}
        </label>
        <br/>
        <label>
            <button>comments</button>
            {/* <ThumbsUp /> */}
            <button>thumbs up</button>
        </label>
        <br/>
            {/* need to fetch comment count from comment table */}
            <p>0     {this.state.votecount} </p> 

        <CreateLocationStatus id={this.props.id} name={this.props.name} address={this.props.address} showModalSwitch={this.state.showModalSwitch} handleClose={this.hideModal} handleChange={this.handleChange} checked={this.state.checked}/>
        {console.log(`CreateLocationStatus ${this.props.id} ${this.props.name} ${this.props.address} ${this.state.showModalSwitch} ${this.hideModal} ${this.handleChange} ${this.state.checked}` )}
      </div>
    );
  }
}

export default ToggleSwitch;