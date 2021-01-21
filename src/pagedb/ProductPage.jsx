import React, { Component } from 'react';
import { ModalProductComp } from '../componentdb/';
import { connect } from 'react-redux';
import { getProductdb } from '../redux/action';
import { loadingbg } from '../spritedb';

class ProductPage extends Component {
  state = {};

  componentDidMount() {
    const { getProductdb } = this.props;
    getProductdb();
  }

  renderCard = () => {
    const { rxProductdb } = this.props;
    return rxProductdb.map((value, index) => {
      return (
        <div className="mx-2 mb-4">
          <ModalProductComp
            image={value.image}
            name={value.name}
            price={value.price}
            stock={value.stock}
            caption={value.caption}
          />
        </div>
      );
    });
  };
  render() {
    const { rxIsLoading } = this.props;
    if (rxIsLoading) {
      return (
        <div
          style={{
            height: '100vh',
            background: `url(${loadingbg}) no-repeat center`,
            position: 'relative',
            top: '-50px',
          }}
        ></div>
      );
    }
    return (
      <div
        className="container d-flex flex-wrap"
        style={{ padding: '100px 0', justifyContent: 'space-evenly' }}
      >
        {/* <ProductCardComp /> */}
        {this.renderCard()}
      </div>
    );
  }
}

const mapStateToProps = ({ productReducer }) => {
  return {
    rxIsLoading: productReducer.isLoading,
    rxProductdb: productReducer.productdb,
  };
};

export default connect(mapStateToProps, { getProductdb })(ProductPage);
