import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateCampus, deleteCampus } from './store';

const Campuses = ({ campuses }) => {
  return (
    <div className="container-fluid">
      <div>
        <title>List of Campuses</title>
      </div>
      <div className="page-header">
        <h1> Campuses: {campuses.length} </h1>
      </div>
      <button className="btn btn-success"><Link to={`/campuses/create`}>Add Campus</Link></button>
      <div className="card-group jumbotron">
        <ul>
          {
            campuses && campuses.map(campus => {
              return (
                <ul key={campus.id}>
                  <div className="row">
                    <div className="thumbnail" width={350}>
                      <Link to={`/campuses/${campus.id}`}>
                        <h3>{campus.name}</h3>
                      </Link>
                      <Link to={`/campuses/${campus.id}`}>
                        <img className="campus-thumbnail" src={campus.imageURL} width={200} />
                      </Link>
                    </div>
                  </div>
                </ul>
              )
            })
          }
        </ul>
        <div>
          {!campuses.length && <h3 className="text-center"> Please Add a Campus </h3>}
        </div>
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



