import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { ModalHistoryComp } from '../componentdb';

class HistoryTransactionPage extends Component {
  state = {};
  renderTable = () => {
    const { rxTransactionHistory } = this.props;
    return rxTransactionHistory.map((value, index) => {
      return (
        <tr>
          <th>{index + 1}</th>
          <td>{value.date}</td>
          <td>Rp{value.price.toLocaleString()}</td>
          <td>
            {/* <Button color="warning" onClick={this.handleShowBtn}>
              Show
            </Button> */}
            <ModalHistoryComp item={rxTransactionHistory[index]} />
          </td>
        </tr>
      );
    });
  };
  handleShowBtn = () => {};
  render() {
    return (
      <div className="container my-5 py-5">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = ({ historyReducer }) => {
  return {
    rxTransactionHistory: historyReducer.transactiondb,
  };
};

export default connect(mapStateToProps)(HistoryTransactionPage);
