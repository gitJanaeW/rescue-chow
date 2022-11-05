import React, { useState, useEffect } from "react";
import { useStoreContext } from "../utils/shopping/GlobalState";
import { ADD_RESCUE_CHECKOUT, TOGGLE_CART, UPDATE_RESCUES } from "../utils/shopping/actions";

import { QUERY_RESCUES } from "../utils/shopping/queries";
import { useQuery } from "@apollo/client";
import { idbPromise } from "../utils/helpers";

function RescueForm() {
  const [state, dispatch] = useStoreContext();
  // const { currentCategory } = state;
  const [radio, setRadio] = useState("None");

  const { loading, data } = useQuery(QUERY_RESCUES);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_RESCUES,
        rescues: data.rescues,
      });
      data.rescues.forEach((rescue) => {
        idbPromise("rescues", "put", rescue);
      });
    } else if (!loading) {
      idbPromise("rescues", "get").then((rescues) => {
        dispatch({
          type: UPDATE_RESCUES,
          rescues: rescues,
        });
      });
    }
  }, [data, loading, dispatch]);

  // function filterProducts() {
  //   if (!currentCategory) {
  //     return state.products;
  //   }
  //   return state.products.filter(
  //     (product) => product.category._id === currentCategory
  //   );
  // }

  function submitCheckout(e) {
    e.preventDefault();

    dispatch({
      type: ADD_RESCUE_CHECKOUT,
      selectedRescueValue: radio,
    });
    dispatch({ type: TOGGLE_CART });
  }
  return (
    <div>
      <legend className="text-lg font-medium text-gray-900">Our Rescues</legend>
      <div className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
        {state.rescues.map((rescue) =>
            <div className="relative flex items-start py-4" key={rescue._id}>
              <div className="min-w-0 flex-1 text-sm">
                <a href={rescue.website} rel="noopener">
                  <label
                    htmlFor={rescue.name}
                    className="select-none font-medium text-gray-700"
                  >
                    {rescue.name}
                  </label>
                </a>
              </div>
              <div className="ml-3 flex h-5 items-center">
                <input
                  checked={radio === rescue.name}
                  type="radio"
                  value={rescue.name}
                  onChange={(e) => setRadio(rescue.name)}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
            </div>
        )}
      </div>
      <div className="flex justify-center align-center">
        {window.location.pathname === "/shop" ? (
          <button
            onClick={submitCheckout}
            type="submit"
            className="m-5 inline-flex items-center rounded-md border border-gray-400 bg-red-300 px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Proceed To Checkout
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default RescueForm;
