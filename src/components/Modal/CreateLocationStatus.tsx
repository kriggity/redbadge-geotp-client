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
    checked: boolean

}


class CreateLocationStatus extends React.Component<ModalProps, ModalState> {
    
    constructor(props: ModalProps) {
        super(props);
        this.state = { 
            showModalSwitch: props.showModalSwitch,
            checked: props.checked
        };
        this.modalToggle = this.modalToggle.bind(this);
        
    }
            modalToggle(checked: boolean) {
                console.log("in handleChange, checked = ", checked)
                this.setState({ checked });
              }
            
    
    render() {
        const showHideClassName = this.props.showModalSwitch ? "modal display-block" : "modal display-none";
        return (
            <div className={showHideClassName}>
            <section className="modal-main">
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
                
            </section>
            </div>
    );
    };
}

export default CreateLocationStatus;