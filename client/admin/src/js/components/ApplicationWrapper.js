import React, {Component} from "react";
import ReactDOM from "react-dom";
import Body from "./Body.js";
import LoadingAnimation from "./LoadingAnimation.js";

class ApplicationWrapper extends Component {
    constructor() {
        super();
        this.state = {
            content: undefined
        };
    }

    componentDidMount() {
        this._isMounted = true;
        fetch("http://iseeq-restapi.herokuapp.com/api/iseeq-store/list/all")
            .then(response => response.json())
            .then(json => {
                if (this._isMounted) {
                    setTimeout(() => {
                        this.setState({
                            content: json
                        });
                    }, 500);
                }
            });
    }

    handleRemoveCompany(company) {
        console.log("remove company", company);
    }

    handleAddCompany(companyData) {
        console.log("adding company", companyData);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const Content = this.state.content;
        return (
            <div className="applicationWrapper container-fluid">
                {Content ? (
                    <Body
                        content={Content}
                        onCompanyRemoveClick={this.handleRemoveCompany}
                        onCompanyAddClick={this.handleAddCompany}
                    />
                ) : (
                    <LoadingAnimation />
                )}
            </div>
        );
    }
}
export default ApplicationWrapper;
