import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import { registerLoginAction, getCartByUserIdAction } from '../redux/action';
import { connect } from 'react-redux';
import Axios from 'axios';
import { api_url } from '../favordb/api_url';
import { Redirect } from 'react-router-dom';

class LoginPage extends Component {
  state = {
    formInputTemp: {
      email: '',
      password: '',
    },
  };

  handleFormInput = (e) => {
    this.setState({
      formInputTemp: {
        ...this.state.formInputTemp,
        [e.target.id]: e.target.value,
      },
    });
  };

  handleLoginBtn = () => {
    const { email, password } = this.state.formInputTemp;
    const { registerLoginAction, getCartByUserIdAction } = this.props;
    Axios.get(`${api_url}/userdb?email=${email}&password=${password}`)
      .then((res) => {
        if (res.data[0]) {
          // console.log(res.data[0]);
          // console.log(localStorage);
          console.log('GET_userLogin - SUCCESS');
          registerLoginAction(res.data[0]);
          localStorage.setItem('id', res.data[0].id);
          getCartByUserIdAction(res.data[0].id);
        } else {
          return alert('The email address or password you entered is incorrect');
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { rxEmail } = this.props;
    if (rxEmail) {
      return <Redirect to="/product" />;
    }
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
            <h4>Login</h4>
          </div>
          <div className="d-flex py-5" style={{ flexDirection: 'column', padding: '0 100px' }}>
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
            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              className="my-2"
            >
              <a href="#">Haven't an account?</a>
              <Button
                style={{ borderRadius: '30px' }}
                color="primary"
                className="px-3 py-2"
                onClick={this.handleLoginBtn}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer }) => {
  return {
    rxEmail: userReducer.email,
  };
};

export default connect(mapStateToProps, { registerLoginAction, getCartByUserIdAction })(LoginPage);
