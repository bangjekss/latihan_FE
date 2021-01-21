import { ProductCardComp } from './';
import React, { useState, Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { getCartByUserIdAction, addToCartAction } from '../redux/action';

// class comp props

class ModalProductComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.image,
      name: props.name,
      price: props.price,
      stock: props.stock,
      caption: props.caption,
      className: props.className,
      modal: false,
      qty: 1,
    };
  }

  toggle = () => {
    return this.setState({
      modal: !this.state.modal,
    });
  };
  qtyDec = () => {
    let { qty } = this.state;
    if (qty === 1) {
      return qty;
    } else {
      this.setState({ qty: qty - 1 });
      // console.log(qty);
    }
  };
  qtyInc = () => {
    let { qty, stock } = this.state;
    if (qty === stock) {
      return qty;
    } else {
      this.setState({ qty: qty + 1 });
      // console.log(qty);
    }
  };
  handleAddToCartBtn = () => {
    const { image, name, price, qty, stock } = this.state;
    const { rxUserId, rxEmail } = this.props; // reducer
    const { addToCartAction, getCartByUserIdAction } = this.props; // action
    const cart = {
      userID: rxUserId,
      name,
      price,
      qty,
      stock,
      image,
    };
    if (!rxEmail) {
      Swal.fire({
        icon: 'error',
        title: 'Not logged in',
        text: 'Please login to continue!',
      });
    }
    addToCartAction(cart, rxUserId);
    getCartByUserIdAction(rxUserId);
  };

  render() {
    const { className, image, name, price, stock, caption, modal, qty } = this.state;
    return (
      <div>
        <div onClick={this.toggle}>
          <ProductCardComp
            image={image}
            name={name}
            price={price}
            stock={stock}
            caption={caption}
          />
        </div>
        <Modal isOpen={modal} toggle={this.toggle} className={className}>
          <ModalHeader toggle={this.toggle}>{name}</ModalHeader>
          <ModalBody className="d-flex">
            <div>
              <img
                src={image}
                alt="err_file"
                width="150"
                height="160"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <h5>Rp{price.toLocaleString()}</h5>
              <div>Stock : {stock}</div>
              <div className="my-3">{caption}</div>
              <div className="d-flex align-items-center">
                <Button color="warning" onClick={this.qtyDec} disabled={qty === 1}>
                  -
                </Button>
                <div className="mx-2">{qty}</div>
                <Button color="warning" onClick={this.qtyInc} disabled={qty === stock}>
                  +
                </Button>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggle}>
              Back
            </Button>
            <Button color="warning" onClick={this.handleAddToCartBtn}>
              Add to Cart
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer }) => {
  return {
    rxUserId: userReducer.id,
    rxEmail: userReducer.email,
  };
};

export default connect(mapStateToProps, { addToCartAction, getCartByUserIdAction })(
  ModalProductComp
);

// const comp

// const ModalProductComp = (props) => {
//   const { buttonLabel, className, image, name, price, stock, caption } = props;

//   const [modal, setModal] = useState(false);

//   const toggle = () => setModal(!modal);
//   let qty = 5;
//   const qtyDec = () => {
//     if (qty === 5) {
//       return qty--;
//     } else {
//       return qty--;
//     }
//   };
//   const qtyInc = () => {};

//   return (
//     <div>
//       {/* <Button color="danger" onClick={toggle}>
//         {buttonLabel}
//       </Button> */}
//       <div onClick={toggle}>
//         <ProductCardComp image={image} name={name} price={price} stock={stock} caption={caption} />
//       </div>
//       <Modal isOpen={modal} toggle={toggle} className={className}>
//         <ModalHeader toggle={toggle}>{name}</ModalHeader>
//         <ModalBody className="d-flex">
//           <div>
//             <img
//               src={image}
//               alt="err_file"
//               width="150"
//               height="160"
//               style={{ objectFit: 'cover' }}
//             />
//           </div>
//           <div>
//             <h5>Rp{price.toLocaleString()}</h5>
//             <div>Stock : {stock}</div>
//             <div className="my-3">{caption}</div>
//             <div className="d-flex align-items-center">
//               <Button color="warning" onClick={qtyDec}>
//                 -
//               </Button>
//               <div className="mx-2">{qty}</div>
//               <Button color="warning">+</Button>
//             </div>
//           </div>
//         </ModalBody>
//         <ModalFooter>
//           <Button color="danger" onClick={toggle}>
//             Back
//           </Button>
//           <Button color="warning" onClick={toggle}>
//             Buy
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// };
