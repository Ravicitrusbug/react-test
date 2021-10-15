import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/studentActions";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";

// validations
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
var numberOnly = RegExp(/^\d+$/);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class StudentForm extends Component {
  state = {
    ...this.returnStateObject(),
    redirect: null,
  };

  returnStateObject() {
    if (this.props.currentIndex == -1)
      return {
        firstname: "",
        lastname: "",
        fathername: "",
        email: "",
        address: "",
        dob: "",
        mobile: "",
        gender: "",
        country: "",
        file: "",
        errors: {
          firstname: "",
          email: "",
          mobile: "",
        },
      };
    else return this.props.list[this.props.currentIndex];
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.currentIndex != this.props.currentIndex ||
      prevProps.list.length != this.props.list.length
    ) {
      this.setState({ ...this.returnStateObject() });
    }
  }

  handleInputChange = (e) => {
    e.preventDefault();
    let errors = this.state.errors;
    console.log(e.target.files);

    switch (e.target.name) {
      case "firstname":
        errors.firstname =
          e.target.value.length < 5
            ? "Full Name must be 5 characters long!"
            : "";
      case "email":
        errors.email = validEmailRegex.test(e.target.value)
          ? ""
          : "Email is not valid!";
      case "mobile":
        errors.mobile = numberOnly.test(e.target.value)
          ? ""
          : "Please enter number only";
        break;
      default:
        break;
    }
    if (e.target.name === "file") {
      let selectedFile = [];
      for (var i = 0; i < e.target.files.length; i++) {
        selectedFile.push(URL.createObjectURL(e.target.files[i]));
      }
      this.setState({ errors, [e.target.name]: selectedFile });
    } else {
      this.setState({ errors, [e.target.name]: e.target.value });
    }
    console.log(this.state);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(this.state.errors)) {
      if (this.props.currentIndex == -1) {
        this.props.insertStudent(this.state);
      } else {
        this.props.updateStudent(this.state);
      }
    } else {
      alert("invalid form");
    }
    if (this.props.currentIndex == -1) {
      this.setState({ redirect: "/students" });
    }
  };

  render() {
    const { errors } = this.state;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <form onSubmit={this.handleSubmit} autoComplete="off">
        <input
          type="file"
          name="file"
          multiple
          onChange={this.handleInputChange}
        />
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            required
            value={this.state.firstname}
            onChange={this.handleInputChange}
            name="firstname"
          />
          {errors.firstname.length > 0 && (
            <span className="error" style={{color:'red'}}>{errors.firstname}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            required
            value={this.state.lastname}
            onChange={this.handleInputChange}
            name="lastname"
          />
        </div>

        <div className="form-group">
          <label htmlFor="father">Father Name</label>
          <input
            type="text"
            className="form-control"
            id="fathername"
            required
            value={this.state.fathername}
            onChange={this.handleInputChange}
            name="fathername"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Id</label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            value={this.state.email}
            onChange={this.handleInputChange}
            name="email"
          />
          {errors.email.length > 0 && (
            <span className="error" style={{color:'red'}}>{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            className="form-control"
            name="address"
            id="address"
            rows="3"
            value={this.state.address}
            onChange={this.handleInputChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile No.</label>
          <input
            type="text"
            className="form-control"
            id="mobile"
            required
            value={this.state.mobile}
            onChange={this.handleInputChange}
            name="mobile"
            maxLength="10"
          />
          {errors.mobile.length > 0 && (
            <span className="error" style={{color:'red'}}>{errors.mobile}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="flexRadioDefault1"
              value="Male"
              checked={this.state.gender === "Male"}
              onChange={this.handleInputChange}
            />
            <label className="form-check-label" for="male">
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="flexRadioDefault2"
              value="FeMale"
              checked={this.state.gender === "FeMale"}
              onChange={this.handleInputChange}
            />
            <label className="form-check-label" for="female">
              Female
            </label>
          </div>
        </div>

        <div className="form-group">
          <Form.Group controlId="dob">
            <Form.Label>DOB</Form.Label>
            <Form.Control
              id="dob"
              required
              value={this.state.dob}
              onChange={this.handleInputChange}
              name="dob"
              type="date"
            />
          </Form.Group>
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <select
            className="form-control"
            value={this.state.country}
            name="country"
            onChange={this.handleInputChange}
          >
            <option value=""></option>
            <option value="India">India</option>
            <option value="Austrlia">Austrlia</option>
            <option value="Europe">Europe</option>
          </select>
        </div>
        <br />
        <button
          type="submit"
          className="btn btn-success"
          onClick={this.props.handler}
        >
          Submit
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list,
    currentIndex: state.currentIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      insertStudent: actions.insert,
      updateStudent: actions.update,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);
