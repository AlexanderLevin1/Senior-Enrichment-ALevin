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

const campusesReducer = (state = [], action) => {
    switch (action.type) {
        case SET_CAMPUSES:
            state = action.campuses;
            break;
        case CREATE_CAMPUS:
            state = [...state, action.campus];
            break;
        case DESTROY_CAMPUS:
            state = state.filter(campus => campus.id !== action.campus.id);
            break;
        case UPDATE_CAMPUS:
            state = state.map(campus => campus.id === action.campus.id ? action.campus : campus);
            break;
    }
    return state;
};

const studentsReducer = (state = [], action) => {
    switch (action.type) {
        case SET_STUDENTS:
            state = action.students;
            break;
        case CREATE_STUDENT:
            state = [...state, action.student];
            break;
        case DESTROY_STUDENT:
            state = state.filter(student => student.id !== action.student.id);
            break;
        case UPDATE_STUDENT:
            state = state.map(student => student.id === action.student.id ? action.student : student);
            break;
    }
    return state;
};

const reducer = combineReducers({
    students: studentsReducer,
    campuses: campusesReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

const loadCampuses = () => {
    return (dispatch) => {
        return axios.get('/api/campuses')
            .then(result => result.data)
            .then(categories => dispatch({
                type: SET_CAMPUSES,
                campuses
            })
            )
    }
};

const loadStudents = () => {
    return (dispatch) => {
        return axios.get(`/api/students`)
            .then(result => result.data)
            .then(categories => dispatch({
                type: SET_STUDENTS,
                campuses
            })
            )
    }
};

const createCampus = (campus) => {
    return (dispatch) => {
        return axios.post(`/api/campuses`)
        .then (result => result.data)
        .then (campus => dispatch({
            type: CREATE_CAMPUS,
            campus
        }))
    }
};

const createStudent = (student) => {
    return (dispatch) => {
        return axios.post(`/api/campuses/${campus.id}/students`)
        .then (result => result.data)
        .then (student => dispatch({
            type: CREATE_STUDENT,
            student
        }))
    }
};

const updateCampus = (campus, history) => {
    return (dispatch) => {
        return axios.put(`/api/campuses/${campus.id}`)
        .then (result => result.data)
        .then (campus => dispatch({
            type: UPDATE_CAMPUS,
            campus
        }))
        .then ( () => history.push('/'))
    }
};

const updateStudent = (student, history) => {
    return (dispatch) => {
        return axios.put(`/api/campuses/${student.categoryId}/students/${student.id}`)
        .then (result => result.data)
        .then (student => dispatch({
            type: UPDATE_STUDENT,
            student
        }))
        .then ( () => history.push('/'))
    }
};

const deleteCampus = (campus, history) => {
    return (dispatch) => {
        return axios.delete(`/api/campuses/${campus.id}`)
        .then (result => result.data)
        .then ( () => dispatch({
            type: DELETE_CAMPUS,
            campus
        }))
        .then ( () => history.push('/'))
    }
};

const deleteStudent = (campus, history) => {
    return (dispatch) => {
        return axios.delete(`/api/campuses/${student.categoryId}/students/${student.id}`)
        .then (result => result.data)
        .then ( () => dispatch({
            type: DELETE_STUDENT,
            student
        }))
        .then ( () => history.push('/'))
    }
};

export default store;
export { loadCampuses, loadStudents, createCampus, createStudent, deleteCampus, deleteStudent, updateCampus, updateStudent };