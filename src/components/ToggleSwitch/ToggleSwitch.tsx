import React, { Component } from "react";
import Switch from "react-switch";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import './ToggleSwitch.css'
import CreateLocationStatus from '../Modal/CreateLocationStatus'

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
  showModalSwitch: boolean,
  sessionToken: any

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
      showModalSwitch: false,
      sessionToken: localStorage.getItem('token')
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveStatus = this.saveStatus.bind(this);
  }

  // When we want to display the modal, set the showModalSwitch to true. The if/else in the render will select the return for the modal and display the modal
  showModal = () => {
    this.setState({ showModalSwitch: true });
  };

  // When we want to stop displaying the modal, set the showModalSwitch to false. The if/else in the render will select the return for the main display rather than the modal
  hideModal = () => {
    this.setState({ showModalSwitch: false });
  };

  // Put a toggle switch in the Create Location Status modal. Set 'checked' based on the selected position of the toggle switch
  modalToggle = (checked: boolean) => {
    this.setState({ checked });
    }
  /*
    Using the location's id as fetched from the Google Places API, fetch the record from locations table in our database.
    If there is no record in the table for this location id, set placeInDB to false
  */
  componentDidMount() {
    this.fetchLocationByID();
  }

  fetchLocationByID = (): any => {

        fetch(`http://localhost:3001/api/locations/${this.props.id}`, {
      method: 'GET',
      headers: new Headers ({
          'Content-Type': 'application/json',
      })
  }).then((res) => {
      return res.json(); 
  })
  .then((logData) => {
    // console.log("the fetch returned", logData);
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

  saveStatus(e:any) {
    e.preventDefault();
    // console.log("saveStatus state", id, name, checked)
    console.log("saveStatus ", this.state)
    console.log("print me")

    let stringified:string = JSON.stringify(
      {
          googleid: this.state.id,
          name: this.state.name,
          status: this.state.checked,
          votecount: 0
      });
      console.log("stringified ",stringified)

    fetch('http://localhost:3001/api/locations/add', {
        method: 'POST',
        body: JSON.stringify(
            {
              "location": {
                "googleid": this.state.id,
                "name": this.state.name,
                "status": this.state.checked,
            }
          }),
        headers: new Headers ({
            'Content-Type': 'application/json',
            'Authorization': this.state.sessionToken
        })
    })    .then((res) => {
        return res.json(); 
    })

    this.hideModal();
    this.fetchLocationByID();

  }

  handleChange(checked: boolean) {
    this.setState({ checked });
  }
 
  render() {

    // buttonSwitch will hold the definition of the "No Status" button or the Toggle Switch
    let buttonSwitch: any;
    // showModalSwitch will get set to true when we're ready to show the modal connected with clicking the "No Status" button
    const showHideClassName = this.state.showModalSwitch ? "modal display-block" : "modal display-none";

    /* 
    In our return, we'll render a button based on the value of buttonSwitch  
    If this is a location a user has created a status for (it's in our location database table) (placeInDB is true), then set buttonSwitch to be a toggle switch which is on or off, based on the status in the location record.
    If this is not a location in our table, set buttonSwitch to be button which will launch our modal to create a new location status
    */
    this.state.placeInDB ? 
    // Toggle switch - when clicked, call handleChange
    buttonSwitch = <Switch onChange={this.handleChange} checked={this.state.checked} /> :

    // "No Status" button - when clicked, go to showModal to so the modal Return will be executed
    buttonSwitch = <button type="button" onClick={this.showModal}>No Status</button>

    if(this.state.showModalSwitch) {
      return(
        <div className={showHideClassName}>
        <section className="modal-main">
            <h2>Is there toilet paper?</h2>
            <br/>
            {this.props.name}<br/>{this.props.address}<br/>
            <h5>DOES NOT Have TP</h5><Switch onChange={this.modalToggle} checked={this.state.checked} /><h5>DOES Have TP</h5>
            <br/>
            <label>
                Comment:
                <input type="text" name="comment" />
            </label>
            <br/>
            <button onClick={this.hideModal}>close</button>
            <br/>
            <button onClick={this.saveStatus}>Save TP status?</button>
        </section>
        </div>
  
    )} else {
      return (
        <div>
          <label>
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
  
        </div>
        )  
    }
  }
}

export default ToggleSwitch;