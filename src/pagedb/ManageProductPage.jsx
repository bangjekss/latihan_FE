import React, { Component } from 'react';
import { Table, Button, Input } from 'reactstrap';
import { connect } from 'react-redux';
import {
  getProductdb,
  deleteProductAction,
  patchProductAction,
  postProductAction,
} from '../redux/action';
import Swal from 'sweetalert2';

class ManageProduct extends Component {
  state = {
    dataSelected: null,
    data: null,
    editInputTemp: {
      name: null,
      image: null,
      price: null,
      stock: null,
      caption: null,
    },
    addInputTemp: {
      name: null,
      image: null,
      price: null,
      stock: null,
      caption: null,
    },
  };
  componentDidMount() {
    const { getProductdb } = this.props; // action
    getProductdb();
  }
  renderTable = () => {
    const { rxProductdb } = this.props;
    const { dataSelected } = this.state;
    return rxProductdb.map((value, index) => {
      if (dataSelected === value.id) {
        return (
          <tr>
            <th>{index + 1}</th>
            <td>
              <Input
                placeholder="Name"
                defaultValue={value.name}
                id="name"
                onChange={this.handleEditInput}
              />
            </td>
            <td>
              <Input
                placeholder="Image URL"
                defaultValue={value.image}
                id="image"
                onChange={this.handleEditInput}
              ></Input>
            </td>
            <td>
              <Input
                placeholder="Price"
                defaultValue={value.price}
                id="price"
                onChange={this.handleEditInput}
              ></Input>
            </td>
            <td>
              <Input
                placeholder="Stock"
                defaultValue={value.stock}
                id="stock"
                onChange={this.handleEditInput}
              ></Input>
            </td>
            <td>
              <Input
                placeholder="Caption"
                defaultValue={value.caption}
                id="caption"
                onChange={this.handleEditInput}
              ></Input>
            </td>
            <td>
              <Button color="warning" onClick={() => this.handleSaveBtn(value.id)}>
                Save
              </Button>
            </td>
            <td>
              <Button color="danger" onClick={this.handleCancelBtn}>
                Cancel
              </Button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr>
            <th>{index + 1}</th>
            <td>{value.name}</td>
            <td>
              <img
                src={value.image}
                alt="err_file"
                width="70"
                height="70"
                style={{ objectFit: 'cover' }}
              />
            </td>
            <td>Rp{value.price.toLocaleString()}</td>
            <td>{value.stock}</td>
            <td style={{ maxWidth: '200px' }}>{value.caption}</td>
            <td>
              <Button color="warning" onClick={() => this.handleEditBtn(value.id)}>
                Edit
              </Button>
            </td>
            <td>
              <Button color="danger" onClick={() => this.handleDeleteBtn(value.id)}>
                delete
              </Button>
            </td>
          </tr>
        );
      }
    });
  };
  handleSaveBtn = (productID) => {
    this.setState({ dataSelected: null });
    const { patchProductAction } = this.props;
    const { editInputTemp } = this.state;
    patchProductAction(productID, editInputTemp);
    // console.log(editInputTemp);
  };
  handleEditInput = (e) => {
    this.setState({
      editInputTemp: {
        ...this.state.editInputTemp,
        [e.target.id]: e.target.value,
      },
    });
    if (e.target.id === 'price' || e.target.id === 'stock') {
      this.setState({
        editInputTemp: {
          ...this.state.editInputTemp,
          [e.target.id]: parseInt(e.target.value),
        },
      });
    }
    console.log(this.state.editInputTemp);
  };

  handleEditBtn = (productID) => {
    const { rxProductdb } = this.props;
    const { dataSelected, editInputTemp } = this.state;
    const findProduct = rxProductdb.find((value) => {
      return value.id === productID;
    });
    this.setState({ dataSelected: productID, editInputTemp: findProduct });
    console.log(editInputTemp);
  };
  handleCancelBtn = () => {
    this.setState({ dataSelected: null });
  };
  handleDeleteBtn = (productID) => {
    const { deleteProductAction } = this.props;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProductAction(productID);
      }
    });
  };
  handleAddInput = (e) => {
    this.setState({
      addInputTemp: {
        ...this.state.addInputTemp,
        [e.target.id]: e.target.value,
      },
    });
    if (e.target.id === 'price' || e.target.id === 'stock') {
      this.setState({
        addInputTemp: {
          ...this.state.addInputTemp,
          [e.target.id]: parseInt(e.target.value),
        },
      });
    }
    console.log(this.state.addInputTemp);
  };
  handleAddProductBtn = () => {
    const { postProductAction } = this.props;
    const { addInputTemp } = this.state;
    postProductAction(addInputTemp);
    document.getElementById('name').value = '';
    document.getElementById('image').value = '';
    document.getElementById('price').value = '';
    document.getElementById('stock').value = '';
    document.getElementById('caption').value = '';
  };
  render() {
    return (
      <div className="container my-5 py-5">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Caption</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
          <tfoot>
            <th>#</th>
            <td>
              <Input placeholder="Name" id="name" onChange={this.handleAddInput}></Input>
            </td>
            <td>
              <Input placeholder="Image URL" id="image" onChange={this.handleAddInput}></Input>
            </td>
            <td>
              <Input placeholder="Price" id="price" onChange={this.handleAddInput}></Input>
            </td>
            <td>
              <Input placeholder="Stock" id="stock" onChange={this.handleAddInput}></Input>
            </td>
            <td>
              <Input placeholder="Caption" id="caption" onChange={this.handleAddInput}></Input>
            </td>
            <td colSpan={2}>
              <Button color="warning" onClick={this.handleAddProductBtn}>
                Add Product
              </Button>
            </td>
          </tfoot>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = ({ productReducer }) => {
  return {
    rxProductdb: productReducer.productdb,
  };
};

export default connect(mapStateToProps, {
  getProductdb,
  deleteProductAction,
  patchProductAction,
  postProductAction,
})(ManageProduct);
