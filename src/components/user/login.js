import React, { Component } from "react";
import Logo from "../extra/logo.js";
import { datax } from "../../contents/data.js";
import { user } from "../../contents/database/Connection.js";

class LoginModule extends Component {

    state = {
        username: '',
        password: '',
        datas: null
    }

    handleUsernameChanged = (event) => {
        this.setState({ username: event.target.value });
    }

    handlePasswordChanged = (event) => {
        this.setState({ password: event.target.value });
    }

    render() {
        return <div className='mt-5'>
            <div className="container-fluid ">
                <div className="row text-center">
                    <div className="col-6 container-fluid text-center">
                        <div className="row align-text-center">
                            <h4 className="h5"><Logo /><span className="ms-3">Accedi al database</span></h4>
                        </div>
                        <div><span className="h6">{this.props.extraInfo}</span></div>
                        <div className="row mt-4">
                            <form className="col-10 container-fluid text-center" onSubmit={(ev) => this.login(ev)}>
                                <div className="row">
                                    <div className="col input-group mb-1">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1" role="img" aria-label="Username Icon">&#128100;</span>
                                        </div>
                                        <input type='text' name='username' placeholder='Username' aria-label="Username" className="form-control" aria-describedby="basic-addon1" onChange={this.handleUsernameChanged} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col input-group mb-1">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon2" role="img" aria-label="Password Icon">&#128273;</span>
                                        </div>
                                        <input type='password' name='password' placeholder='Password' aria-label="Password" autoComplete="on" className="form-control" aria-describedby="basic-addon2" onChange={this.handlePasswordChanged} />
                                    </div>
                                </div>
                                <div className="row mt-1">
                                    <div className="col text-end">
                                        <button type="button" className="btn btn-secondary me-1" onClick={this.props.handleCancel}> Annulla</button>
                                        <button type="submit" className="btn btn-primary ms-1"> Accedi</button>
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
        </div>
    }

    login(event) {
        event.preventDefault();
        user({ method: 'post', k: 'login', username: this.state.username, password: this.state.password }, (dt) => {
            this.setState({
                auth: dt.auth,
                token: dt.res.token
            }, () => {
                if (this.state.auth) {
                    datax.DataHandler.setLoginAccessData(this.state.token, this.state.username);
                    this.props.handleSuccess();
                }
            });
        }, (dt) => {
            console.log(dt);
            alert("Impossibile accedere");
        });
    }

}
export default LoginModule;