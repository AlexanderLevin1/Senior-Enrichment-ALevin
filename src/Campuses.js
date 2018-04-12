import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateCampus, deleteCampus } from './store';

const Campuses = ({ campuses }) => {
  return (

    <div className="container">
      <div>
        <title>List of Campuses</title>
      </div>
      <div className="page-header">
      <h1> Campuses </h1>
      </div>
      <button><Link to={`/campuses/create`}>Add Campus</Link></button>
      <div className="row">
        {
          campuses.map(campus => {
            return (
              <div key={campus.id} className="col-xs-5">
              <Link to={`/campuses/${campus.id}`}>
                <h3 className="campus-name">{campus.name}</h3>
                </Link>
                <Link to={`/campuses/${campus.id}`}>
                  <img className="campus-thumbnail" src={campus.imageURL} width="75%" height="75" />
                </Link>
                <button className="remove-button" onClick={() => deleteCampus(campus)}>
                </button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
};

const mapStateToProps = ({ campuses }) => {
  return { campuses };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCampus: (campus) => dispatch(updateCampus(campus)),
    deleteCampus: (campus) => dispatch(deleteCampus(campus))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Campuses);



