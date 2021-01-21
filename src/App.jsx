import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { NavbarComp } from './componentdb';
import {
  RegisterPage,
  LoginPage,
  ProductPage,
  CartPage,
  HistoryTransactionPage,
  ManageProductPage,
} from './pagedb';
import { connect } from 'react-redux';
import {
  keepLoginAction,
  getCartByUserIdAction,
  getTransactionHistoryByUserIDAction,
} from './redux/action';

class App extends Component {
  state = {};
  componentDidMount() {
    const userID_local = localStorage.getItem('id');
    const {
      keepLoginAction,
      getCartByUserIdAction,
      getTransactionHistoryByUserIDAction,
    } = this.props;
    if (userID_local) {
      keepLoginAction(userID_local);
      getCartByUserIdAction(userID_local);
      getTransactionHistoryByUserIDAction(userID_local);
    }
  }
  render() {
    return (
      <div>
        <NavbarComp />
        <Route path="/" exact component={ProductPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/product" component={ProductPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/history" component={HistoryTransactionPage} />
        <Route path="/manage-product" component={ManageProductPage} />
      </div>
    );
  }
}

export default connect(null, {
  keepLoginAction,
  getCartByUserIdAction,
  getTransactionHistoryByUserIDAction,
})(App);
