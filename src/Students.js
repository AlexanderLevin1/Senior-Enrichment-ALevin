import React from 'react';
import StudentList from './StudentList';
import { Link } from 'react-router-dom';

const Students = () => {
    return (
        <div>
            <h1> Students </h1>
            <p><Link to={`/newStudent`}>Add Student</Link></p>
            <StudentList />
        </div>
    )
};

export default Students;