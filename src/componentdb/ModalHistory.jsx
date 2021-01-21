import React, { useState, Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { getTransactionHistoryByUserIDAction } from '../redux/action';

// const ModalExample = (props) => {
//   const { buttonLabel, className } = props;

//   const [modal, setModal] = useState(false);

//   const toggle = () => setModal(!modal);

//   return (

//   );
// };

class ModalHistoryComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      item: props.item,
    };
  }
  // componentDidMount() {
  //   const { getTransactionHistoryByUserIDAction } = this.props;
  //   const { rxUserID } = this.props;
  //   getTransactionHistoryByUserIDAction(rxUserID);
  // }
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleShowBtn = () => {
    this.setState({ modal: !this.state.modal });
    // const { item } = this.state;
    // console.log(item.cart[0]);
  };
  renderTable = () => {
    const { item } = this.state;
    return item.cart.map((value, index) => {
      return (
        <tr>
          <th>{index + 1}</th>
          <td>{value.name}</td>
          <td>
            <img
              src={value.image}
              alt="err_file"
              width="75"
              height="80"
              style={{ objectFit: 'cover' }}
            />
          </td>
          <td>Rp{value.price.toLocaleString()}</td>
          <td>{value.qty}</td>
        </tr>
      );
    });
  };
  render() {
    return (
      <div>
        <Button color="warning" onClick={this.handleShowBtn}>
          Show
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}># Transaction History</ModalHeader>
          <ModalBody>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>{this.renderTable()}</tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggle}>
              Back
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer }) => {
  return {
    rxUserID: userReducer.id,
  };
};

export default connect(mapStateToProps, { getTransactionHistoryByUserIDAction })(ModalHistoryComp);
