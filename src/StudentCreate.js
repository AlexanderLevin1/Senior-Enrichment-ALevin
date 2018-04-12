import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent, updateStudent } from './store';

class StudentCreate extends Component {
  constructor(props) {
    super(props);
    const { student } = props;
    this.state = {
      firstName: !student ? '' : student.firstName,
      lastName: !student ? '' : student.lastName,
      email: !student ? '' : student.email,
      imageURL: !student ? '' : student.imageURL,
      gpa: !student ? '' : student.gpa
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
    const { student, campus } = this.props;
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.student.firstName !== this.state.firstName) {
      this.setState({
        firstName: nextProps.student.firstName || '',
        lastName: nextProps.student.lastName || '',
        email: nextProps.student.email || '',
        imageURL: nextProps.student.imageURL || '',
        gpa: nextProps.student.gpa || 0
      })
    }
  }

  render() {
    const { onCreateStudent, onChangeForm, onUpdateStudent } = this;
    const { student } = this.props;
    const { firstName, lastName, email, imageURL, gpa } = this.state;
    return (
      <div className="card text-center">
      <div className="card-header">
        <h2>{!student ? ('Add Student') : (`Edit ${student.fullName}`)}</h2>
        </div>
        <div className="card-body">
        <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>firstName:</label>
            <input className="form-control" name="firstName" onChange={onChangeForm} value={firstName} />
          </div>
          <div className="form-group col-md-6">
            <label>lastName:</label>
            <input className="form-control" name="lastName" onChange={onChangeForm} value={lastName} />
          </div>
          <div className="form-group cold-m-6">
          <label>email:</label>
          <input className="form-control" name="email" onChange={onChangeForm} value={email} />
          </div>
          <div className="form-group col-md-6">
          <label>imageURL:</label>
          <input className="form-control" name="imageURL" onChange={onChangeForm} value={imageURL} />
          </div>
          <div className="form-group col-md-6">
          <label>gpa:</label>
          <input className="form-control" name="gpa" onChange={onChangeForm} value={gpa} />
          </div>
          </div>
        </form>
        </div>
        <button 
        disabled={!firstName || !lastName }
        className="btn btn-primary" onClick={!student ? onCreateStudent : onUpdateStudent}>
          {!student ? ('Add') : ('Edit')} Student
        </button>
      </div>
    )
  }
};

const mapStateToProps = ({ students }, { id }) => {

  return {
    student: students && students.find(student => student.id === id)
  };
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createStudent: (student) => dispatch(createStudent(student, history)),
    updateStudent: (student, id) => dispatch(updateStudent(student, id, history))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentCreate);