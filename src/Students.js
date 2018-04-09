import React from 'react';
import { connect } from 'react-redux';
import StudentList from './StudentList';
import { Link } from 'react-router-dom';

const Students = () => {
    return (
        <div>
            <h1> Students </h1>
            <button className="btn btn-defaul btnd-xs">
            <Link to={`/newStudent`}>Add Student</Link>
            </button>
            <StudentList />
        </div>
    )
};

export default Students;