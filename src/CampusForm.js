import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCampus, updateCampus } from './store';

class CampusForm extends Component {
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
        const fields = { name: 'Name', imageURL: 'imageURL', description: 'Description'};
        return (
            <div className="default-margins">
                <h2>{!campus ? ('Add Campus') : (`Edit ${campus.name}`)}</h2>
                <div>
                <form>
                {
                  Object.keys(fields).map(field => (
                    <div key={field} className="form-group col-md-6">
                      <label>{fields[field]}</label>
                      <input className="form-control" name={`${field}`} onChange={onChangeForm} value={this.state[field]} />
                    </div>
                ))
                }
              </form>
                </div>
                <button disabled={!name || !description }
                className="btn btn-primary btn-succss" onClick={!campus ? onCreateCampus : onUpdateCampus}>
                    {!campus ? ('Add') : ('Edit')} Campus
                </button>
            </div>
        );
    }
};

const mapStateToProps = ({ campuses }, { id, history }) => {
    return {
        campus: campuses && campuses.find(campus => campus.id === id),
        history
    };
};

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        createCampus: (campus) => dispatch(createCampus(campus, history)),
        updateCampus: (campus, id) => dispatch(updateCampus(campus, id, history))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusForm);




{/*
  componentWillReceiveProps(nextProps) {
        const { campus } = nextProps;
        this.setState({
          name: !campus ? '' : campus.name,
          imageURL: !campus ? '' : campus.imageURL,
          description: !campus ? '' : campus.description
        });
      }
    */}