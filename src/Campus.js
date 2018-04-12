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
            <div className="row jumbotron">
                <h2 className="text-center">{campus && campus.name}</h2>
                <img className="image-center" src={campus && campus.imageURL} width="100%" />
                <div>
                <p>{campus && campus.description}</p>
                </div>
            </div>
                <div><Link className="btn btn-primary btn-success" to={`/newStudent`}>Add Student</Link></div>
                <div><Link className="btn btn-primary btn-info" to={`/campuses/${campus && campus.id}/edit`}>Edit Campus</Link></div>
                <button className="btn btn-primary btn-danger" to={`/campuses`} onClick={onDeleteCampus}>Delete Campus</button>
                <h4> Current Students:</h4>
                <StudentList campus_id={campus_id} />
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
        deleteCampus: (campus) => dispatch(deleteCampus(campus, history))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campus);