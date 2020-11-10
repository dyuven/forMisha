import React, {Component} from "react";
import {Link} from "react-router-dom";
import {doQuery} from "../../utils";

class DiagnosTable extends Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    state = {
        diagnosList: Array()
    }

    componentDidMount() {
        doQuery('/api/diagnos')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    diagnosList: Array.from(json)
                })
            })
    }

    handleDelete(id) {
        doQuery(`/api/diagnos/${id}`, {
            method: "DELETE"
        }).then(() => {
            const {diagnosList} = this.state;
            this.setState({
                diagnosList: diagnosList.filter(diagnos => diagnos.id !== id)
            })
        });
    }

    render() {
        const {diagnosList} = this.state;

        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Название</th>
                </tr>
                </thead>
                <tbody>
                {diagnosList.map(diagnos => (
                    <tr key={diagnos.id}>
                        <th>{diagnos.name}</th>
                        <th><Link to={`/diagnos/${diagnos.id}`}>Изменить</Link></th>
                        <th><a onClick={() => this.handleDelete(diagnos.id)}>Удалить</a></th>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }
}

export default DiagnosTable;