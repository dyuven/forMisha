import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";

class EntityTemplate extends Component {

    render() {
        const {children, createIsActive, name} = this.props;

        return (
            <Fragment>
                <div className="tile is-parent is-vertical">
                    <article className="tile is-child notification is-primary">
                        <p className="title">{name}</p>
                        {createIsActive &&
                        <p className="subtitle"><Link to={name.toLowerCase() + "_create"}>Create</Link></p>}
                        <div className="content">
                            {children}
                        </div>
                    </article>
                </div>
            </Fragment>
        );
    }
}

export default EntityTemplate;