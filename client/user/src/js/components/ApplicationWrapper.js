import React, {Component} from "react";
import ReactDOM from "react-dom";

class ApplicationWrapper extends Component {
    constructor() {
        super();
        this.state = {
            content: undefined
        };
    }

    componentDidMount() {
        this._isMounted = true;
        // fetch("http://api.chew.pro/trbmb")
        //     .then(response => response.json())
        //     .then(json => {
        //         if (this._isMounted) {
        //             setTimeout(() => {
        //                 this.setState({
        //                     content: Content
        //                 });
        //             }, 500);
        //         }
        //     });

        setTimeout(() => {
            if (this._isMounted) {
                this.setState({
                    content: Content
                });
            }
        }, 500);
        console.log(location)
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const Content = this.state.content;
        return (
            <div className="applicationWrapper container-fluid">
            </div>
        );
    }
}
export default ApplicationWrapper;
