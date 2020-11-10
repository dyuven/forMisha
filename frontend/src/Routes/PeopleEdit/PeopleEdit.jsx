import React, {Component} from "react";
import {doQuery} from "../../utils";

class PeopleEdit extends Component {

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
        person: '',
        firstname: '',
        lastname: '',
        pathername: '',
        diagnosID: '',
        wardID: '',
        diagnosList: Array(),
        wardList: Array(),
        mounted: false
    }

    componentDidMount() {
        const {id} = this.props;

        doQuery("/api/diagnos")
            .then(response => response.json())
            .then(json => {
                const array = Array.from(json);
                this.setState({
                    diagnosList: array,
                });
            });

        doQuery("/api/ward")
            .then(response => response.json())
            .then(json => {
                const array = Array.from(json);
                this.setState({
                    wardList: array,
                });
            });


        doQuery(`/api/person/${id}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    person: json,
                    wardID: json.ward.id,
                    diagnosID: json.diagnos.id,
                    mounted: true,
                })
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
        const {id} = this.props;

        const json = JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            pathername: pathername,
            diagnos: diagnosList.find(diagnos => diagnos.id == diagnosID),
            ward: wardList.find(ward => ward.id == wardID),
        });

        doQuery(`/api/person/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });
    }

    render() {
        const {diagnosList, wardList, mounted, person} = this.state

        return mounted && (
            <form onSubmit={this.handleSubmit}>
                <div className="field">
                    <label className="label text-white">Имя</label>
                    <div className="control">
                        <input className="input"
                               type="text"
                               placeholder={person.firstname}
                               required={true}
                               onChange={this.handleFirstname}/>
                    </div>
                </div>

                <div className="field">
                    <label className="label text-white">Фамилия</label>
                    <div className="control">
                        <input className="input"
                               type="text"
                               placeholder={person.lastname}
                               required={true}
                               onChange={this.handleLastname}/>
                    </div>
                </div>

                <div className="field">
                    <label className="label text-white">Отчество</label>
                    <div className="control">
                        <input className="input"
                               type="text"
                               placeholder={person.pathername}
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
                    <label className="label text-white">Диагноз</label>
                    <div className="select">
                        <select required={true} onChange={this.handleWard}>
                            {wardList.map(ward => (
                                <option key={ward.id} value={ward.id}>{ward.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="control">
                    <button type="submit" className="button ">Изменить</button>
                </div>
            </form>
        );
    }
}

export default PeopleEdit;