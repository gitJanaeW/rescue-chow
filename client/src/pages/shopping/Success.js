import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import Jumbotron from "../../components/shopping/Jumbotron";
import { ADD_NEW_ORDER } from "../../utils/shopping/mutations";
import { idbPromise } from "../../utils/helpers";

function Success() {
  const [addNewOrder] = useMutation(ADD_NEW_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");
      const products = [];

      cart.forEach((item) => {
        let newItem = { prodId: item._id, qnty: item.purchaseQuantity };
        products.push(newItem);
      });
      if (products.length) {
        const { data } = await addNewOrder({ variables: { products } });

        const productData = data.addNewOrder.products;

        productData.forEach((item) => {
          idbPromise("cart", "delete", item.prodId);
        });
      }

      setTimeout(() => {
        window.location.assign("/");
      }, 300000);
    }

    saveOrder();
  }, [addNewOrder]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
