import React, {Component} from "react";
import ReactDOM from "react-dom";
import ListOfCompanies from "./ListOfCompanies.js";
import CompanyDetails from "./CompanyDetails.js";
import UrlComponent from "./UrlComponent.js";
import {Row, Col} from "reactstrap";
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
                <Row>
                    <Col>
                        <UrlComponent
                            selectedCompanyData={this.state.selectedCompanyData}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListOfCompanies
                            content={this.state.content}
                            selectedCompanyData={this.state.selectedCompanyData}
                            onCompanyRemoveClick={this.onCompanyRemoveClick}
                            onCompanyClick={this.onCompanyClick}
                        />
                    </Col>
                    <Col>
                        <CompanyDetails
                            content={this.state.selectedCompanyData}
                            onCompanyAddClick={this.onCompanyAddClick}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Body;
