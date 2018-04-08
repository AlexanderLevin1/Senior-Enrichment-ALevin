import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteStudent } from './store';


class Student extends Component {
    constructor() {
        super();
        this.onDeleteStudent = this.onDeleteStudent.bind(this)
    }

    onDeleteStudent(ev) {
        ev.preventDefault();
        this.props.deleteStudent(this.props.student)
    }

    render() {
        const { student } = this.props;
        const { onDeleteStudent } = this;
        return (
            <div className="student">
            <div>
            <h2>Student - { student && student.name }</h2>
            <img src={student.imageURL}/>
            </div>
            <th></th>
            <button className="btn btn-default btn-xs" onClick={onDeleteStudent}> Delete Student </button>
            </div>
        )
    }
};

const mapStateToProps = ({ students }, { id }) => {
    return {
        student: students.find(student => student.id === id)
    }
};

const mapDispatchToProps = (dispatch, { history }) => {
    return { 
        deleteStudent: (student) => dispatch(deleteStudent(student, history))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);