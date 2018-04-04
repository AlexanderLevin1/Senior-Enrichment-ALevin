// REDUX STORE!!! 
import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const SET_CAMPUSES = 'SET_CAMPUSES';
const CREATE_CAMPUS = 'CREATE_CAMPUS';
const DESTROY_CAMPUS = 'DESTROY_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

const SET_STUDENTS = 'SET_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const DESTROY_STUDENT = 'DESTROY_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

const campusesReducer = (state=[], action)=> {
    switch(action.type){
      case SET_CAMPUSES:
        state = action.campuses;
        break;
      case CREATE_CAMPUS:
        state = [...state, action.campus];
        break;
      case DESTROY_CAMPUS:
        state = state.filter( campus=> campus.id !== action.campus.id); 
        break;
      case UPDATE_CAMPUS:
        state = state.map(campus=> campus.id === action.campus.id ? action.campus : campus); 
        break;
    }
    return state;
  };

const studentsReducer = (state=[], action)=> {
    switch(action.type){
        case SET_STUDENTS:
          state = action.students;
          break;
        case CREATE_STUDENT:
          state = [...state, action.student];
          break;
        case DESTROY_STUDENT:
          state = state.filter( student=> student.id !== action.student.id); 
          break;
        case UPDATE_STUDENT:
          state = state.map(student=> student.id === action.student.id ? action.student : student); 
          break;
      }
      return state;
    };


const reducer = combineReducers({
  students: studentsReducer,
  campuses: campusesReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

const deleteStudent = (id, history)=> {
  return (dispatch)=> {
    return axios.delete(`/api/students/${id}`) 
    .then( result => result.data)
    .then( () => dispatch({
      type: 'DESTROY_STUDENT',
      student: { id  }
    }))
    .then( ()=> history.push('/'));
  }
};

const saveStudent = (student, history)=> {
  const { id } = student;
  const method = id ? 'put' : 'post';
  const action = id ? 'UPDATE_STUDENT' : 'CREATE_STUDENT';
  const url = `/api/students/${ id ? id : ''}`;
  return (dispatch)=> {
    return axios[method](url, student)
    .then( result => result.data)
    .then( student => dispatch({
      type: action,
      student
    }))
    .then( ()=> history.push('/'));
  }
}

export default store;
export { deleteStudent, saveStudent };