import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './App.css';
import Navbar from "./Component/Navbar/Navbar";
import EntityTemplate from "./Component/EntityTemplate/EntityTemplate";
import WardTable from "./Routes/WardTable/WardTable";
import WardCreate from "./Routes/WardCreate/WardCreate";
import WardEdit from "./Routes/WardEdit/WardEdit";
import DiagnosTable from "./Routes/DiagnosTable/DiagnosTable";
import DiagnosCreate from "./Routes/DiagnosCreate/DiagnosCreate";
import DiagnosEdit from "./Routes/DiagnosEdit/DiagnosEdit";
import PeopleTable from "./Routes/PeopleTable/PeopleTable";
import PeopleCreate from "./Routes/PeopleCreate/PeopleCreate";
import PeopleEdit from "./Routes/PeopleEdit/PeopleEdit";
import {doQuery} from "./utils";
import AuthorizePage from "./Routes/AuthorizePage/AuthorizePage";
import RegistrationPage from "./Routes/RegistrationPage/RegistrationPage";

class App extends Component {
    state = {
        user: null
    };

    componentDidMount() {
        doQuery("/user",)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    user: json
                });
            })
            .catch(() => {
                this.setState({
                    user: null
                });
            });
    }

    render() {
        const {user} = this.state;

        return (
            <div className="App">
                <Router>
                    <header className="App-header">
                        <Navbar user={user}/>
                    </header>
                    <main>
                        {user !== null ? (
                            <Switch>
                                <Route path="/ward_create">
                                    <EntityTemplate name={"Ward"} createIsActive={false} children={<WardCreate/>}/>
                                </Route>

                                <Route path="/ward/:id" render={({match}) => (
                                    <EntityTemplate name={"Ward"} createIsActive={false}
                                                    children={<WardEdit id={match.params.id}/>}/>
                                )}/>

                                <Route path="/ward">
                                    <EntityTemplate name={"Ward"} createIsActive={true} children={<WardTable/>}/>
                                </Route>

                                <Route path="/diagnos_create">
                                    <EntityTemplate name={"Diagnos"} createIsActive={false}
                                                    children={<DiagnosCreate/>}/>
                                </Route>

                                <Route path="/diagnos/:id" render={({match}) => (
                                    <EntityTemplate name={"Diagnos"} createIsActive={false}
                                                    children={<DiagnosEdit id={match.params.id}/>}/>
                                )}/>

                                <Route path="/diagnos">
                                    <EntityTemplate name={"Diagnos"} createIsActive={true} children={<DiagnosTable/>}/>
                                </Route>

                                <Route path="/person_create">
                                    <EntityTemplate name={"Person"} createIsActive={false} children={<PeopleCreate/>}/>
                                </Route>

                                <Route path="/person/:id" render={({match}) => (
                                    <EntityTemplate name={"Diagnos"} createIsActive={false}
                                                    children={<PeopleEdit id={match.params.id}/>}/>
                                )}/>

                                <Route path="/people">
                                    <EntityTemplate name={"Person"} createIsActive={true} children={<PeopleTable/>}/>
                                </Route>


                            </Switch>
                        ) : (
                            <Switch>
                                <Route path="/registration">
                                    <RegistrationPage/>
                                </Route>

                                <Route path="/">
                                    <AuthorizePage/>
                                </Route>
                            </Switch>
                        )}
                    </main>
                </Router>
            </div>
        );
    }
}

export default App;
