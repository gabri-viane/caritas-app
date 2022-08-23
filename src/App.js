import React, { Component } from "react";
import './App.css';
import LoadApp from "./components/loadApp";
import SSRProvider from "react-bootstrap/SSRProvider";

class App extends Component {

  render() {
    return (
      <>
        <SSRProvider>
          <LoadApp />
        </SSRProvider>
      </>
    );
  }
}

export default App;