import React, {Component} from "react";
import {Link} from "react-router-dom";
import {doQuery} from "../../utils";

class PeopleTable extends Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    state = {
        peopleList: Array()
    }

    componentDidMount() {
        doQuery('/api/person')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    peopleList: Array.from(json)
                });
            });
    }

    handleDelete(id) {
        doQuery(`/api/person/${id}`, {
            method: "DELETE"
        }).then(() => {
            const {peopleList} = this.state;
            this.setState({
                peopleList: peopleList.filter(person => person.id !== id)
            });
        });
    }

    render() {
        const {peopleList} = this.state;

        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Отчество</th>
                    <th>Диагноз</th>
                    <th>Палата</th>
                </tr>
                </thead>
                <tbody>
                {peopleList.map(person => (
                    <tr key={person.id}>
                        <th>{person.firstname}</th>
                        <th>{person.lastname}</th>
                        <th>{person.pathername}</th>
                        <th>{person.diagnos.name}</th>
                        <th>{person.ward.name}</th>
                        <th><Link to={`/person/${person.id}`}>Изменить</Link></th>
                        <th><a onClick={() => this.handleDelete(person.id)}>Удалить</a></th>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }
}

export default PeopleTable;