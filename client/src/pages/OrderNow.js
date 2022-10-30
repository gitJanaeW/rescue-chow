import React from "react";
import ProductList from "../components/shopping/ProductList";
import CategoryMenu from "../components/shopping/CategoryMenu";
import Cart from "../components/shopping/Cart";

const OrderNow = () => {
    return (
        <div>
            <h2>Order Now</h2>
            <div className="container">
            <CategoryMenu />
            <ProductList />
            <Cart />
            </div>
        </div>
    );
};

export default OrderNow;