import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Row, Col, Input, Label, Button} from "reactstrap";
import "../../style/chart-component.less";
import SalaryChart from "../chart/SalaryChart.js";

class ChartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        };
        this.selectedSeniority = "Show all";
        this.salaryChart = new SalaryChart();
        this.handleSeniorityChange = this.handleSeniorityChange.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            data: nextProps.data
        };
    }
    handleSeniorityChange(e) {
        this.selectedSeniority = e.target.value;
        this.salaryChart.filterSeniority(e.target.value);
        this.forceUpdate();
    }
    componentDidMount() {
        this.salaryChart.createGlobalChartElements(this.state.data);
        this.salaryChart.updateData(this.state.data);
        this.salaryChart.filterSeniority(this.selectedSeniority);
    }

    shouldComponentUpdate(nextProps) {
        this.salaryChart.updateData(nextProps.data);
        this.salaryChart.filterSeniority(this.selectedSeniority);
        return false;
    }

    generateSeniorityFilterItems(data) {
        let seniorities = data.map((el, index) => {
            return el.seniority;
        });

        return [...new Set(seniorities)].map((el, index) => {
            return <option key={index}>{el}</option>;
        });
    }

    render() {
        return (
            <div className="ChartComponent">
                <Row>
                    <Col>
                        <div className="chartArea"  data-step="1" data-intro="This is the chart with the salaries. Hovering your mouse on the dots will show the values">
                            <div className="chartArea-header">
                                <Button className="downloadBtn" color="link" data-step="4" data-intro="If you like a chart, using this button you can save it as a png">
                                    Download
                                </Button>
                            </div>
                            <div id="chartContainer" />
                        </div>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <div className="chartControl" data-step="2" data-intro="Using this dropdown you can filter the chart by seniority level.">
                                    <Label for="displayName">Select seniority level</Label>
                                    <Input value={this.selectedSeniority} ref={el => (this.inputElement = el)} type="select" name="select" id="senioritySelect" onChange={this.handleSeniorityChange}>
                                        <option>Show all</option>
                                        {this.generateSeniorityFilterItems(this.state.data)}
                                    </Input>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="chartValue" data-step="3" data-intro="Here you can see details about a job role (job role, salary range, seniority level)">
                                    <div className="chartValue-role">
                                        <div className="chartValue-role-colName">Role</div>
                                        <div className="chartValue-role-value" />
                                    </div>
                                    <div className="chartValue-seniority">
                                        <div className="chartValue-seniority-colName">Seniority LvL</div>
                                        <div className="chartValue-seniority-value" />
                                    </div>
                                    <div className="chartValue-salary">
                                        <div className="chartValue-salary-colName">Salary range</div>
                                        <div className="chartValue-salary-value" />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default ChartComponent;
