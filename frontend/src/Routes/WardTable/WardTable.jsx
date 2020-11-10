import React, {Component} from "react";
import {Link} from "react-router-dom";
import {doQuery} from "../../utils";

class WardTable extends Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    state = {
        wardList: Array()
    }

    componentDidMount() {
        doQuery('/api/ward')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    wardList: Array.from(json)
                })
            })
    }

    handleDelete(id) {
        doQuery(`/api/ward/${id}`, {
            method: "DELETE"
        }).then(() => {
            const {wardList} = this.state;
            this.setState({
                wardList: wardList.filter(ward => ward.id !== id)
            })
        });
    }

    render() {
        const {wardList} = this.state;

        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Вместимость палаты</th>
                </tr>
                </thead>
                <tbody>
                {wardList.map(ward => (
                    <tr key={ward.id}>
                        <th>{ward.name}</th>
                        <th>{ward.max_count}</th>
                        <th><Link to={`/ward/${ward.id}`}>Изменить</Link></th>
                        <th><a onClick={() => this.handleDelete(ward.id)}>Удалить</a></th>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }
}

export default WardTable;