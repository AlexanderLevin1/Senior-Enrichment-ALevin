import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent, updateStudent } from './store';

class StudentCreate extends Component {
  constructor({student}) {
    super();
    this.state = {
      firstName: !student ? '' : student.firstName,
      lastName: ! student ? '' : student.lastName,
      email: !student ? '' : student.lastName,
      imageURL: !student ? '' : imageURL,
      gpa: !student ? '' : 0
    }
    this.onChangeForm = this.onChangeForm.bind(this)
    this.onCreateStudent = this.onCreateStudent.bind(this)
    this.onUpdateStudent = this.onUpdateStudent.bind(this);
  }

  onChangeForm(ev) {
    const inputName = ev.target.name;
    const inputValue = ev.target.value;
    ev.preventDefault();
    this.setState({ [inputName]: inputValue })
  }

  onCreateStudent(ev) {
    const { campus } = this.props;
    const { firstName, lastName, email, imageURL, gpa } = this.state;
    ev.preventDefault;
    this.props.createStudent({
      firstName,
      lastName,
      email,
      imageURL,
      gpa,
      campus_id: campus && campus.id
    })
  }

  onUpdateStudent(ev) {
    const { firstName, lastName, email, imageURL, gpa } = this.state;
    const { student } = this.props;
    ev.preventDefault();
    this.props.updateStudent({ firstName, lastName, email, imageURL, gpa }, student.id);
};

  render() {
    const { onCreateStudent, onChangeForm, onUpdateStudent } = this;
    return (
      <div>
        <h2>New Student</h2>
        <form className= "form-group">
        firstName
          <input name="firstName" onChange={onChangeForm} />
        lastName
          <input name="lastName" onChange={onChangeForm} />
        email
          <input name="email" onChange={onChangeForm} />
        imageURL
          <input name="imageURL" onChange={onChangeForm} />
        gpa
          <input name="gpa" onChange={onChangeForm} />
        </form>
        <button onClick={onCreateStudent}>Add Student</button>
      </div>
    )
  }
};

const mapStateToProps = ({ campuses }, { id }) => {
  return {
    campus: campuses.find(campus => campus.id === id)
  }
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createStudent: (student) => dispatch(createStudent(student, history))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentCreate);