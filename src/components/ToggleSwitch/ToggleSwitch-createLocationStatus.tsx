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
    // this.createStatus = this.createStatus.bind(this);

  }

  showModal = () => {
    this.setState({ showModalSwitch: true });
    console.log("showModal.............")
  };

  hideModal = () => {
    this.setState({ showModalSwitch: false });
  };

  modalToggle = (checked: boolean) => {
    console.log("in handleChange, checked = ", checked)
    this.setState({ checked });
    }
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


  // saveStatus(e:any, id:string, name:string, checked:boolean) {
  saveStatus(e:any) {
    e.preventDefault();
    // console.log("saveStatus state", id, name, checked)
    console.log("saveStatus ", this.state)
    console.log("print me")


/*
    const googleid:string = this.state.id;
    const name:string = this.state.name;
    const status:boolean = this.state.checked;

    let stringifyMe:object = {
      googleid: googleid,
      name: name,
      status: status,
      votecount: 0
    }
    let stringifiedObject:string = JSON.stringify(stringifyMe)
    console.log("stringifiedObject ", stringifiedObject)


    let stringified:string = JSON.stringify(googleid)
    console.log("stringified ",stringified)
*/

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
        // body: JSON.stringify(stringifyMe),
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
  //      }) .then((res:any) => {return res.text()})          // convert to plain text
  // .then((text:any) => console.log(text))  // then log it out
  /*
    .then((logData) => {
      console.log("the fetch returned", logData);
      if (logData === null) { 
          console.log("logData is null")
        // this.setState({ placeInDB: false}) 
      } else {
          console.log(`logData is ${logData}`)
        //   this.setState({ placeInDB: true});
        //   this.setState({votecount: logData.votecount})
        //   if(logData.status) {
        //     this.setState({checked: true}) 
        //   } else {
        //     this.setState({checked: false})
          }
        })
        .catch(err => console.log(err))
  */
    }



  // const handleSubmit = (e) => {
// Failed attempt at creating new location status ???????
/*
createStatus(e:any) {
      console.log("************* you're in createStatus ***************")
      console.log("googleid : ", this.state.id)
      console.log("name: ", this.state.name)
      e.preventDefault();

      fetch('http://localhost:3001/api/locations/add', {
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
*/

  handleChange(checked: boolean) {
    console.log("in handleChange, id = ", this.state.id)
    this.setState({ checked });
  }
 
  render() {
    console.log("props : ", this.props)
    console.log("ID : ", this.props.id)
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
    // buttonSwitch = <Link to="/createStatus">No Status</Link>
    // buttonSwitch = <button onClick={this.createStatus}>No Status</button>

    if(this.state.showModalSwitch) {
      return(
        <div className={showHideClassName}>
        <section className="modal-main">
            <h2>Is there toilet paper?</h2>
            <br/>
            {this.props.name}<br/>{this.props.address}<br/>
            <h5>DOES NOT Have TP</h5><Switch onChange={this.modalToggle} checked={this.state.checked} /><h5>DOES Have TP</h5>
            {/* <Switch onChange={this.props.handleChange(!this.state.checked)} checked={this.state.checked} /> */}
            <br/>
            <label>
                Comment:
                <input type="text" name="comment" />
            </label>
            <br/>
            <button onClick={this.hideModal}>close</button>
            <br/>
            <button onClick={this.saveStatus}>Save TP status?</button>
            {/* <button onClick={() => this.saveStatus(event, this.state.id, this.state.name, this.state.checked )}>Save TP status?</button> */}
        </section>
        </div>
  
    )} else {
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
  
          {/* <CreateLocationStatus id={this.props.id} name={this.props.name} address={this.props.address} showModalSwitch={this.state.showModalSwitch} handleClose={this.hideModal} handleChange={this.handleChange} checked={this.state.checked}/>
          {console.log(`CreateLocationStatus ${this.props.id} ${this.props.name} ${this.props.address} ${this.state.showModalSwitch} ${this.hideModal} ${this.handleChange} ${this.state.checked}` )} */}
        </div>
        )  
    }
  }
}

export default ToggleSwitch;