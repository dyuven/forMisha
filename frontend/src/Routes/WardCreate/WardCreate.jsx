import React, {Component} from "react";
import {doQuery} from "../../utils";

class WardCreate extends Component {

    constructor(props) {
        super(props);

        this.handleName = this.handleName.bind(this);
        this.handleCount = this.handleCount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        name: '',
        max_count: ''
    }

    handleName(elem) {
        this.setState({
            name: elem.target.value
        })
    }

    handleCount(elem) {
        this.setState({
            max_count: elem.target.value
        })
    }

    handleSubmit() {
        const {name, max_count} = this.state;

        const json = JSON.stringify({
            name: name,
            max_count: max_count
        });

        doQuery("/api/ward", {
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
                    <label className="label text-white">Название палаты</label>
                    <div className="control">
                        <input className="input"
                               type="text"
                               placeholder="Введите незвание"
                               required={true}
                               onChange={this.handleName}/>
                    </div>
                </div>

                <div className="field">
                    <label className="label text-white">Вместимость</label>
                    <div className="control">
                        <input className="input"
                               type="number"
                               min={0}
                               placeholder="Введите вместимость"
                               required={true}
                               onChange={this.handleCount}/>
                    </div>
                </div>

                <div className="control">
                    <button type="submit" className="button ">Создать</button>
                </div>
            </form>
        );
    }
}

export default WardCreate;