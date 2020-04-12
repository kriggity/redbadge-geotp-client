import React from "react";

type CommentProps = {};
type CommentState = {};

class Comments extends React.Component<CommentProps, CommentState> {
  constructor(props: CommentProps) {
    super(props);
    this.state = {};
  }
  render() {
    return <>Comments</>;
  }
}
export default Comments;