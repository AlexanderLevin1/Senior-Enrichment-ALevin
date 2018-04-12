import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = () => {
    const url = location.hash.slice(1)
    return (
        <nav style={{ marginBottom: '10px' }} className="navbar navbar-default">
            <div className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-header">
                    <button type="button" className="btn btn-default navbar-btn">
                        <Link className="navbar-brand align-center" to='/' className="d-inline-block align-center" style={{ width: '30px' }}>
                            Home
                    </Link>
                    </button>
                    <button type="button" className="btn btn-default navbar-btn">
                        <Link className="navbar-brand align-center" to='/campuses' className="d-inline-block align-center" style={{ width: '30px' }}>
                            Campuses
                    </Link>
                    </button>
                    <button type="button" className="btn btn-default navbar-btn">
                        <Link className="navbar-brand align-center" to='/students' className="d-inline-block align-center" style={{ width: '30px' }}>
                            Students
                    </Link>
                    </button>
                    <p className="navbar-text pull-right"> Margaret Hamilton Academy </p>
                </div>
            </div>
        </nav>
    );

};

export default Nav;

