import React, { Component } from "react";
import logo from "../../resources/images/database-icon-adv.png";

class Logo extends Component {
    render() {
        return (
            <img src={logo} alt="Caritas DB Logo" width={this.props.size} height={this.props.size} className="d-inline-block align-text-top"></img>
        );
    }
}

Logo.defaultProps = {
    size: 30
};

export default Logo;