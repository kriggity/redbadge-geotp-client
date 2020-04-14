import React, { Component } from 'react';
// import { observable } from 'mobx';
// import { observer } from 'mobx-react'

type ModalProps = {
    id: string
    

}

type ModalState = {
    modalIsOpen: boolean

}
class CreateLocationStatus extends React.Component<ModalProps, ModalState> {
    constructor(props: ModalProps) {
        super(props);
        this.state = { 
          modalIsOpen: false
         };
        }
    
    createStatus(e:any) {
       if(e) { e.preventDefault();}
       this.setState({modalIsOpen: true}) 

    }
      
    render() {
        return(
            <div id='modal'>
                <h1>Add a Location createLocationStatus</h1>
0\
            </div>
        )
    }
}

export default CreateLocationStatus;