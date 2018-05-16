import React, {Component} from "react";
import ReactDOM from "react-dom";
import "../../style/url-component.less";

class UrlComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedCompanyData: props.selectedCompanyData};
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {selectedCompanyData: nextProps.selectedCompanyData};
    }

    render() {
        let url = `http://iseeq-restapi.herokuapp.com/api/iseeq-store/${
            this.state.selectedCompanyData.company
        }`;
        return (
            <div className="UrlComponent">
                {this.state.selectedCompanyData.company ? (
                    <div className="UrlComponent-content">
                        <div className="UrlComponent-content-text">
                            URL to charts
                        </div>
                        <div className="UrlComponent-content-url">
                            <a href={url} target="_blank">
                                {url}
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="UrlComponent-content" />
                )}
            </div>
        );
    }
}
export default UrlComponent;
