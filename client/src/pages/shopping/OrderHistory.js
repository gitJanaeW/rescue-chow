import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER_ORDER_HISTORY } from "../../utils/shopping/queries";

function OrderHistory() {
  const { data } = useQuery(QUERY_USER_ORDER_HISTORY);
  let user;
  console.log(data);
  if (data) {
    user = data.userOrderHistory;
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/shop">← Back to Products</Link>

        {user ? (
          <>
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {order.products.map(({ prodId, qnty }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <Link to={`/products/${prodId._id}`}>
                        <img
                          alt={prodId.name}
                          src={`/images/shopping/${prodId.image}`}
                        />
                        <p>
                          qnty:{qnty} {prodId.name}
                        </p>
                      </Link>
                      <div>
                        <span>${prodId.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default OrderHistory;
