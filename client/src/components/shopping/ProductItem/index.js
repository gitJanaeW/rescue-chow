import React from "react";
import { Link } from "react-router-dom";
import { pluralize, idbPromise, getProceeds } from "../../../utils/helpers"
import { useStoreContext } from "../../../utils/shopping/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../../utils/shopping/actions";

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }
  // const rescueProduct = item.filter(item => item.category.name === "Rescues")

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img 
          width="200px"
          alt={name}
          src={`/images/shopping/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
        <span>(${getProceeds(price)} to charity)</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>

      <div></div>
    </div>
  );
}

export default ProductItem;