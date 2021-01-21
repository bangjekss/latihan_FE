import React, { useState, Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAction, getCartByUserIdAction } from '../redux/action';
import { avaIcon, logoYuchase, shoppingCartLogo } from '../spritedb';
import { BadgeShoppingCartComp } from './';

// const Navbarccc = (props) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);

//   return (
//     <div>
//       <Navbar
//         color="light"
//         light
//         expand="md"
//         style={{ boxShadow: '0px 1px 15px 1px rgba(0,0,0,0.3)' }}
//       >
//         <NavbarBrand href="/">reactstrap</NavbarBrand>
//         <NavbarToggler onClick={toggle} />
//         <Collapse isOpen={isOpen} navbar>
//           <Nav className="mr-auto" navbar>
//             <NavItem>
//               <NavLink>
//                 <Link to="/product">
//                   <NavbarText>ALL PRODUCT</NavbarText>
//                 </Link>
//               </NavLink>
//             </NavItem>
//             {/* <NavItem>
//               <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
//             </NavItem>
//             <UncontrolledDropdown nav inNavbar>
//               <DropdownToggle nav caret>
//                 Options
//               </DropdownToggle>
//               <DropdownMenu right>
//                 <DropdownItem>Option 1</DropdownItem>
//                 <DropdownItem>Option 2</DropdownItem>
//                 <DropdownItem divider />
//                 <DropdownItem>Reset</DropdownItem>
//               </DropdownMenu>
//             </UncontrolledDropdown> */}
//           </Nav>
//           <Nav>
//             <NavItem>
//               <Link to="/login">
//                 <Button color="warning">Login</Button>
//               </Link>
//             </NavItem>
//             <NavItem>
//               <Link to="/register">
//                 <Button color="warning">Register</Button>
//               </Link>
//             </NavItem>
//             <NavItem>
//               <Button color="danger">Logout</Button>
//             </NavItem>
//           </Nav>
//         </Collapse>
//       </Navbar>
//     </div>
//   );
// };
// const useStyles = makeStyles();

class NavbarComp extends Component {
  state = {
    isOpen: false,
  };
  // componentDidMount() {
  //   const { rxUserID } = this.props;
  //   const { getCartByUserIdAction } = this.props;
  //   getCartByUserIdAction(rxUserID);
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   if
  // }
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  handleLogoutBtn = () => {
    return this.props.logoutAction();
  };
  render() {
    const classes = this.state.useStyles;
    const { rxUserID, rxCartLength, rxUsername } = this.props;
    return (
      <div>
        <Navbar
          className="px-5"
          color="light"
          light
          expand="md"
          style={{ boxShadow: '0px 1px 15px 1px rgba(0,0,0,0.3)' }}
        >
          <NavbarBrand href="/">
            <Link to="/product">
              <img src={logoYuchase} alt="err_file" style={{ width: '70px', height: '60px' }} />
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink>
                  <Link to="/product">
                    <NavbarText>
                      <b>ALL PRODUCT</b>
                    </NavbarText>
                  </Link>
                </NavLink>
              </NavItem>
            </Nav>
            {/* ternery */}
            {rxUserID ? (
              <Nav className="align-items-center" navbar>
                <NavItem className="mr-4">
                  <Link to="/cart">
                    <BadgeShoppingCartComp cartLength={rxCartLength} />
                  </Link>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <img src={avaIcon} alt="err_file" style={{ width: '40px', height: '40px' }} />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Hi, {rxUsername}</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Setting</DropdownItem>
                    <DropdownItem>
                      <Link to="/history">Transactions History</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/manage-product">Manage Product</Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <div onClick={this.handleLogoutBtn}>Logout</div>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            ) : (
              <Nav>
                <NavItem>
                  <Link to="/login">
                    <Button color="warning">Login</Button>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/register">
                    <Button color="warning">Register</Button>
                  </Link>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, cartReducer }) => {
  return {
    rxUserID: userReducer.id,
    rxUsername: userReducer.username,
    rxCartLength: cartReducer.cart.length,
  };
};

export default connect(mapStateToProps, { logoutAction, getCartByUserIdAction })(NavbarComp);
