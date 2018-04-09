import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCampus, updateCampus } from './store';

class CampusCreate extends Component {
    constructor({ campus }) {
        super();
        this.state = {
            name: !campus ? '' : campus.name,
            imageURL: !campus ? '' : campus.imageURL,
            description: !campus ? '' : campus.description
        };
        this.onChangeForm = this.onChangeForm.bind(this);
        this.onCreateCampus = this.onCreateCampus.bind(this);
        this.onUpdateCampus = this.onUpdateCampus.bind(this);
    };

    onChangeForm(ev) {
        const inputName = ev.target.name;
        const inputValue = ev.target.value;
        ev.preventDefault();
        this.setState({ [inputName]: inputValue });
    };

    onCreateCampus(ev) {
        const { name, imageURL, description } = this.state;
        ev.preventDefault();
        this.props.createCampus({
            name,
            imageURL,
            description
        });
    };

    onUpdateCampus(ev) {
        const { name, imageURL, description } = this.state;
        const { campus } = this.props;
        ev.preventDefault();
        this.props.updateCampus({ name, imageURL, description }, campus.id);
    };


    render() {
        const { onCreateCampus, onChangeForm, onUpdateCampus } = this;
        const { campus } = this.props;
        const { name, imageURL, description } = this.state;
        return (
            <div className="default-margins">
                <h2>{!campus ? ('Add Campus') : (`Edit ${campus.name}`)}</h2>
                <div>
                    <form className="margin-top-10">
                        <div className="form-row">
                            <label>Name:
                            <input name="name" onChange={onChangeForm} value={name} />
                            </label>
                            <label>imageURL:</label>
                            <input name="imageURL" onChange={onChangeForm} value={imageURL} />
                            <label>Description:</label>
                            <input name="description" onChange={onChangeForm} value={description} width={300} height={300}/>
                        </div>
                    </form>
                </div>
                <button onClick={!campus ? onCreateCampus : onUpdateCampus}>
                    {!campus ? ('Add') : ('Edit')} Campus
                </button>
            </div>
        );
    }
};

const mapStateToProps = ({ campuses }, { id }) => {
    return { 
        campus: campuses && campuses.find(campus => campus.id === id) 
    };
};

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        createCampus: (campus) => dispatch(createCampus(campus, history)),
        updateCampus: (campus, id) => dispatch(updateCampus(campus, id, history))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusCreate);