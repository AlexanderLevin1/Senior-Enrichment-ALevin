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
    const { student } = this.props;
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
    if(nextProps.student.firstName !== this.state.firstName) {
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
   console.log('***' + firstName)
    return (
      <div className="default-margins">
        <h2>{!student ? ('Add Student') : (`Edit ${student.fullName}`)}</h2>
        <form className="margin-top-10" display="table">
          <div>
            <label display="table-cell">
              firstName:
        </label>
            <input name="firstName" onChange={onChangeForm} value={firstName} display="table" />
          </div>
          <div>
            <label display="table-cell">
              lastName:
          </label>
            <input name="lastName" onChange={onChangeForm} value={lastName} display="table" />
          </div>
          <div>
            email:
          <input name="email" onChange={onChangeForm} value={email} />
          </div>
          <div>
            imageURL:
          <input name="imageURL" onChange={onChangeForm} value={imageURL} />
          </div>
          <div>
            gpa:
          <input name="gpa" onChange={onChangeForm} value={gpa} />
          </div>
        </form>
        <button onClick={!student ? onCreateStudent : onUpdateStudent}>
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