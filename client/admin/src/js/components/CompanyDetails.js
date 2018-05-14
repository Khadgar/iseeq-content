import React, {Component} from "react";
import ReactDOM from "react-dom";
import ListOfCompanies from "./ListOfCompanies.js";
import {Button, Form, FormGroup, Label, Input, FormText} from "reactstrap";

import "../../style/company-details.less";

class CompanyDetails extends Component {
    constructor(props) {
        super(props);
        this.onCompanyAddClick = props.onCompanyAddClick;
        this.state = {
            company: undefined,
            displayName: undefined,
            data: undefined
        };

        this.handleUrlNameChange = this.handleUrlNameChange.bind(this);
        this.handleDisplayNameChange = this.handleDisplayNameChange.bind(this);
        this.handleDataChange = this.handleDataChange.bind(this);
    }

    handleUrlNameChange(e) {
        this.setState({company: e.target.value});
    }

    handleDisplayNameChange(e) {
        this.setState({displayName: e.target.value});
    }

    handleDataChange(e) {
        this.setState({data: e.target.value});
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleAddItem(event) {
        if(this.state.company && this.state.displayName && this.state.data){
            this.onCompanyAddClick({
                company: this.state.company,
                displayName: this.state.displayName,
                data: JSON.parse(this.state.data)
            });
        }
    }

    render() {
        return (
            <div className="CompanyDetails">
                <h1>CompanyDetails</h1>
                <Form>
                    <FormGroup>
                        <Label for="urlName">Name</Label>
                        <Input
                            name="urlName"
                            id="urlName"
                            placeholder="Name in the URL"
                            onChange={this.handleUrlNameChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="displayName">Display Name</Label>
                        <Input
                            name="displayName"
                            id="displayName"
                            placeholder="Display Name"
                            onChange={this.handleDisplayNameChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="data">Chart Data in JSON</Label>
                        <Input
                            type="textarea"
                            name="data"
                            id="data"
                            onChange={this.handleDataChange}
                        />
                    </FormGroup>
                    <Button onClick={this.handleAddItem.bind(this)}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}
export default CompanyDetails;
