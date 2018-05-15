import React, {Component} from "react";
import ReactDOM from "react-dom";
import ListItem from "./ListItem.js";
import "../../style/list-of-companies.less";

class ListOfCompanies extends Component {
    constructor(props) {
        super(props);
        this.state = {content: props.content};
        this.onCompanyRemoveClick = props.onCompanyRemoveClick;
        this.onCompanyClick = props.onCompanyClick;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {content: nextProps.content};
    }

    generateListOfCompanies(content) {
        return content.map((el, index) => {
            return (
                <ListItem
                    content={el}
                    key={index}
                    onCompanyRemoveClick={this.onCompanyRemoveClick}
                    onCompanyClick={this.onCompanyClick}
                />
            );
        });
    }

    render() {
        return (
            <div className="ListOfCompanies">
                <h1>ListOfCompanies</h1>
                {this.generateListOfCompanies(this.state.content)}
            </div>
        );
    }
}
export default ListOfCompanies;
