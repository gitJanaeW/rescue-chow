import React from "react";
import ProductList from "../components/shopping/ProductList";
import CategoryMenu from "../components/shopping/CategoryMenu";
import Cart from "../components/shopping/Cart";
import ChooseARescue from "./shopping/ChooseRescue";
const OrderNow = () => {
  return (
    <div>
      <h2 className="text-center text-red-400 font-love text-9xl pt-10  font-medium">
        Order Now
      </h2>
      <div className="container">
        <CategoryMenu />
        <ProductList />
        <ChooseARescue />
        <Cart />
      </div>
    </div>
  );
};

export default OrderNow;
