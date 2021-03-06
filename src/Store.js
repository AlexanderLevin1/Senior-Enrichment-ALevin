// -------------- REDUX STORE!!! ------------------
import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';


// -------- ACTIONS ---------------

const SET_CAMPUSES = 'SET_CAMPUSES';
const CREATE_CAMPUS = 'CREATE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';

const SET_STUDENTS = 'SET_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';

// --------- REDUCER ---------------

const campusesReducer = (state = [], action) => {
    switch (action.type) {
        case SET_CAMPUSES:
            state = action.campuses;
            break;
        case CREATE_CAMPUS:
            state = [...state, action.campus];
            break;
        case UPDATE_CAMPUS:
            state = state.map(campus => {
                return campus.id === action.campus.id ? action.campus : campus;
            });
        case DELETE_CAMPUS:
            state = state.filter(campus => campus.id !== action.campus.id);
            break;
        default:
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
        case UPDATE_STUDENT:
            state = state.map(student => {
                return student.id === action.student.id ? action.student : student;
            });
            break;
        case DELETE_STUDENT:
            state = state.filter(student => student.id !== action.student.id);
            break;
        case DELETE_CAMPUS:
            state = state.filter(student => student.campus_id !== action.campus.id);
            break;
        default:
    }
    return state;
};

// --------- COMBINE REDUCERS --------------

const reducer = combineReducers({
    campuses: campusesReducer,
    students: studentsReducer
});

// ---------- THUNKS ---------------------

const loadCampuses = () => {
    return (dispatch) => {
        return axios.get('/api/campuses')
            .then(result => result.data)
            .then(campuses => dispatch({
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
            .then(students => dispatch({
                type: SET_STUDENTS,
                students
            })
            )
    }
};

const createCampus = (campus) => {
    return (dispatch) => {
        return axios.post(`/api/campuses`, campus)
            .then(result => result.data)
            .then(campus => dispatch({
                type: CREATE_CAMPUS,
                campus
            }))
    }
};

const createStudent = (student, history) => {
    return (dispatch) => {
        return axios.post(`/api/students`, student)
            .then(result => result.data)
            .then(student => dispatch({
                type: CREATE_STUDENT,
                student
            }))
            .then(() => {
                history.push('/students')
            })
    }
};

const updateCampus = (campus, id, history) => {
    return (dispatch) => {
        return axios.put(`/api/campuses/${id}`, campus)
            .then(result => result.data)
            .then(campus => dispatch({
                type: UPDATE_CAMPUS,
                campus
            }))
            .then(action => {
                history.push(`/campuses/${action.campus.id}`);
            });
    };
};

const updateStudent = (student, id) => {
    return (dispatch) => {
        return axios.put(`/api/students/${id}`, student)
            .then(result => result.data)
            .then(student => dispatch({
                type: UPDATE_STUDENT,
                student
            }))
    };
};

const deleteCampus = (campus, history) => {
    return (dispatch) => {
        return axios.delete(`/api/campuses/${campus.id}`)
            .then(result => result.data)
            .then(() => dispatch({
                type: DELETE_CAMPUS,
                campus
            }))
            .then(() => {
                history.push('/campuses');
            })
    }
};

const deleteStudent = (student, history) => {
    return (dispatch) => {
        return axios.delete(`/api/students/${student.id}`)
            .then(result => result.data)
            .then(() => dispatch({
                type: DELETE_STUDENT,
                student
            }))
            .then(() => {
                history.push('/students')
        })
    }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export { loadCampuses, loadStudents, createCampus, createStudent, updateCampus, updateStudent, deleteCampus, deleteStudent }