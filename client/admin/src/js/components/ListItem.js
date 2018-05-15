import React, {Component} from "react";
import ReactDOM from "react-dom";
import "../../style/list-item.less";

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = props.content;
        this.onCompanyRemoveClick = props.onCompanyRemoveClick;
        this.onCompanyClick = props.onCompanyClick;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return nextProps.content;
    }

    handleRemoveItem() {
        this.onCompanyRemoveClick({company: this.state.company});
    }

    handleClickItem() {
        this.onCompanyClick(this.state);
    }

    render() {
        return (
            <div className="ListItem">
                <div
                    className="ListItem-name"
                    onClick={this.handleClickItem.bind(this)}
                >
                    {this.state.displayName}
                </div>
                <div
                    className="ListItem-remove"
                    onClick={this.handleRemoveItem.bind(this)}
                >
                    x
                </div>
            </div>
        );
    }
}
export default ListItem;
