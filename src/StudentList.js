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
                            
                            <ul key={student.id}>
                            <div className="row" className="col-xs-4">
                            <div className="thumbnail" width = {300}>
                                <Link to={`/students/${student.id}`}>
                                    {student.fullName}
                                    <img className="student-thumbnail" src={student.imageURL} width = {100} />
                                </Link>
                                </div>
                                </div>
                            </ul>
                            
                        );
                    })
                }
            </ul>
            {!students.length && <p> There are No Students</p>}
        </div>
    );
};

const mapStateToProps = ({ students }, {campus_id }) => {
    return { 
        students: !campus_id ? students: students.filter(student => {
            return student.campus_id === campus_id
        })
    };
};

export default connect(mapStateToProps)(StudentList);