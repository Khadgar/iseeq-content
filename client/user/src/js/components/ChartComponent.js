import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Row, Col} from "reactstrap";
import "../../style/chart-component.less";
import SalaryChart from "../chart/SalaryChart.js";

class ChartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        };
        this.salaryChart = new SalaryChart();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            content: nextProps.data
        };
    }

    componentDidMount() {
        this.salaryChart.createGlobalChartElements(this.state.data);
        this.salaryChart.updateData(this.state.data);
    }

    shouldComponentUpdate(nextProps) {
        this.salaryChart.updateData(nextProps.data);
        return false;
    }

    render() {
        return (
            <div className="ChartComponent">
                <div id="chartContainer" />
            </div>
        );
    }
}
export default ChartComponent;