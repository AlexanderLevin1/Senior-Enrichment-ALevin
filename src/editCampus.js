import React from 'react';
import StudentList from '../StudentList';
import { connect } from 'react-redux';
import { /*editCampus,*/ deleteCampus } from './store';

/*
const EditCampus = ({campus}) => {
    console.log(campus)
    return (
        <div className="container story-container">
        <h2>Edit Campus:</h2>
        <form onSubmit={editCampus}>
          <ul className="list-inline large-font">
            <li>
                <label >Campus Name: </label>
                <input
                  name="campus"
                  className="form-like large-font"
                  defaultValue={campus.name}
                />
            </li>
            <div>
              <StudentList  id={campus_id} />
              <button className="btn btn-primary" type="submit">Submit Updates</button>
              <button className="btn btn-primary" onClick={deleteCampus}>Delete</button>
            </div>
          </ul>
        </form>
      </div>
    )
  }
  
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
  
  export default connect(mapState, mapDispatch)(EditCampus);
    )
}
*/