import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const StudentList = ({ students }) => {
    console.log(students)
    return (
        <div>
            <ul>
                {
                    students && students.map(student => {
                        return (
                            <li key={student.id}>
                                <Link to={`/students/${student.id}`}>
                                    {student.fullName}
                                    <img className="student-image" src={student.imageURL} />
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
            {!students.length && <p> There are No Students</p>}
        </div>
    );
};

const mapStateToProps = ({ students }) => {
    return { students };
};

export default connect(mapStateToProps)(StudentList);