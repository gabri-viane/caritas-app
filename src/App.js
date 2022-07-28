import React, { Component } from "react";
import Navbar from './components/navbar';
import './App.css';
import LoginModule from "./components/login";

function generateLoginModule(handleRemoveLogin) {
  return <LoginModule handleSubmit={(event) => {
    
  }} handleCancel={handleRemoveLogin} />;
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLogin: true,
      page: generateLoginModule(this.handleRemoveLogin)
    };
  }

  handleRemoveLogin = () => {
    this.setState({ showLogin: false, page: <div /> });
  };

  handleAddLogin = () => {
    this.setState({ showLogin: true, page: generateLoginModule(this.handleRemoveLogin) });
  };


  render() {
    return (
      <>
        <Navbar handleLogin={this.handleAddLogin} />
        {this.state.page}
      </>
    );
  }
}

export default App;