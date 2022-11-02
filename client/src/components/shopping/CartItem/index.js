import { useStoreContext } from "../../../utils/shopping/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
} from "../../../utils/shopping/actions";
import { idbPromise } from "../../../utils/helpers";

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <li>
      <div className="group relative flex items-center justify-between w-10/12  py-6">
        <a href={`/products/${item._id}`} className=" block  py-1 pl-3 ">
          <div
            className="absolute inset-0 group-hover:bg-gray-50"
            aria-hidden="true"
          />
          <div className="relative flex min-w-0 flex-1 items-center">
            <span className="relative inline-block flex-shrink-0"></span>
            <div className="ml-4 truncate">
              <p className="truncate text-sm font-medium text-gray-900">
                {item.name}
              </p>
              <p className="truncate text-sm text-gray-500">
                {"$" + item.price}
              </p>
            </div>
          </div>
        </a>
        <div className="relative  inline-block flex-shrink-0 text-left ">
          <div className="group relative inline-flex h-8 w-4 items-center justify-center rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span>Qty:</span>
            <input
              type="number"
              placeholder="1"
              value={item.purchaseQuantity}
              onChange={onChange}
              className="w-10"
            />
            <span
              role="img"
              aria-label="trash"
              onClick={() => removeFromCart(item)}
            >
              🗑️
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
