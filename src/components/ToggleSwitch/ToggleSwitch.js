import React, { Component, button } from "react";
// import { Button } from 'reactstrap';
import Switch from "react-switch";
import './ToggleSwitch.css'
 
// let button; 

export default class ToggleSwitch extends Component {
  constructor(props) {
    super();
    this.state = { 
      checked: false,
      id: props.id,
      votecount: 0,
      placeInDB: false,
      // button: ''
     };
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(checked) {
    console.log("in handleChange, id = ", this.state.id)
    this.setState({ checked });
  }
 
  render() {
    console.log("props : ", this.props)
  console.log("ID : ", this.props.id)
      let button;
    this.state.placeInDB ? 
    button = <Switch onChange={this.handleChange} checked={this.state.checked} /> :
    button = <button>No Status</button>


    return (
      <div>

        <label>
          {console.log("placeInDB is : ", this.state.placeInDB)}
          {console.log("button : ", button)}
          {button}
        </label>
        <br/>
        <label>
            <button>comments</button>
            <button>thumbs up</button>
        </label>
        <br/>
            {/* need to fetch comment count from comment table */}
            <p>0     {this.state.votecount} </p>



      </div>
    );
  }
}