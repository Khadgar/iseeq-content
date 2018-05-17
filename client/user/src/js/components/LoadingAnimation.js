import React, {Component} from "react";
import ReactDOM from "react-dom";
import "../../style/loading-animation.less";

class LoadingAnimation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="loading">
                <div className="loading-bar" />
                <div className="loading-bar" />
                <div className="loading-bar" />
                <div className="loading-bar" />
            </div>
        );
    }
}
export default LoadingAnimation;
