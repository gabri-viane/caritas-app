import React, { Component } from "react";
import logo from "../resources/images/database-icon-adv.png";

class Logo extends Component {


    render() {
        return (
            <img src={logo} alt="" width="30" height="30" className="d-inline-block align-text-top"></img>
        );
    }

}

export default Logo;