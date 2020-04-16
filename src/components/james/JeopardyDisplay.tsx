import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
type Props = {
  question: string;
  answer: string;
};
type State = {
  open: boolean;
};
export default class JeopardyDisplay extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { open: false };
  }
  openDialog = () => {
    this.setState({
      open: true,
    });
  };
  closeDialog = () => {
    this.setState({
      open: false,
    });
  };
  render() {
    return (
      <div>
        <Button onClick={this.openDialog}>James' Jeopardy Question</Button>
        <Dialog open={this.state.open} onClose={this.closeDialog}>
          {this.props.question}
          {this.props.answer}{" "}
        </Dialog>
      </div>
    );
  }
}
