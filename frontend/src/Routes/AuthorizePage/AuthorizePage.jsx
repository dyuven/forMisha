import {Link} from "react-router-dom";
import React, {Component} from "react";

class AuthorizePage extends Component {
    render() {
        return (

            <section className="section grid">
                <div>Дла работы в приложении необходимо авторизоваться</div>
                <div className="container">
                    <div className="columns is-centered">
                        <div className="buttons">
                            <Link className="button is-primary" to="/registration">
                                <strong>Зарегистрироваться</strong>
                            </Link>

                            <a className="button is-light" href={"/login"}>
                                Войти
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


export default AuthorizePage;