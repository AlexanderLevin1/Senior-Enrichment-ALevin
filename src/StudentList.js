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
                            <div className="row" className="col-xs-4">
                            <ul key={student.id}>
                            <div className="thumbnail" width = {300}>
                                <Link to={`/students/${student.id}`}>
                                    {student.fullName}
                                    <img className="student-thumbnail" src={student.imageURL} width = {100} />
                                </Link>
                                </div>
                            </ul>
                            </div>
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