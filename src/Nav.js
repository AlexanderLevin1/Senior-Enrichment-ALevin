import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({ path, students, campuses }) => {
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <ul>
                    {
                        path === '/' ? <li>Home</li> : <li><Link to="/">Home</Link></li>
                    }
                    {
                        path === '/students' ? <li>All Students</li> : <li><Link to="/students">All Students</Link> </li>
                    }
                    {
                        path === '/campuses' ? <li>All Campuses</li> : <li><Link to="/campuses">All Campuses</Link> </li>
                    }
                </ul>
            </nav>
        </div>
    );
};

const mapStateToProps = ({ students, campuses }) => {
    return { students, campuses };
};

export default connect(mapStateToProps)(Nav);