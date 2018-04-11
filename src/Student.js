import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStudent, updateStudent } from './store';


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
                    <h2>{student.fullName}</h2>
                    <img src={student.imageURL} />
                </div>
                <p><Link className="btn btn-default" to={`/students/${student && student.id}/edit`}>Edit Student</Link></p>
                <button className="btn btn-default" onClick={onDeleteStudent}> Delete Student </button>
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
        updateStudent: (student) => dispatch(updateStudent(student)),
        deleteStudent: (student) => dispatch(deleteStudent(student, history))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);