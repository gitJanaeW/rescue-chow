import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import Cart from "../../components/shopping/Cart";
import { useStoreContext } from "../../utils/shopping/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,

} from '../../utils/shopping/actions';
import { QUERY_PRODUCTS } from '../../utils/shopping/queries';
import { idbPromise, getProceeds } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

import ThoughtForm from "../../components/ThoughtForm";

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const { products, cart } = state;
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // already in global store
    if (data && data.products && data.products.length) {
      setCurrentProduct(data.products.find((product) => product._id === id));
    }
  }, [products, data, loading, dispatch, id]);


  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 });
    }

  };


  return (
    <>
      {currentProduct && cart ? (
        <div className="container my-1">
          <Link to="/shop">← Back to Products</Link>
          <img
            src={`/images/shopping/${currentProduct.image}`}
            alt={currentProduct.name}
          />
          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{" "}
            <span>(${getProceeds(currentProduct.price)} to charity)</span>
            {currentProduct.price && currentProduct.quantity ? (
              <div>
                <button onClick={addToCart}>Add to Cart</button>
              </div>) : <div className="mt-6 flex items-center justify-center">
              <button type="button" className="rounded-md relative w-11/12  py-2 px-8 outline outline-gray-400  outline-1
         bg-gray-100 text-red-600 hover:bg-red-600 hover:text-black hover:outline hover:outline-2 
         hover:outline-black ">Out of stock</button> </div>}

          </p>

          <ThoughtForm></ThoughtForm>
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
