import React from "react";

type MyAccountProps = {};
type MyAccountState = {};

class MyAccount extends React.Component<MyAccountProps, MyAccountState> {
  constructor(props: MyAccountProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="myAccount">
        <h2>MyAccount</h2>
      </div>
    );
  }
}

export default MyAccount;
