import React, {
    Component
} from "react";
import ReactDOM from "react-dom";
import {
    Row,
    Col
} from "reactstrap";
import "../../style/chart-component.less";
//import Fisheye from "../chart/Fisheye.js";
import ScalableScatterPlot from "../chart/ScalableScatterPlot.js";

class ChartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
        };
        this.scalableScatterPlot = new ScalableScatterPlot();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            content: nextProps.data
        };
    }
    
    componentDidMount(){
        this.scalableScatterPlot.createChart(this.state.data);
    }

    shouldComponentUpdate(nextProps){
        this.scalableScatterPlot.updateData(nextProps.data);
        return false;
    }

    render() {
        return(
            <div className="ChartComponent">
                <div id="chartContainer"></div>
            </div>
        );
    }
}
export default ChartComponent;