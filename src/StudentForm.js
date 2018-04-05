import React, { Component } from 'react';
import { deleteStudent, saveStudent } from './store';
import { connect } from 'react-redux';

class StudentUpdate extends Component{
  constructor({ student }){
    super();
    this.onChangeName = this.onChangeName.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDestroy = this.onDestroy.bind(this);

    this.state = {
      name: student ? student.name : '' 
    };
  }
  onDestroy(ev){
    ev.preventDefault();
    this.props.deleteStudent(this.props.student);
  }
  componentWillReceiveProps(nextProps){
    const { student } = nextProps;
    this.setState({ name: student ? student.name: '' });
  }
  onSave(ev){
    ev.preventDefault();
    const { savestudent, student } = this.props;
    const { name } = this.state;
    saveStudent({ id: student ? student.id : null, name });
  }
  onChangeName(ev){
    this.setState({ name: ev.target.value });
  }
  render(){
    const { onChangeName, onSave, onDestroy } = this;
    const { name } = this.state;
    const { id } = this.props;
    return (
      <div>
      <form onSubmit={ onSave }>
        <input value={ name } onChange={ onChangeName }/>
        <button>{ id ? ('Update') : ('Create') }</button>
      </form>
      {
        id && (
          <button onClick={ onDestroy }>Delete</button>
        )
      }
      </div>
    );
  }
}

const mapStateToProps = ({ students }, { id })=> {
  const student = students.find( student => student.id === id);
  return {
    student
  };
}

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    saveStudent: (student)=> dispatch(saveStudent(student, history)),
    deleteStudent: (student)=> dispatch(deleteStudent(student.id, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(studentUpdate);