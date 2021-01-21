import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { deleteCartItemAction, checkoutAction } from '../redux/action';
import { connect } from 'react-redux';

class CartPage extends Component {
  state = {};

  qtyDec = (index) => {
    const { qty } = this.state;
    if (qty === 1) {
      return qty;
    } else {
      // this.setState({ qty: qty - 1 });
      // console.log(qty);
    }
  };
  qtyInc = (index) => {
    const { rxCartList } = this.props;
    if (rxCartList[index].qty === rxCartList[index].stock) {
      return rxCartList[index].qty;
    } else {
      console.log(rxCartList[index].qty);
      return rxCartList[index].qty++;
    }
  };
  renderTable = () => {
    const { rxCartList } = this.props;
    return rxCartList.map((value, index) => {
      return (
        <tr>
          <th>{index + 1}</th>
          <td>{value.name}</td>
          <td>
            <img src={value.image} alt="err_file" width="70" height="70" />
          </td>
          <td className="d-flex align-items-center">
            <Button color="warning" onClick={this.qtyDec}>
              -
            </Button>
            <div className="mx-2">{value.qty}</div>
            <Button color="warning" onClick={() => this.qtyInc(index)}>
              +
            </Button>
          </td>
          <td>Rp{value.price.toLocaleString()}</td>
          <td>Rp{(value.qty * value.price).toLocaleString()}</td>
          <td>
            <Button color="danger" onClick={() => this.deleteCartItem(value.id, value.name)}>
              delete
            </Button>
          </td>
        </tr>
      );
    });
  };
  deleteCartItem = (cartID, cartItemName) => {
    const { rxUserID } = this.props;
    const { deleteCartItemAction } = this.props;
    deleteCartItemAction(cartID, rxUserID, cartItemName);
  };
  renderFinalPrice = () => {
    const { rxCartList } = this.props;
    let finalPrice = 0;
    rxCartList.forEach((value) => {
      finalPrice += value.price * value.qty;
    });
    return finalPrice;
  };
  handleCheckoutBtn = () => {
    const { rxCartList, rxUserID } = this.props;
    const { checkoutAction } = this.props;
    const checkoutData = {
      userID: rxUserID,
      date: new Date(),
      status: 'NOT YET PAID',
      price: this.renderFinalPrice(),
      cart: rxCartList,
    };
    checkoutAction(checkoutData, rxUserID);
  };
  render() {
    const { rxCartList } = this.props;
    return (
      <div className="container my-5 py-5">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th style={{ textAlign: '' }}>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <th>Final Price</th>
              <th>Rp{this.renderFinalPrice().toLocaleString()}</th>
              <td style={{ display: 'flex', justifyContent: '' }}>
                <Button
                  color="warning"
                  onClick={this.handleCheckoutBtn}
                  disabled={rxCartList.length === 0}
                >
                  Checkout
                </Button>
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = ({ cartReducer, userReducer }) => {
  return {
    rxCartList: cartReducer.cart,
    rxUserID: userReducer.id,
  };
};

export default connect(mapStateToProps, { deleteCartItemAction, checkoutAction })(CartPage);
