import React, { Component } from "react";
import StudentForm from "./StudentForm";
import { connect } from "react-redux";
import * as actions from "../actions/studentActions";
import { bindActionCreators } from "redux";
import { Modal, Button } from "react-bootstrap";
import logo from "../images/150.png";

class StudentList extends Component {
  handleEdit = (index) => {
    this.setState({ isOpen: true });
    this.props.updateStudentIndex(index);
  };

  handleDelete = (index) => {
    this.props.deleteStudent(index);
  };

  state = {
    isOpen: false,
  };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  render() {
    const imageStyle = {
      borderRadius: "50px",
      width: "100px",
      height: "100px"
    };
    return (
      <div className="list row">
        <div className="col-md-12">
          <h4>Students List</h4>

          <table class="table">
            <thead>
              <tr>
                <th>Photos</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Father Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.list.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.file && item.file.length > 0 ? item.file.map(src => (
                      <img src={src} style={imageStyle}></img>
                    )) : <img style={imageStyle} src={logo}/>}</td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                    <td>{item.fathername}</td>
                    <td>
                      <button className="btn btn-primary btn-sm" onClick={() => this.handleEdit(index)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(index)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Modal show={this.state.isOpen} onHide={this.closeModal}>
            <Modal.Header>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <StudentForm handler={this.closeModal}/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.closeModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateStudentIndex: actions.updateIndex,
      deleteStudent: actions.Delete,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
