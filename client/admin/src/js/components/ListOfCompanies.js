import React, {Component} from "react";
import ReactDOM from "react-dom";
import ListItem from "./ListItem.js";
import "../../style/list-of-companies.less";

class ListOfCompanies extends Component {
    constructor(props) {
        super(props);
        this.content = props.content;
        this.listOfCompanies = this.content.map(item => {
            return {
                company: item.company,
                displayName: item.displayName
            };
        });
        this.onCompanyRemoveClick = props.onCompanyRemoveClick;
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    generateListOfCompanies(content) {
        return content.map((el, index) => {
            return (
                <ListItem
                    content={el}
                    key={index}
                    onCompanyRemoveClick={this.onCompanyRemoveClick}
                />
            );
        });
    }

    render() {
        return (
            <div className="ListOfCompanies">
                <h1>ListOfCompanies</h1>
                {this.generateListOfCompanies(this.listOfCompanies)}
            </div>
        );
    }
}
export default ListOfCompanies;
