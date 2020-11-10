import React, {Component} from "react";
import {doQuery} from "../../utils";

class PeopleCreate extends Component {

    constructor(props) {
        super(props);

        this.handleFirstname = this.handleFirstname.bind(this);
        this.handleLastname = this.handleLastname.bind(this);
        this.handlePathername = this.handlePathername.bind(this);
        this.handleDiagnos = this.handleDiagnos.bind(this);
        this.handleWard = this.handleWard.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        firstname: '',
        lastname: '',
        pathername: '',
        diagnosID: '',
        wardID: '',
        diagnosList: Array(),
        wardList: Array()
    }

    componentDidMount() {
        doQuery("/api/diagnos")
            .then(response => response.json())
            .then(json => {
                const array = Array.from(json);
                this.setState({
                    diagnosList: array,
                    diagnosID: array.length === 0 ? this.state.diagnosID : array[0].id
                });
            });

        doQuery("/api/ward")
            .then(response => response.json())
            .then(json => {
                const array = Array.from(json);
                this.setState({
                    wardList: array,
                    wardID: array.length === 0 ? this.state.wardID : array[0].id
                });
            });
    }

    handleFirstname(elem) {
        this.setState({
            firstname: elem.target.value
        });
    }

    handleLastname(elem) {
        this.setState({
            lastname: elem.target.value
        })
    }

    handlePathername(elem) {
        this.setState({
            pathername: elem.target.value
        })
    }

    handleDiagnos(elem) {
        this.setState({
            diagnosID: elem.target.value
        })
    }

    handleWard(elem) {
        this.setState({
            wardID: elem.target.value
        })
    }

    handleSubmit() {
        const {firstname, lastname, pathername, diagnosList, wardList, diagnosID, wardID} = this.state;

        const json = JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            pathername: pathername,
            diagnos: diagnosList.find(diagnos => diagnos.id == diagnosID),
            ward: wardList.find(ward => ward.id == wardID),
        });

        doQuery("/api/person", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });

    }

    render() {
        const {diagnosList, wardList} = this.state

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="field">
                    <label className="label text-white">Имя</label>
                    <div className="control">
                        <input className="input"
                               type="text"
                               placeholder="Введите имя"
                               required={true}
                               onChange={this.handleFirstname}/>
                    </div>
                </div>

                <div className="field">
                    <label className="label text-white">Фамилия</label>
                    <div className="control">
                        <input className="input"
                               type="text"
                               placeholder="Введите фамилию"
                               required={true}
                               onChange={this.handleLastname}/>
                    </div>
                </div>

                <div className="field">
                    <label className="label text-white">Отчество</label>
                    <div className="control">
                        <input className="input"
                               type="text"
                               placeholder="Введите отчество"
                               required={true}
                               onChange={this.handlePathername}/>
                    </div>
                </div>


                <div className="field">
                    <label className="label text-white">Диагноз</label>
                    <div className="select">
                        <select required={true} onChange={this.handleDiagnos}>
                            {diagnosList.map(diagnos => (
                                <option key={diagnos.id} value={diagnos.id}>{diagnos.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="field">
                    <label className="label text-white">Палата</label>
                    <div className="select">
                        <select required={true} onChange={this.handleWard}>
                            {wardList.map(ward => (
                                <option key={ward.id} value={ward.id}>{ward.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="control">
                    <button type="submit" className="button ">Создать</button>
                </div>
            </form>
        );
    }
}

export default PeopleCreate;