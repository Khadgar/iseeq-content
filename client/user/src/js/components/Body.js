import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Row, Col} from "reactstrap";

import ChartComponent from "./ChartComponent.js";

import "../../style/body.less";

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: props.content.result ? props.content.result : props.content.msg
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            content: nextProps.content.result ? nextProps.content.result : nextProps.content.msg
        };
    }

    render() {
        return (
            <div className="Body">
                <h1 className="display-4">ISEEQ SALARY BENCHMARK</h1>
                <h1 className="display-4">{this.state.content.company ? this.state.content.displayName : JSON.stringify(this.state.content)}</h1>
                <ChartComponent data={this.state.content.data ? this.state.content.data : []} />
            </div>
        );
    }
}
export default Body;
