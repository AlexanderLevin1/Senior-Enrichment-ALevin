import React from 'react';
import { connect } from 'react-redux';
import StudentList from './StudentList';
import { Link } from 'react-router-dom';
import { updateStudent, deleteStudent } from './store';

const Students = ({students}) => {
    return (
        <div>
            <h1> Students: {students.length} </h1>
            <button className="btn btn-primary btn-success">
            <Link to={`/newStudent`}>Add Student</Link>
            </button>
            <StudentList />
        </div>
    )
};

const mapStateToProps = ({ students }) => {
    return {
      students: students || []
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      updateStudent: (student) => dispatch(updateStudent(student)),
      deleteStudent: (student) => dispatch(deleteStudent(student))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Students);