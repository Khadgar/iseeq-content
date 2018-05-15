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
            company: {
                value: props.content.company
                    ? props.content.company
                    : "",
                isValid: true
            },
            displayName: {
                value: props.content.displayName
                    ? props.content.displayName
                    : "",
                isValid: true
            },
            data: {
                value: props.content.data
                    ? JSON.stringify(props.content.data, null, ' ')
                    : "",
                isValid: true
            }
        };

        this.handleUrlNameChange = this.handleUrlNameChange.bind(this);
        this.handleDisplayNameChange = this.handleDisplayNameChange.bind(this);
        this.handleDataChange = this.handleDataChange.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleClearFormData = this.handleClearFormData.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let nextState = {
            company: {
                value: nextProps.content.company
                    ? nextProps.content.company
                    : "",
                isValid: true
            },
            displayName: {
                value: nextProps.content.displayName
                    ? nextProps.content.displayName
                    : "",
                isValid: true
            },
            data: {
                value: nextProps.content.data
                    ? JSON.stringify(nextProps.content.data, null, ' ')
                    : "",
                isValid: true
            }
        };
        return nextState;
    }

    handleClearFormData() {
        this.setState({
            company: {
                value: "",
                isValid: true
            },
            displayName: {
                value: "",
                isValid: true
            },
            data: {
                value: "",
                isValid: true
            }
        });
    }

    handleUrlNameChange(e) {
        this.setState({
            company: {
                value: e.target.value,
                isValid: e.target.value.length > 1
            }
        });
    }

    handleDisplayNameChange(e) {
        this.setState({
            displayName: {
                value: e.target.value,
                isValid: e.target.value.length > 1
            }
        });
    }

    handleDataChange(e) {
        this.setState({
            data: {
                value: e.target.value,
                isValid: e.target.value.length > 1
            }
        });
    }

    handleAddItem(event) {
        if (
            this.state.company.value &&
            this.state.displayName.value &&
            this.state.data.value
        ) {
            try {
                let data = JSON.parse(this.state.data.value);

                if (Array.isArray(data)) {
                    this.onCompanyAddClick({
                        company: this.state.company.value,
                        displayName: this.state.displayName.value,
                        data: data
                    });
                } else {
                    console.log("Data must be an array");
                }
            } catch (e) {
                console.log("Couldn't parse data!", e);
            }
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
                            value={this.state.company.value}
                            invalid={!this.state.company.isValid}
                            placeholder="Name in the URL"
                            onChange={this.handleUrlNameChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="displayName">Display Name</Label>
                        <Input
                            name="displayName"
                            id="displayName"
                            value={this.state.displayName.value}
                            invalid={!this.state.displayName.isValid}
                            placeholder="Display Name"
                            onChange={this.handleDisplayNameChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="data">Chart Data in JSON</Label>
                        <Input
                            type="textarea"
                            name="data"
                            value={this.state.data.value}
                            invalid={!this.state.data.isValid}
                            id="data"
                            onChange={this.handleDataChange}
                        />
                    </FormGroup>
                    <Button onClick={this.handleAddItem}>Submit</Button>
                    <Button onClick={this.handleClearFormData}>Reset</Button>
                </Form>
            </div>
        );
    }
}
export default CompanyDetails;
