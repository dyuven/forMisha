import React, {Component} from "react";
import {doQuery} from "../../utils";

class DiagnosEdit extends Component {

    constructor(props) {
        super(props);

        this.handleName = this.handleName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        name: '',
        max_count: '',
        diagnos: null,
        mounted: false
    }

    componentDidMount() {
        const {id} = this.props;

        doQuery(`/api/diagnos/${id}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    diagnos: json,
                    mounted: true
                })
            });
    }

    handleName(elem) {
        this.setState({
            name: elem.target.value
        })
    }

    handleSubmit() {
        const {name} = this.state;
        const {id} = this.props;

        const json = JSON.stringify({
            name: name
        });

        doQuery(`/api/diagnos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });

    }

    render() {
        const {mounted, diagnos} = this.state;

        return mounted && (
            <form onSubmit={this.handleSubmit}>
                <div className="field">
                    <label className="label text-white">Диагноз</label>
                    <div className="control">
                        <input className="input"
                               type="text"
                               placeholder={diagnos.name}
                               required={true}
                               onChange={this.handleName}/>
                    </div>
                </div>

                <div className="control">
                    <button type="submit" className="button ">Изменить</button>
                </div>
            </form>
        );
    }
}

export default DiagnosEdit;