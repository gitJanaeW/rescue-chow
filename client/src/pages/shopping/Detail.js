import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';

import Cart from '../../components/shopping/Cart';
import { useStoreContext } from '../../utils/shopping/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../../utils/shopping/actions';
import { QUERY_PRODUCTS } from '../../utils/shopping/queries';
import { idbPromise, getProceeds } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import ThoughtForm from "../../components/ThoughtForm";
import { ADD_THOUGHTS } from "../../utils/shopping/mutations"

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  // const [getThought, thoughtData] = useLazyQuery(QUERY_THOUGHTS);
  // console.log(data.products);
  const { products, cart } = state;
  console.log(currentProduct)

  useEffect(() => {
    // already in global store
    if (data && data.products && data.products.length) {
      setCurrentProduct(data.products.find((product) => product._id === id));



      // async function getThoughtAsync() {
      //   await getThought({ variables: { product: id } })
      //   // console.log({ thoughtData })
      // }
      // getThoughtAsync();
    }

    // retrieved from server
    // else if (data) {
    //   dispatch({
    //     type: UPDATE_PRODUCTS,
    //     products: data.products,

    //   });

    //   data.products.forEach((product) => {
    //     idbPromise('products', 'put', product);
    //   });
    // }
    //   // get cache from idb
    //   else if (!loading) {
    //   idbPromise('products', 'get').then((indexedProducts) => {
    //     dispatch({
    //       type: UPDATE_PRODUCTS,
    //       products: indexedProducts,
    //     });
    //   });
    // }
  }, [products, data, loading, dispatch, id]);

  function filterThoughts() {
    if (products._id === currentProduct) {
      return state.products
    }

    // if (products.length) {
    //   setCurrentProduct(products.find((product) => product._id === id));
    // }
    // if (currentProduct._id = id) {
    //   return data.products;
    // }

    // return data.products.filter(
    //   (product) => product._id === currentProduct
    // )
  }


  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }

  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise('cart', 'delete', { ...currentProduct });

  };

  return (
    <>
      {currentProduct && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <span>(${getProceeds(currentProduct.price)} to charity)</span>
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/shopping/${currentProduct.image}`}
            alt={currentProduct.name}
          />
          {/* <ThoughtForm></ThoughtForm> */}
          {currentProduct.thoughts &&
            <div>
              Reviews:
              {currentProduct.thoughts.map((e) => {
                return (
                  <div>
                    <h1> Username: {e.username}</h1>
                    <p>Comment:{e.thoughtText}</p>
                  </div>)
              })}
            </div>}
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
