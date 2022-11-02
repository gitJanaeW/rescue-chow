import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../../utils/shopping/queries';
import { idbPromise } from '../../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../../utils/shopping/auth';
import { useStoreContext } from '../../../utils/shopping/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../../utils/shopping/actions';
import './style.css';

const stripePromise = loadStripe('pk_test_51LwAJXFZoRYZwQnKvp7DSqLSz0HG4gAQJjH2JTAIUXOdYLCwSSFX4M4o9j1Yjta226OxbCIrbfyrndJtLmGNyRWh00OtjMPGcA');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  const toLocalStorage = () => {
    state.cart.forEach((item) => {
      localStorage.setItem("cartItems", item);
    });
  }

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const products = [];

    state.cart.forEach((item) => {
      
      const newLine = {prodId: item._id, qnty: item.purchaseQuantity};
      products.push(newLine);
      
    });

    getCheckout({
      variables: { products: products },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  const onlyProceeds = () => {
    const treatRemoved = calculateTotal() / 4;
    return treatRemoved.toFixed(2);
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div onChange={toLocalStorage}>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />

          ))}

          <div className="flex-row space-between">
              <span>25% of this purchase (${onlyProceeds()}) is saving animals!</span>
              <strong>Total: ${calculateTotal()}</strong>
            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;
