import React from 'react';
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from './shopping-bag.svg';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemCount}</span>
  </div>
);

//Fires CART.ACTION
const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});


//redux selector
const mapStateToProps = (state) => ({
  itemCount: selectCartItemsCount(state)
});



export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);