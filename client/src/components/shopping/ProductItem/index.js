import React from "react";

import { pluralize, idbPromise, getProceeds } from "../../../utils/helpers";
import { useStoreContext } from "../../../utils/shopping/GlobalState";
import {
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
} from "../../../utils/shopping/actions";

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const { image, name, _id, price, quantity } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div key={_id}>
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden rounded-lg">
          {price && (
            <img
              src={`/images/shopping/${image}`}
              href={`/products/${_id}`}
              alt={name}
              className="h-full w-full object-cover object-center"
            />
          )}
        </div>
        <div className="relative mt-4">
          <h3 className="text-sm font-medium text-gray-900">{name}</h3>
          {quantity && (
            <p className="mt-1 text-sm text-gray-500">
              {quantity} {pluralize("item", quantity)} in stock
            </p>
          )}
          {price && (
            <p className="mt-1 text-sm text-gray-500 font-semibold">
              ${getProceeds(price)} of this item goes to the charity You choose!
            </p>
          )}
        </div>
        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
          />
          {price && (
            <p className="relative text-lg font-semibold text-white">{price}</p>
          )}
        </div>
      </div>
      {price && (
        <div className="mt-6">
          <a
            href="#"
            onClick={addToCart}
            className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
          >
            Add to bag<span className="sr-only">, {name}</span>
          </a>
        </div>
      )}
    </div>
  );
}

export default ProductItem;
