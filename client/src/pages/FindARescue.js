import React, { useEffect } from "react";
import { useStoreContext } from "../utils/shopping/GlobalState";
import { UPDATE_PRODUCTS } from "../utils/shopping/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS, QUERY_CHECKOUT } from "../utils/shopping/queries";
import { idbPromise } from "../utils/helpers";
import { useLazyQuery } from "@apollo/client";
import { ADD_MULTIPLE_TO_CART } from "../utils/shopping/actions";
import { loadStripe } from "@stripe/stripe-js";
import img from "../assets/cat-and-girl.jpg";

const stripePromise = loadStripe(
  "pk_test_51LwAJXFZoRYZwQnKvp7DSqLSz0HG4gAQJjH2JTAIUXOdYLCwSSFX4M4o9j1Yjta226OxbCIrbfyrndJtLmGNyRWh00OtjMPGcA"
);

function FindARescue() {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const [{ checkoutData }] = useLazyQuery(QUERY_CHECKOUT);

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
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Rescues
          </h2>
        </div>

        <div className="mt-16 space-y-16">
          {filterProducts().map((product, productIdx) =>
            product.category.name === "Rescues" ? (
              <div
                key={product.name}
                className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"
              >
                <div
                  className={classNames(
                    productIdx % 2 === 0
                      ? "lg:col-start-1"
                      : "lg:col-start-8 xl:col-start-9",
                    "mt-6 lg:mt-0 lg:row-start-1 lg:col-span-5 xl:col-span-4"
                  )}
                >
                  <a href={product.website} target="_blank">
                    <h3 className="text-lg font-medium text-gray-900">
                      {product.name}
                    </h3>
                  </a>
                  <p className="mt-2 text-sm text-gray-500">
                    {product.description}
                  </p>
                </div>
                <div
                  className={classNames(
                    productIdx % 2 === 0
                      ? "lg:col-start-6 xl:col-start-5"
                      : "lg:col-start-1",
                    "flex-auto lg:row-start-1 lg:col-span-7 xl:col-span-8"
                  )}
                >
                  <div className="aspect-w-5 aspect-h-2 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={img}
                      alt="rescue image"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default FindARescue;
