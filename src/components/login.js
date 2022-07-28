import React, { Component } from "react";
import Logo from "../components/logo.js";

class LoginModule extends Component {

    state = {
        username: '',
        password: ''
    }

    handleUsernameChanged = (event) => {
        console.log(event.target.value);
        this.setState({ username: event.target.value });
    }

    handlePasswordChanged = (event) => {
        console.log(event.target.value);
        this.setState({ password: event.target.value });
    }

    render() {
        return <div className='container-fluid col-5 mt-5'  >
            <div>
                <div >
                    <div >
                        <h4 className="h5"><Logo />Accedi al database</h4>
                    </div>
                    <div className="mt-4">
                        <form >
                            <div className="input-group mb-1">
                                <span className="input-group-text" id="basic-addon1">@</span>
                                <input type='text' name='username' placeholder='Username' aria-label="Username" className="form-control my-1" aria-describedby="basic-addon1" onChange={this.handleUsernameChanged} />
                            </div>
                            <div className="input-group mb-1">
                                <span className="input-group-text" id="basic-addon2">#</span>
                                <input type='password' name='password' placeholder='Password' aria-label="Password" autoComplete="on" className=" form-control my-1" aria-describedby="basic-addon2" onChange={this.handlePasswordChanged} />
                            </div>
                            <div className="container my-2">
                                <div className="row">
                                    <div className="col-2">
                                        <button type="button" onClick={this.props.handleCancel} className="btn btn-secondary"> Annulla</button>
                                    </div>
                                    <div className="col-1"></div>
                                    <div className="col-2">
                                        <button type="button" onClick={(ev)=>this.login(ev,this.state.username,this.state.password)} className="btn btn-primary"> Accedi</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="footer">
                        <a href='mailto:thatcmd@gmail.com'>Dimenticato l'accesso?</a>
                    </div>
                </div>
            </div>
        </div>
    }

    login(event,user,pas) {
        console.log(typeof event);
        event.preventDefault();

        const url = 'https://www.vnl-eng.net/sections/TCE/ncdb/site/api/get.php';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: pas })
        };
        fetch(url, requestOptions)
            .then(response => console.log('Submitted successfully'))
            .catch(error => console.log('Form submit error', error));
    }

}
export default LoginModule;