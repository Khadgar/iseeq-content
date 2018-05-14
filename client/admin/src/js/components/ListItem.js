import React, {Component} from "react";
import ReactDOM from "react-dom";
import "../../style/list-item.less";

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.company = props.content.company;
        this.displayName = props.content.displayName;
        this.onCompanyRemoveClick = props.onCompanyRemoveClick;
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleRemoveItem() {
        this.onCompanyRemoveClick(this.company);
    }

    render() {
        return (
            <div
                className="ListItem"
                onClick={this.handleRemoveItem.bind(this)}
            >
                {this.displayName}
            </div>
        );
    }
}
export default ListItem;
