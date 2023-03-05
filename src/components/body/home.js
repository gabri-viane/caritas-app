import React, { Component } from "react";
import HomeCard from "./home/homecard";
import { families_data, bags_data, mag_data } from "./home/homecontent";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";


class Home extends Component {
    render() {
        return <>
            <Tabs defaultActiveKey="fams"
                id="tabbed-home"
                fill>
                <Tab eventKey="fams" title="Famiglie">
                    <Container fluid md="auto">
                        <Row >
                            {families_data.map(item => <HomeCard link={"fam/" + item.link} key={item.id} btntitle={item.btn} icon={item.icon} text={item.text} action={item.action} />)}
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey="borse" title="Borse">
                    <Container fluid md="auto">
                        <Row>
                            {bags_data.map(item => <HomeCard link={"borse/" + item.link} key={item.id} btntitle={item.btn} icon={item.icon} text={item.text} action={item.action} />)}
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey="mag" title="Magazzino">
                    <Container fluid md="auto">
                        <Row>
                            {mag_data.map(item => <HomeCard link={"mag/" + item.link} key={item.id} btntitle={item.btn} icon={item.icon} text={item.text} action={item.action} />)}
                        </Row>
                    </Container>
                </Tab>
            </Tabs>
        </>;
    }
}
export default Home;