import React, {Component} from "react";
import ReactDOM from "react-dom";

import "../../style/header.less";
import 'intro.js/introjs.css';
import * as IntroJS from "intro.js";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: undefined
        };
        this.helpBtnHandler = this.helpBtnHandler.bind(this);
       //this.intro = IntroJS();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            companyName: nextProps.content.result ? nextProps.content.result.displayName : nextProps.content.msg
        };
    }
    helpBtnHandler(){
        IntroJS.introJs().start();
    }
    render() {
        return (
            <div className="Header">
                <div className="Header-logoContainer">
                    <div className="Header-logoContainer-logo"/>
                    <div className="Header-logoContainer-title">Salary Benchmark for {this.state.companyName}</div>
                </div>
                <div className="Header-menuContainer">
                    <div className="Header-menuContainer-icon" onClick={this.helpBtnHandler}/>
                </div>
            </div>
        );
    }
}
export default Header;
