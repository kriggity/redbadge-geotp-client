import React from 'react';
import JeopardyDisplay from './JeopardyDisplay';
export default class Jeopardy extends React.Component {
    constructor(props: any){
        super(props);
    }
    state = {
        question: "",
        answer: ""
    }
    componentDidMount(){
        this.getJeopardyQuestion()
    }
    getJeopardyQuestion(){
        fetch('http://jservice.io/api/random')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    question: data[0].question,
                    answer: data[0].answer
                })
            })
            .catch(err => console.log(err))
    }
    render(){
        return(
            <div>
                <JeopardyDisplay question={this.state.question} answer={this.state.answer}/>
            </div>
        )
    }
  }