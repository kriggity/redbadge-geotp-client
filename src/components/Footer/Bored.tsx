import React from 'react';
import { Modal, Button } from 'antd';
import ReactDOM from 'react-dom'

// let url:string = 'http://www.boredapi.com/api/activity/';

type boredProps = {

}

type boredState = {
  loading: boolean,
  visible: boolean,
  activityObject: {
    activity: string,
    accessibility: number,
    type: string,
    participants: number,
    price: number,
    link: string,
    key: string,
}

}

class Bored extends React.Component<boredProps, boredState> {
  state = {
    loading: false,
    visible: false,
    activityObject: {
        accessibility: 0,
        activity: '',
        key: "",
        link: "",
        participants: 0,
        price: 0,
        type: "",
    }
  };

  // componentDidMount() {

  //   fetch(url)
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data.results)
  //       this.setState({
  //           activityObject: data.results,
  //       });
  //   })
  //   .catch(err => console.log(err))
  // }

  showModal = () => {
    this.setState({
       visible: true,
    });

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// var raw:string = "";

var requestOptions: any = {
  method: 'GET',
  headers: myHeaders,
  // body: raw,
  redirect: 'follow'
};

fetch("http://www.boredapi.com/api/activity/", requestOptions)
  // .then(response => response.text())
  // .then(result => console.log(result))
  // .catch(error => console.log('error', error));

    .then((response) => response.json())
    .then((result) => {
      // let data: any = JSON.parse(result);
      console.log("result", result)
      this.setState({
        activityObject: result,
      });
    });
    console.log("activityObject", this.state.activityObject)
  }




    //   const myHeaders: any = new Headers();
    //   myHeaders.append("Content-Type", "application/json");
  
    //   const requestOptions: any = {
    //     method: "GET",
    //     headers: myHeaders,
    //     redirect: "follow",
    //   };
  
    //   let url: string = `'http://www.boredapi.com/api/activity/'`;
  
    //   fetch(url, requestOptions)
    //     .then((response) => response.json())
    //     .then((result) => {
    //       let data: any = JSON.parse(result);
    //       this.setState({
    //         activityObject: data.results,
    //         // fetchComplete: true,
    //       });
    //       console.log(data.results)
    //     })
    //     .catch((error) => console.log("error", error));
    // };
    
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
    console.log(this.state.activityObject)
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          bored
        </Button>
        <Modal 
          visible={visible}
          title="Activities to do when you're bored"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            // <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
            //   Submit
            // </Button>,
          ]}
        >
          <h3>Activity</h3>
          <p>{this.state.activityObject.activity}</p>
          <h3>Type</h3>
          <p>{this.state.activityObject.type}</p>
        </Modal>
      </div>
    );
  }
}

export default Bored;
// ReactDOM.render(<Bored />, mountNode);