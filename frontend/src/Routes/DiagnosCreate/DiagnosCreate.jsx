import React, {Component} from "react";
import {doQuery} from "../../utils";

class DiagnosCreate extends Component {

    constructor(props) {
        super(props);

        this.handleName = this.handleName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        name: '',
    }

    handleName(elem) {
        this.setState({
            name: elem.target.value
        })
    }


    handleSubmit() {
        const {name} = this.state;

        const json = JSON.stringify({
            name: name
        });

        doQuery("/api/diagnos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="field">
                    <label className="label text-white">Диагноз</label>
                    <div className="control">
                        <input className="input"
                               type="text"
                               placeholder="Введите незвание"
                               required={true}
                               onChange={this.handleName}/>
                    </div>
                </div>

                <div className="control">
                    <button type="submit" className="button ">Создать</button>
                </div>
            </form>
        );
    }
}

export default DiagnosCreate;