import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import { registerAciton } from '../redux/action';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { api_url } from '../favordb/api_url';
import Axios from 'axios';

class RegisterPage extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    cpassword: '',
  };

  handleFormInput = (e) => {
    // const { username, email, password, cpassword } = this.state;
    // const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-\.]{2,4}$/;
    // const passwordValidation = /^(?=.*[\d])(?=.*[`~!@#$%^&*\-_])(?=.*[A-Z])[\w]{8,16}$/;
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
    });
    // email.match(emailValidation) ? console.log(true) : console.log(false);
    // password.match(passwordValidation) ? console.log(true) : console.log(false);
    // console.log(this.state);
  };

  handleRegisBtn = () => {
    const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-\.]{2,4}$/;
    const passwordValidation = /^(?=.*[\d])(?=.*[`~!@#$%^&*\-_])(?=.*[A-Z])[\w]{8,16}$/;
    const { username, email, password, cpassword } = this.state;
    if (username) {
      if (email) {
        if (password) {
          if (cpassword) {
            if (cpassword === password) {
              if (email.match(emailValidation)) {
                if (password.match(passwordValidation)) {
                  Axios.get(`${api_url}/userdb?email=${email}`)
                    .then((res) => {
                      console.log('GET_userdb - SUCCESS');
                      console.log(res.data[0]);
                      if (!res.data[0]) {
                        Axios.post(`${api_url}/userdb`, {
                          username,
                          email,
                          password,
                        })
                          .then((res) => {
                            console.log('POST_userdb - SUCCESS');
                            return alert(`Welcome ${username}!^_^!`);
                          })
                          .catch((err) => console.log(err));
                      } else {
                        document.getElementById('email').value = '';
                        return alert('email already in use');
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  return alert(
                    'Password must contain at least one digit, one uppercase letter, one special character, and minimum of 8 characters and a maximum of 16 characters'
                  );
                }
              } else {
                return alert('Invalid email');
              }
            } else {
              document.getElementById('password').value = '';
              document.getElementById('cpassword').value = '';
              return alert("Your password doesn't match");
            }
          } else {
            return alert('Please, retype your password!!');
          }
        } else {
          return alert('Fill the password field!!');
        }
      } else {
        return alert('Fill the email field!!');
      }
    } else {
      return alert('Fill the username field!!');
    }
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <div
          style={{
            backgroundColor: ' rgba(100, 202, 0, 0.8)',
            width: '600px',
            borderRadius: '25px',
            boxShadow: '0px 5px 50px 5px rgba(255, 202, 0, 1)',
          }}
        >
          <div
            className="d-flex justify-content-center p-3 mt-2"
            style={{ borderBottom: '1px solid rgba(0,0,0,0.2)', color: 'black' }}
          >
            <h4>REGISTER</h4>
          </div>
          <div className="d-flex py-5" style={{ flexDirection: 'column', padding: '0 100px' }}>
            <div style={{ marginBottom: '25px' }}>
              <Input
                onChange={this.handleFormInput}
                style={{ padding: '25px', borderRadius: '30px' }}
                type="text"
                placeholder="username"
                id="username"
              ></Input>
            </div>
            <div style={{ marginBottom: '25px' }}>
              <Input
                onChange={this.handleFormInput}
                style={{ padding: '25px', borderRadius: '30px' }}
                type="email"
                placeholder="email"
                id="email"
              ></Input>
            </div>
            <div style={{ marginBottom: '25px' }}>
              <Input
                onChange={this.handleFormInput}
                style={{ padding: '25px', borderRadius: '30px' }}
                type="password"
                placeholder="password"
                id="password"
              ></Input>
            </div>
            <div style={{ marginBottom: '25px' }}>
              <Input
                onChange={this.handleFormInput}
                style={{ padding: '25px', borderRadius: '30px' }}
                type="password"
                placeholder="re-type password"
                id="cpassword"
              ></Input>
            </div>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              className="my-2"
            >
              <a href="#">Have an account?</a>
              <Button
                style={{ borderRadius: '30px' }}
                color="primary"
                className="px-3 py-2"
                onClick={this.handleRegisBtn}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {

// }

export default RegisterPage;
