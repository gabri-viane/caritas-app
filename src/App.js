import React, { Component } from "react";
import './App.css';
import SSRProvider from "react-bootstrap/SSRProvider";
import LoadApp from "./components/loadApp";

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