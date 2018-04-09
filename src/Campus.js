import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createCampus, deleteCampus } from './store';
import StudentList from './StudentList';

class Campus extends Component {
    constructor() {
        super();
        this.onDeleteCampus = this.onDeleteCampus.bind(this)
    }

    onDeleteCampus(ev) {
        ev.preventDefault();
        this.props.deleteCampus(this.props.campus);
    }

    render() {
        const { campus, campus_id } = this.props;
        const { onDeleteCampus } = this;
        return (
            <div className="container-fluid">
            <div>
                <h2 className="text-center">Campus - {campus && campus.name}</h2>
                <img className="image-center" src={campus && campus.imageURL} />
            </div>
                <p><Link className="btn btn-default" to={`/newStudent`}>Add Student</Link></p>
                <p><Link className="btn btn-default" to={`/campuses/${campus && campus.id}/edit`}>Edit Campus</Link></p>
                <button className="btn btn-default btn-xs" onClick={onDeleteCampus}>Delete Campus</button>
                <h4> Current Students </h4>
                <StudentList id={campus_id} />
            </div>
        )
    }
};

const mapStateToProps = ({ campuses }, { id }) => {
    return {
        campus: campuses.find(campus => campus.id === id), campus_id: id
    };
};

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        createCampus: (campus) => dispatch(createCampus(campus)),
        deleteCampus: (campus) => dispatch(deleteCampus(campus, history))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campus);