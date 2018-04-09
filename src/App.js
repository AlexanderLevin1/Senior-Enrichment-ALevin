import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { loadCampuses, loadStudents } from './store';

import Nav from './Nav';
import Home from './Home';
import Campus from './Campus';
import Campuses from './Campuses';
import CampusCreate from './CampusCreate';
import Student from './Student';
import Students from './Students';
import StudentCreate from './StudentCreate';


class App extends Component {
    componentDidMount() {
        this.props.loadCampuses();
        this.props.loadStudents();
    }

    render() {
        return (
                <Router>
                    <div>
                        <Route render={({ location }) => <Nav path={location.pathname} />} />
                        <Switch>
                            <Route exact path='/' exact component={Home} />
                            <Route exact path='/campuses' exact component={Campuses} />
                            <Route exact path='/campuses/create' exact render={({ match, history }) => <CampusCreate history={history} />} />
                            <Route path='/campuses/:id' exact render={({ match, history }) => <Campus id={match.params.id * 1} history={history} />} />
                            <Route path='/campuses/:id/edit' exact render={({ match, history }) => <CampusCreate id={match.params.id * 1} history={history} />} />
                            <Route exact path='/newStudent' exact render={({ match, history }) => <StudentCreate id={match.params.id * 1} history={history} />} />
                            <Route exact path='/students' exact component={Students} />
                            <Route path='/students/:id' exact render={({ match, history }) => <Student id={match.params.id * 1} history={history} />} />
                            <Route path='/students/:id/edit' exact render={({ match, history }) => <StudentCreate id={match.params.id * 1} history={history} />} />
                        </Switch>
                    </div>
                </Router>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
      loadCampuses: () => dispatch(loadCampuses()),
      loadStudents: () => dispatch(loadStudents())
    };
  };
  
  export default connect(null, mapDispatchToProps)(App);