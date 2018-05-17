import React, {
    Component
} from "react";
import ReactDOM from "react-dom";
import Body from "./Body.js";
import LoadingAnimation from "./LoadingAnimation.js";

class ApplicationWrapper extends Component {
    constructor() {
        super();
        this.state = {
            content: undefined,
            contentAvailable: false
        };
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadData(window.location.hash.split('#')[1]);
        window.addEventListener("hashchange", (e) => {
            this.loadData(window.location.hash.split('#')[1]);
        });
    }

    loadData(company) {
        fetch("http://iseeq-restapi.herokuapp.com/api/iseeq-store/" + (company ? company : "ericsson"))
            .then(response => response.json())
            .then(json => {
                if(this._isMounted) {
                    this.setState({
                        content: json,
                        contentAvailable: true
                    });
                }
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const Content = this.state.content;
        return(
            <div className="applicationWrapper container">
                {this.state.contentAvailable ? (
                    <Body
                        content={Content}
                    />
                ) : (
                    <LoadingAnimation />
                )}
            </div>
        );
    }
}
export default ApplicationWrapper;