import React, {Component} from "react";
import ReactDOM from "react-dom";
import "../../style/list-item.less";

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: props.content,
            isSelected: props.isSelected
        };
        this.onCompanyRemoveClick = props.onCompanyRemoveClick;
        this.onCompanyClick = props.onCompanyClick;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            content: nextProps.content,
            isSelected: nextProps.isSelected
        };
    }

    handleRemoveItem() {
        this.onCompanyRemoveClick({company: this.state.content.company});
    }

    handleClickItem() {
        this.onCompanyClick(this.state.content);
    }

    render() {
        let className = `ListItem${this.state.isSelected?" selected":""}`
        return (
            <div className={className} onClick={this.handleClickItem.bind(this)}>
                <div className="ListItem-name">{this.state.content.displayName}</div>
                <div
                    className="ListItem-remove"
                    onClick={this.handleRemoveItem.bind(this)}
                />
            </div>
        );
    }
}
export default ListItem;
