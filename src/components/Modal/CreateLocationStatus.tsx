import React, { Component } from 'react';
// import { observable } from 'mobx';
// import { observer } from 'mobx-react'
import Switch from "react-switch";
import './CreateLocationStatus.css'

type ModalProps = {
    id: string,
    name: string,
    address: string,
    showModalSwitch: any,
    handleClose: any,
    handleChange: any,
    checked: boolean
}

type ModalState = {
    showModalSwitch: boolean,
    checked: boolean,
    sessionToken: any
}

type handleChange = () => boolean;



class CreateLocationStatus extends React.Component<ModalProps, ModalState> {
    
    constructor(props: ModalProps) {
        super(props);
        this.state = { 
            showModalSwitch: props.showModalSwitch,
            checked: props.checked,
            sessionToken: localStorage.getItem('token')
        };
        // this.modalToggle = this.modalToggle.bind(this);
        
    }

    componentDidMount() {
        console.log("component did mount", this.props)
    }
    modalToggle = (checked: boolean) => {
        console.log("in handleChange, checked = ", checked)
        this.setState({ checked });
        }
       
    // const protectedViews = () => {
    // protectedViews = () => {
    //     console.log("************ in protectedViews - if sessionToken === token in localStorge, call DisplayContainers to get jar contents. Else call Auth to login *******")
    //     // console.log("sessionToken: ", sessionToken);
    //     console.log("localStorage token: ", localStorage.getItem('token'));
    //     this.setState({sessionToken: localStorage.getItem('token')})

        // return (
        //     sessionToken === localStorage.getItem('token') ? 
        //     <DisplayContainers token={sessionToken}/> : 
        //     <Auth updateToken={updateToken}/>
        //     )
        // }
        
    saveStatus( paramProps:any) {
        //e.preventDefault();
        // this.setState({sessionToken: localStorage.getItem('token')})
        // console.log("localStorage token: ", localStorage.getItem('token'));

        // get the token from local storage
        // confirm add --> alert (?)
        // create a location record ==> POST
        //console.log("you're in saveStatus")
        //console.log("localStorage ", localStorage.getItem('token'))
        // let sessionTokenVar:string |null = localStorage.getItem('token')
        // if(localStorage.getItem('token')) {
        //     console.log(`localStorage token was there, ${this.state.sessionToken}`)
        //     this.setState({sessionToken: sessionTokenVar})
        // }
        // if(sessionTokenVar) {
        //     this.setState({sessionToken: sessionTokenVar})
        //     console.log(`sessionTokenVar was there, ${this.state.sessionToken}`)
        // }
        // console.log(`this.state.sessionToken ${this.state.sessionToken}`)
        // if(this.state.sessionToken) {

        console.log('paramProps', paramProps);


        /*
        fetch('http://localhost:3001/api/locations/add', {
            method: 'POST',
            body: JSON.stringify(
                {
                    googleid: this.props.id,
                    name: this.props.name,
                    status: this.state.checked,
                    votecount: 0
                }),
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.state.sessionToken
            })
        }).then((res) => {
            return res.json(); 
        })
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
        // }
        */
    }

    
    render() {
        console.log(this.props)
        const showHideClassName = this.props.showModalSwitch ? "modal display-block" : "modal display-none";
        return (
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
                <button onClick={this.props.handleClose}>close</button>
                <br/>
                <button onClick={() => this.saveStatus(this.props)}>Save TP status?</button>
                
            </section>
            </div>
    );
    };
}

export default CreateLocationStatus;