import React, {Component} from "react";
import ReactDOM from "react-dom";
import ListOfCompanies from "./ListOfCompanies.js";
import CompanyDetails from "./CompanyDetails.js";
import "../../style/body.less";

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: props.content.result,
            selectedCompanyData: props.selectedCompanyData
        };
        this.onCompanyRemoveClick = props.onCompanyRemoveClick;
        this.onCompanyAddClick = props.onCompanyAddClick;
        this.onCompanyClick = props.onCompanyClick;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            content: nextProps.content.result,
            selectedCompanyData: nextProps.selectedCompanyData
        };
    }

    render() {
        return (
            <div className="Body">
                <h1>Body</h1>
                <ListOfCompanies
                    content={this.state.content}
                    onCompanyRemoveClick={this.onCompanyRemoveClick}
                    onCompanyClick={this.onCompanyClick}
                />
                <CompanyDetails
                    content={this.state.selectedCompanyData}
                    onCompanyAddClick={this.onCompanyAddClick}
                />
            </div>
        );
    }
}
export default Body;
