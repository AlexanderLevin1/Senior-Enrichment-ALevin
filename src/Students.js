import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const Students = ({ students, count })=> {
    return (
      <div>
        <h2>Students { count }</h2>
        <ul>
        {
          students.map( student => {
            return (
              <li key={ student.id }>
                <Link to={`/students/${student.id}`}>
                  { student.name }
                </Link>
              </li>
            );
          })
        }
        </ul>
      </div>
    );
}

const mapStateToProps = ({ students })=> {
  return {
    students,
    count: students.length
  };
};

export default connect(mapStateToProps)(Students);