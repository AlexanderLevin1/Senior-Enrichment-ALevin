import React from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Students from './Students';
import StudentForm from './StudentForm';
import Campuses from './Campuses';
import Nav from './Nav';

// Redux Store
import store from './store';

const App = ()=> {
  return (
    <Provider store={ store }>
      <Router>
        <div>
          <Nav />
          <Switch>
          <Route exact path='/' component={ Students } />
          <Route exact path='/campuses' component={ Campuses } />
          <Route exact path='/students/create' render={({ history })=> <StudentForm history={ history }/> } />
          <Route exact path='/students/:id' render={({ match, history })=> <StudentForm id={ match.params.id*1} history={ history }/> } />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

axios.get('/api/students')
  .then( result => result.data)
  .then( students => {
    store.dispatch({
      type: 'SET_STUDENTS',
      students
    });
  });

export default App;