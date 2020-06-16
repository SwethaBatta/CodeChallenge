import React, { Component } from "react";
import "./SubmissionForm.scss";
import axios from "axios";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
const config = require("./../config");

const styles = {
  Asterisk: {
    color: "red",
    padding: "0px",
  },
};

class SubmissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      company: "",
      salary: "",
      success: "",
      userData: {},
      disabled: "",
      errorMsgEmail: "",
      errorMsgSalary: "",
      error: "",
      msg: "",
      left: -500,
    };
  }

  handleTextFieldChange = (e) => {
    let nam = e.target.name;
    let val = e.target.value;
    let err = "";

    if (nam === "email") {
      if (val.indexOf("@") === -1) {
        err = <strong>Your email should contain @</strong>;
        this.setState({ errorMsgEmail: err });
      } else {
        this.setState({ errorMsgEmail: "" });
      }
    }

    if (nam === "salary") {
      if (val !== "" && !Number(val)) {
        err = <strong>Your salary must be a number</strong>;
        this.setState({ errorMsgSalary: err });
      } else {
        this.setState({ errorMsgSalary: "" });
      }
    }

    this.setState({ [nam]: val });
  }

  validate() {
    return this.state.errorMsgSalary === "" && this.state.errorMsgEmail === "";
  }

  pageRefresh() {
    window.location.reload(false);
  }

  updateUser = (e) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    e.preventDefault();
    const err = this.validate();
    if (err) {
      this.setState({ error: "false" });
      const {
        firstName,
        lastName,
        email,
        address,
        company,
        salary,
      } = this.state;
      var timestamp = new Date().toISOString();
      const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        company: company,
        salary: salary,
        timestamp: timestamp,
      };

      fetch(`${config.URL}/form`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.msg === "success") {
            this.setState(
              {
                success: "true",
                disabled: "disabled",
                left: 16,
              },
              () => {
                setTimeout(() => {
                  this.pageRefresh();
                }, 3000);
              }
            );
          } else {
            this.setState({ success: "false", msg: data.msg, left: 16 }, () => {
              setTimeout(() => {
                this.setState({ left: -500 });
              }, 3000);
            });
          }
        });

      axios.get(`${config.URL}/form/${email}`).then((res) => {
        const userData = res.data[0];
        this.setState({ userData });
      });
    } else {
      this.setState({ error: "true", left: 16 }, () => {
        setTimeout(() => {
          this.setState({ left: -500 });
        }, 3000);
      });
    }
    this.setState({ success: "" });
  }

  render() {
    return (
      <div className="submissionForms">
        <Row>
          <Col xs={4} s={6} md={8}>
            <form onSubmit={this.updateUser}>
              <div>
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="FirstName">
                      First Name
                      <label style={styles.Asterisk}>*</label>
                    </label>
                  </div>
                  <div className="col-75">
                    <input
                      required
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      onChange={(e) => this.handleTextFieldChange(e)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-25">
                    <label htmlFor="LastName">
                      Last Name
                      <label style={styles.Asterisk}>*</label>
                    </label>
                  </div>
                  <div className="col-75">
                    <input
                      required
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      onChange={(e) => this.handleTextFieldChange(e)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-25">
                    <label htmlFor="Email">
                      Email<label style={styles.Asterisk}>*</label>
                    </label>
                  </div>
                  <div className="col-75">
                    <input
                      required
                      type="text"
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      onChange={(e) => this.handleTextFieldChange(e)}
                    />
                    <p style={{ color: "red" }}>{this.state.errorMsgEmail}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-25">
                    <label htmlFor="Address">Address</label>
                  </div>
                  <div className="col-75">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Address"
                      onChange={(e) => this.handleTextFieldChange(e)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-25">
                    <label htmlFor="Company">
                      Company
                      <label style={styles.Asterisk}>*</label>
                    </label>
                  </div>
                  <div className="col-75">
                    <input
                      required
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Company"
                      onChange={(e) => this.handleTextFieldChange(e)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-25">
                    <label htmlFor="Salary">
                      Salary<label style={styles.Asterisk}>*</label>
                    </label>
                  </div>
                  <div className="col-75">
                    <input
                      required
                      type="text"
                      id="salary"
                      name="salary"
                      placeholder="Salary"
                      onChange={(e) => this.handleTextFieldChange(e)}
                    />
                    <p style={{ color: "red" }}>{this.state.errorMsgSalary}</p>
                  </div>
                </div>

                <div style={{ paddingTop: "20px" }}>
                  <div className="col-25">
                    <input
                      type="submit"
                      className="button"
                      value="Submit"
                      disabled={this.state.disabled}
                    />
                  </div>
                </div>
              </div>
            </form>
          </Col>
          {this.state.success === "true" ? (
            <div
              className="banner successBanner"
              style={{ left: this.state.left }}
            >
              <h6>Your details have been successfully submitted.</h6>
            </div>
          ) : (
            ""
          )}
          {this.state.error === "true" ? (
            <div
              className="banner failedBanner"
              style={{ left: this.state.left }}
            >
              <h6>Something went wrong. Please check your fields.</h6>
            </div>
          ) : (
            ""
          )}
          {this.state.success === "false" ? (
            <div
              className="banner errorBanner"
              style={{ left: this.state.left }}
            >
              <h6>Submission failed due to {this.state.msg}. Please retry.</h6>
            </div>
          ) : (
            ""
          )}

          {Object.keys(this.state.userData).length > 0 &&
          this.state.success === "true" ? (
            <Col xs={6} md={4}>
              <p>
                <b>First Name:</b> {this.state.userData.firstName}
              </p>
              <br />
              <p>
                <b>Last Name:</b> {this.state.userData.lastName}
              </p>
              <br />
              <p>
                <b>Email:</b> {this.state.userData.email}
              </p>
              <br />
              <p>
                <b>Address:</b> {this.state.userData.address}
              </p>
              <br />
              <p>
                <b>Company:</b> {this.state.userData.company}
              </p>
              <br />
              <p>
                <b>Salary:</b> {this.state.userData.salary}
              </p>
            </Col>
          ) : (
            ""
          )}
        </Row>
      </div>
    );
  }
}

export default SubmissionForm;
