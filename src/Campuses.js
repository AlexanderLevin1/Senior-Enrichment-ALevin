import React from 'react';
import CampusList from './CampusList';
import { Link } from 'react-router-dom';

const Campuses = () => {
    return (
        <div className="container-fluid">
        <title>List of Campuses</title>
        <p><Link to={`/campuses/create`}>Add Campus</Link></p>
            <CampusList />
        </div>
    )
};

export default Campuses;



