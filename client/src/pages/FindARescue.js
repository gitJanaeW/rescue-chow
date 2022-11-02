import React, { useEffect, useState } from "react";
import { useStoreContext } from "../utils/shopping/GlobalState";
import { UPDATE_PRODUCTS } from "../utils/shopping/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS, QUERY_CHECKOUT } from "../utils/shopping/queries";
import { idbPromise } from "../utils/helpers";
import { useLazyQuery } from "@apollo/client";
import {
  ADD_MULTIPLE_TO_CART,
  ADD_RESCUE_CHECKOUT,
  TOGGLE_CART,
} from "../utils/shopping/actions";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51LwAJXFZoRYZwQnKvp7DSqLSz0HG4gAQJjH2JTAIUXOdYLCwSSFX4M4o9j1Yjta226OxbCIrbfyrndJtLmGNyRWh00OtjMPGcA"
);

function FindARescue() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const [radio, setRadio] = useState("None");
  const [getCheckout, { checkoutData }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  useEffect(() => {
    if (checkoutData) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      checkoutData.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [checkoutData, loading, dispatch]);


  function filterProducts() {
    if (!currentCategory) {
      return state.products;

    }
    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  function submitCheckout(e) {
    e.preventDefault();
    const productIds = [];
    dispatch({
      type: ADD_RESCUE_CHECKOUT,
      selectedRescueValue: radio,
    });
    dispatch({ type: TOGGLE_CART });
    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }
  return (
    <div className="flex justify-center align-center">
      <legend className="text-lg font-medium text-gray-900">Our Rescues</legend>
      <div className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
        {filterProducts().map((product) =>
          product.category.name === "Rescues" ? (
            <div className="relative flex items-start py-4">
              <div className="min-w-0 flex-1 text-sm">
                <p className="select-none font-medium text-gray-700">
                  {product.name}
                  {product.website}
                  {product.description}
                </p>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default FindARescue;