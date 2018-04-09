import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = () => {
    const url = location.hash.slice(1)
    return (
        <div className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="wrapper center-all">
                <nav style={{ marginBottom: '10px' }} className="navbar">
                    <Link className="navbar-brand align-center" to='/' className="d-inline-block align-center" style={{ width: '30px' }}>
                        Home
                    </Link>
                    <ul className="nav">
                        {
                            url === '/campuses' ? (
                                <span className="nav-item" style={{ borderBottom: '1px solid blue', margin: '0px 5px' }}>Campuses</span>
                            ) : (
                                    <li className="nav-item" style={{ margin: '0px 5px' }}>
                                        <Link to='/campuses' style={{ color: 'blue' }}>Campuses</Link>
                                    </li>
                                )
                        }
                        {
                            url === '/students' ? (
                                <span className="nav-item" style={{ borderBottom: '1px solid blue', margin: '0px 5px' }}>Students</span>
                            ) : (
                                    <li className="nav-item" style={{ margin: '0px 5px' }}>
                                        <Link to='/students' style={{ color: 'blue' }}>Students</Link>
                                    </li>
                                )
                        }
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Nav;