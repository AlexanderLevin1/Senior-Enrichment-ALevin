
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateCampus, deleteCampus } from './store';


const Campuses = ({ campuses }) => {
    console.log(campuses)
    
    return (
        <div>
            <ul>
                {
                    campuses.map(campus => {
                        return (
                            <div key={campus.id}>
                                <h3 className="campus-name">{campus.name}</h3>
                                <Link to={`/campuses/${campus.id}`}>
                                    <img className="campus-image" src={campus.imageURL} />
                                </Link>
                                <button className="remove-button" onClick={() => deleteCampus(campus)}>
                                </button>
                            </div>
                        )
                    })
                }
            </ul>
            {/*<AddCampus />*/}
        </div>
    );
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