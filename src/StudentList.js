import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStudent } from './store';

const StudentList = ({ students }) => {
    return (
        <div>
            <ul>
                {
                    students && students.map(student => {
                        return (
                            <ul key={student.id}>
                                <div className="col-xs-4">
                                    <div className="thumbnail" width={300}>
                                        <Link to={`/students/${student.id}`}>
                                            {student.fullName}
                                            <img className="student-thumbnail" src={student.imageURL} width={100} />
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

const mapStateToProps = ({ students }, { campus_id }) => {
    console.log(campus_id)
    console.log(students[0])
    return {
        students: !campus_id ? students : students.filter(student => {
            return student.campusId === campus_id 
        })
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      updateStudent: (student) => dispatch(updateStudent(student)),
      deleteStudent: (student) => dispatch(deleteStudent(student))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);