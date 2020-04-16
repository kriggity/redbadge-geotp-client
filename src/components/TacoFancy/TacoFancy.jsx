import React from "react";
import { Modal, Button } from "antd";
import "./TacoFancy.css";


class TacoFancy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientList: {},
      visible: false
    };
    this.ingredientMapper = (arr) => {
      if (arr !== '' || arr !== null || arr !== 'undefined') {
      return Object.values(arr).map((ing, idx) => <li key={idx}>{ing.name}</li>)
      } else {
        return <><p>No Tacos :(</p></>
      }
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
    this.fetchTaco();
  };

  handleOk = e => {
    // console.log(e);
    this.setState({
      visible: false,
      ingredientList: {}
    });
  };

  handleCancel = e => {
    // console.log(e);
    this.setState({
      visible: false,
      ingredientList: {}
    });
  };
  fetchTaco = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        Accept: "application/json"
      }
    };

    fetch("http://taco-randomizer.herokuapp.com/random/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          ingredientList: result
        })
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <div>
        <Button onClick={this.showModal}>Show a Taco</Button>

        <Modal
          title="Taco Ingredients"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <ul>
            {this.ingredientMapper(this.state.ingredientList)}
          </ul>
        </Modal>
      </div>

    );
  }
}
export default TacoFancy;
