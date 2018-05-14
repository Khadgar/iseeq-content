import React, {Component} from "react";
import ReactDOM from "react-dom";
import ListOfCompanies from "./ListOfCompanies.js";
import CompanyDetails from "./CompanyDetails.js";
import "../../style/body.less";

class Body extends Component {
    constructor(props) {
        super(props);
        this.content = props.content.result;
        this.onCompanyRemoveClick = props.onCompanyRemoveClick;
        this.onCompanyAddClick = props.onCompanyAddClick;
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="Body">
                <h1>Body</h1>
                <ListOfCompanies
                    content={this.content}
                    onCompanyRemoveClick={this.onCompanyRemoveClick}
                />
                <CompanyDetails
                    content={this.content}
                    onCompanyAddClick={this.onCompanyAddClick}
                />
            </div>
        );
    }
}
export default Body;
