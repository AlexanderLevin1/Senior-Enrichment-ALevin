import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent, updateStudent } from './store';

class StudentForm extends Component {
  constructor(props) {
    super(props);
    const { student } = props;
    this.state = {
      firstName: !student ? '' : student.firstName,
      lastName: !student ? '' : student.lastName,
      email: !student ? '' : student.email,
      imageURL: !student ? '' : student.imageURL,
      gpa: !student ? 0 : student.gpa * 1,
      inputError: {},
      inputEdited: {}
    }

      // -------------------- VALIDATORS ---------------------
    this.validators = {
      email: value => {
        const emailFormat = /\S+@\S+\.\S+/;
        if (!emailFormat.test(value)) {
          return `e-mail must be valid e-mail format with @`;
        }
      }
    };

  // -------------------- BIND METHODS THIS ---------------------

    this.onChangeForm = this.onChangeForm.bind(this)
    this.onCreateStudent = this.onCreateStudent.bind(this)
    this.onUpdateStudent = this.onUpdateStudent.bind(this);
  }

    // -------------------- METHODS ---------------------

  onChangeForm(ev) {
    const inputName = ev.target.name;
    const inputValue = ev.target.value;
    const { inputEdited } = this.state;
    inputEdited[inputName] = true;
    this.setState({ [inputName]: inputValue, inputEdited });
    ev.preventDefault();
  }

  onCreateStudent(ev) {
    const { student, campus } = this.props;
    const { firstName, lastName, email, imageURL, gpa } = this.state;
    const inputError = Object.keys(this.validators).reduce((errors, field) => {
      const validator = this.validators[field];
      const value = this.state[field];
      const error = validator(value);
      if (error) {
        errors[field] = error;
      }
      return errors;
    }, {});
    ev.preventDefault();
    this.setState({ inputError, inputEdited: {} });
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
    const inputError = Object.keys(this.validators).reduce((errors, field) => {
      const validator = this.validators[field];
      const value = this.state[field];
      const error = validator(value);
      if (error) {
        errors[field] = error;
      }
      return errors;
    }, {});
    ev.preventDefault();
    this.setState({ inputError, inputEdited: {} });
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
  };

  // -------------------- RENDER ---------------------

  render() {
    const { onCreateStudent, onChangeForm, onUpdateStudent } = this;
    const { student } = this.props;
    const { firstName, lastName, email, imageURL, gpa, inputEdited, inputError } = this.state;
    const fields = { firstName: 'First Name', lastName: 'Last Name', email: 'E-mail', imageURL: 'imageURL', gpa: 'gpa' };
    const fieldsName = { firstName: 'First Name', lastName: 'Last Name' };
    const inputEmpty = Object.keys(fields).some(field => !this.state[field].length);
    return (
      <div className="card text-center">
        <div className="card-header">
          <h2>{!student ? ('Add Student') : (`Edit ${student.fullName}`)}</h2>
        </div>
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
        <button
          disabled={!firstName || !lastName}
          className="btn btn-primary" onClick={!student ? onCreateStudent : onUpdateStudent}>
          {!student ? ('Add') : ('Edit')} Student
        </button>
        {
          Object.keys(fieldsName).map(field => {
            return inputEdited[field] && !this.state[field].length &&
              <div key={field} className='alert alert-danger'>
                {`Please input Student's ${fieldsName[field].toLowerCase()}`}
              </div>;
          })
        }
        {
          !inputEdited.email && inputError.email && (<div className='alert alert-danger'>
            {inputError.email}
          </div>)
        }
        {
          inputEdited.gpa && (gpa < 0 || gpa > 4) &&
          (<div className='alert alert-danger'>
            {`GPA must be a number between 0 and 4`}
          </div>)
        }
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
    updateStudent: (student, id) => dispatch(updateStudent(student, id, history)),
    deleteStudent: (student) => dispatch(deleteStudent(student))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);

