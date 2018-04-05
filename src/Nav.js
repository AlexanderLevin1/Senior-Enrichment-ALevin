import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = ({ studentCount, universityCount})=> {
  return (
    <ul>
      <li>
        <Link to='/'>Students ({ studentCount })</Link>
      </li>
      <li>
        <Link to='/campuses'>campuses ({ campusCount })</Link>
      </li>
      <li>
        <Link to='/students/create'>Create A Student</Link>
      </li>
    </ul>
  );
};

const mapStateToProps = ({ students, campuses })=> {
  return {
    studentCount: students.length,
    campusCount: campuses.length
  };
};

export default connect(mapStateToProps)(Nav);