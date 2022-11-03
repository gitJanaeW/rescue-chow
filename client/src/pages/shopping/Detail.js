import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/shopping/GlobalState";
import {
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
} from "../../utils/shopping/actions";
import { QUERY_PRODUCTS } from "../../utils/shopping/queries";
import { idbPromise, getProceeds } from "../../utils/helpers";
import ThoughtForm from "../../components/ThoughtForm";
import { StarIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({});
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const { products, cart } = state;

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
    <div className="bg-white">
      <div className="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
              <img
                src={`/images/shopping/${currentProduct.image}`}
                alt={currentProduct.name}
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {currentProduct.name}
                </h1>

                <h2 id="information-heading" className="sr-only">
                  Product information
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  ${getProceeds(currentProduct.price)} of this items price goes
                  to your chosen charity.
                </p>
              </div>
            </div>

            <p className="mt-6 text-gray-500">{currentProduct.description}</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              {currentProduct.price && currentProduct.quantity ? (
                <button
                  onClick={addToCart}
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-500 py-3 px-8 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  ${currentProduct.price}
                </button>
              ) : (
                <button
                  onClick={addToCart}
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-300 py-3 px-8 text-base font-medium text-red-600 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Out Of Stock
                </button>
              )}
              <a
                href="/shop"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-400 py-3 px-8 text-base font-medium text-white hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                All Products
              </a>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-md font-medium text-gray-900">
                Leave a Review
              </h3>
              <ThoughtForm></ThoughtForm>
            </div>
          </div>

          <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
            {currentProduct.thoughts && (
              <div>
                <div className="border-b border-gray-200">
                  <div className="-mb-px flex space-x-8">
                    <div
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? "border-indigo-600 text-indigo-600"
                            : "border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300",
                          "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                        )
                      }
                    >
                      Customer Reviews
                    </div>
                  </div>
                </div>
                <div>
                  <div className="-mb-10">
                    <h3 className="sr-only">Customer Reviews</h3>

                    {currentProduct.thoughts.map((e, eIdx) => (
                      <div className="flex space-x-4 text-sm text-gray-500">
                        <div className="flex-none py-10"></div>
                        <div
                          className={classNames(
                            eIdx === 0 ? "" : "border-t border-gray-200",
                            "py-10"
                          )}
                        >
                          <h3 className="font-medium text-gray-900">
                            {e.username}
                          </h3>

                          <div className="mt-4 flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                className={classNames(
                                  e.rating > rating
                                    ? "text-yellow-400"
                                    : "text-gray-300",
                                  "h-5 w-5 flex-shrink-0"
                                )}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                          <p className="sr-only">{e.rating} out of 5 stars</p>
                          <p className="prose prose-sm mt-4 max-w-none text-gray-500">
                            {e.thoughtText}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
