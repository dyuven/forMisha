import React, {Component} from "react";
import {doQuery} from "../../utils";

class RegistrationPage extends Component {
    constructor(props) {
        super(props);

        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        username: '',
        password: ''
    }

    handleUsername(elem) {
        this.setState({
            username: elem.target.value
        })
    }

    handlePassword(elem) {
        this.setState({
            password: elem.target.value
        })
    }

    handleSubmit() {
        const {username, password} = this.state;

        const json = JSON.stringify({
            username: username,
            password: password,
            roles: ["USER"]
        });

        doQuery("/user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="title">
                    Регистрация
                </div>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="text" placeholder="Username" required={true}
                               onChange={this.handleUsername}/>
                        <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                 <i className="fas fa-check"></i>
            </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input" type="password" placeholder="Password" required={true}
                               onChange={this.handlePassword}/>
                        <span className="icon is-small is-left">
      <i className="fas fa-lock"></i>
    </span>
                    </p>
                </div>

                <div className="control">
                    <button type="submit" className="button ">Регистрация</button>
                </div>
            </form>
        );
    }
}


export default RegistrationPage;