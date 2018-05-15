import React, {Component} from "react";
import ReactDOM from "react-dom";
import Body from "./Body.js";
import LoadingAnimation from "./LoadingAnimation.js";

class ApplicationWrapper extends Component {
    constructor() {
        super();
        this.state = {
            content: undefined,
            contentAvailable: false,
            selectedCompanyData: {}
        };
        this.loadData = this.loadData.bind(this);
        this.postData = this.postData.bind(this);
        this.handleAddCompany = this.handleAddCompany.bind(this);
        this.handleRemoveCompany = this.handleRemoveCompany.bind(this);
        this.handleCompanyClick = this.handleCompanyClick.bind(this);
        this.getSelectedCompany = this.getSelectedCompany.bind(this);
    }

    postData(url, data) {
        this.setState({
            contentAvailable: false
        });
        return fetch(url, {
            body: JSON.stringify(data), // must match 'Content-Type' header
            headers: {
                "content-type": "application/json"
            },
            method: "POST"
        }).then(response => {
            return response.json();
        }); // parses response to JSON
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadData();
    }

    loadData() {
        fetch("http://iseeq-restapi.herokuapp.com/api/iseeq-store/list/all")
            .then(response => response.json())
            .then(json => {
                if (this._isMounted) {
                    this.setState({
                        content: json,
                        contentAvailable: true,
                        selectedCompanyData: this.selectedCompany
                            ? this.getSelectedCompany(json.result)
                            : {}
                    });
                }
            });
    }

    getSelectedCompany(data){
        let selectedCompany = data.find(item => {
            return (
                item.company ===
                this.selectedCompany.company
            );
        });
        return selectedCompany?selectedCompany:{};
    }

    handleRemoveCompany(company) {
        this.postData(
            "http://iseeq-restapi.herokuapp.com/api/iseeq-store/remove",
            company
        ).then(data => {
            this.loadData();
        });
    }

    handleAddCompany(companyData) {
        this.postData(
            "http://iseeq-restapi.herokuapp.com/api/iseeq-store/add",
            companyData
        ).then(data => {
            this.loadData();
        });
    }

    handleCompanyClick(data) {
        this.selectedCompany = this.state.content.result.find(item => {
            return item.company === data.company;
        });
        this.setState({
            selectedCompanyData: this.selectedCompany
                ? this.selectedCompany
                : {}
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const Content = this.state.content;
        const selectedCompanyData = this.state.selectedCompanyData;
        return (
            <div className="applicationWrapper container-fluid">
                {this.state.contentAvailable ? (
                    <Body
                        content={Content}
                        selectedCompanyData={selectedCompanyData}
                        onCompanyRemoveClick={this.handleRemoveCompany}
                        onCompanyAddClick={this.handleAddCompany}
                        onCompanyClick={this.handleCompanyClick}
                    />
                ) : (
                    <LoadingAnimation />
                )}
            </div>
        );
    }
}
export default ApplicationWrapper;
