import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCampus } from './store';

class CampusCreate extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            imageURL: '',
            description: ''
        };
        this.onChangeForm = this.onChangeForm.bind(this);
        this.onCreateCampus = this.onCreateCampus.bind(this);
    }

    onChangeForm(ev) {
        const inputName = ev.target.name;
        const inputValue = ev.target.value;
        ev.preventDefault();
        this.setState({ [inputName]: inputValue });
    }

    onCreateCampus(ev) {
        const { name, imageURL, description } = this.state;
        ev.preventDefault();
        this.props.createCampus({
            name,
            imageURL,
            description
        });
    }

    render() {
        const { onCreateCampus, onChangeForm } = this;
        return (
            <div>
                <h2>Add Campus</h2>
                <form>
                Name:
                    <input name="name" onChange={onChangeForm} />
                imageURL:
                    <input name="imageURL" onChange={onChangeForm} />
                Description:
                    <input name="description" onChange={onChangeForm} />
                </form>
                <button onClick={onCreateCampus}>Add Campus</button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        createCampus: (campus) => dispatch(createCampus(campus, history))
    };
};

export default connect(null, mapDispatchToProps)(CampusCreate);