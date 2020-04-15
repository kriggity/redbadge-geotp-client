import * as React from "react";
// import React, { Component, button } from "react";
import Switch from "react-switch";
import './ToggleSwitch.css'
// import ThumbsUp from '../ThumbsUpVote/ThumbsUp'

type ToggleProps = {
  id: string,
  name: string
}
 
type ToggleState = {
  checked: boolean,
  id: string,
  name: string,
  votecount: number,
  placeInDB: boolean
}
  type handleChange = () => Boolean;
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
     };
    this.handleChange = this.handleChange.bind(this);
    this.createStatus = this.createStatus.bind(this);

  }
 
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
  }   ).then((res) => {
      console.log("****** POST was successful ******")
      return res.json()
  })
  .then((logData) => {
      console.log("********** res.json successful - logData = ", logData);
  })
  }


  handleChange(checked: any) {
    console.log("in handleChange, id = ", this.state.id)
    this.setState({ checked });
  }
 
  render() {
    console.log("props : ", this.props)
  console.log("ID : ", this.props.id)
      let buttonSwitch: any;
    this.state.placeInDB ? 
    buttonSwitch = <Switch onChange={this.handleChange} checked={this.state.checked} /> :
    buttonSwitch = <button onClick={this.createStatus}>No Status</button>


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



      </div>
    );
  }
}

export default ToggleSwitch;