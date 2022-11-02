import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import Jumbotron from "../../components/shopping/Jumbotron";
import { ADD_NEW_ORDER } from "../../utils/shopping/mutations";
import { idbPromise } from "../../utils/helpers";
import { CheckIcon } from "@heroicons/react/24/outline";

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
      }, 3000);
    }

    saveOrder();
  }, [addNewOrder]);

  return (
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <Jumbotron>
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckIcon
                className="h-6 w-6 text-green-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <div
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Payment successful
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Thank you for your purchase!
                </p>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  You will now be redirected to the Home Page
                </p>
              </div>
            </div>
          </div>
        </div>
      </Jumbotron>
    </div>
  );
}

export default Success;
