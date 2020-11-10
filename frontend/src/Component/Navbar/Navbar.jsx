import React, {Component, Fragment} from 'react';
import {
    Link
} from "react-router-dom";


class Navbar extends Component {
    render() {

        const {user} = this.props;

        return (
            <Fragment>
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div id="navbarBasicExample" className="navbar-menu">
                        {user !== null ? (
                            <Fragment>
                                <div className="navbar-start">
                                    <Link className="navbar-item" to="/ward">
                                        Палаты
                                    </Link>

                                    <Link className="navbar-item" to="/diagnos">
                                        Диагнозы
                                    </Link>

                                    <Link className="navbar-item" to="/people">
                                        Люди
                                    </Link>
                                </div>

                                <div className="navbar-end">
                                    <div className="navbar-item">
                                        <div className="buttons">
                                            <a className="button is-light" href={"/logout"}>
                                                Выход
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        ) : (
                            <div/>
                        )}
                    </div>
                </nav>
            </Fragment>);
    }
}

export default Navbar;