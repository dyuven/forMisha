import React, {Component} from "react";
import {doQuery} from "../../utils";

class WardEdit extends Component {

    constructor(props) {
        super(props);

        this.handleName = this.handleName.bind(this);
        this.handleCount = this.handleCount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        name: '',
        max_count: '',
        ward: null,
        mounted: false
    }

    componentDidMount() {
        const {id} = this.props;

        doQuery(`/api/ward/${id}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    ward: json,
                    mounted: true
                })
            });
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
        const {id} = this.props;

        const json = JSON.stringify({
            name: name,
            max_count: max_count
        });

        doQuery(`/api/ward/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });

    }

    render() {
        const {mounted, ward} = this.state;

        return mounted && (
            <form onSubmit={this.handleSubmit}>
                <div className="field">
                    <label className="label text-white">Название палаты</label>
                    <div className="control">
                        <input className="input"
                               type="text"
                               placeholder={ward.name}
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
                               placeholder={ward.max_count}
                               required={true}
                               onChange={this.handleCount}/>
                    </div>
                </div>

                <div className="control">
                    <button type="submit" className="button ">Изменить</button>
                </div>
            </form>
        );
    }
}

export default WardEdit;