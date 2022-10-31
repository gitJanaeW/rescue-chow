import React, { useEffect, useState } from 'react';
import { useStoreContext } from '../utils/shopping/GlobalState';
import { UPDATE_PRODUCTS } from '../utils/shopping/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS, QUERY_CHECKOUT } from '../utils/shopping/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';
import { useLazyQuery } from '@apollo/client';
import { ADD_MULTIPLE_TO_CART, ADD_RESCUE_CHECKOUT } from '../utils/shopping/actions';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51LwAJXFZoRYZwQnKvp7DSqLSz0HG4gAQJjH2JTAIUXOdYLCwSSFX4M4o9j1Yjta226OxbCIrbfyrndJtLmGNyRWh00OtjMPGcA');


function RescueForm() {
    const [state, dispatch] = useStoreContext();

    const { currentCategory } = state;

    const { loading, data } = useQuery(QUERY_PRODUCTS);
    const [radio, setRadio] = useState("None")
    const [getCheckout, { checkoutData }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        }

        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);

    useEffect(() => {
        if (checkoutData) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products,
            });
            checkoutData.products.forEach((product) => {
                idbPromise('products', 'put', product);
            });
        } else if (!loading) {
            idbPromise('products', 'get').then((products) => {
                dispatch({
                    type: UPDATE_PRODUCTS,
                    products: products,
                });
            });
        }
    }, [checkoutData, loading, dispatch]);

    function filterProducts() {
        if (!currentCategory) {
            return state.products;
        }
        return state.products.filter(
            (product) => product.category._id === currentCategory
        );
    }

    function submitCheckout(e) {
        e.preventDefault();
        const productIds = [];
        dispatch({
            type: ADD_RESCUE_CHECKOUT,
            selectedRescueValue: radio,
        });
        state.cart.forEach((item) => {
            for (let i = 0; i < item.purchaseQuantity; i++) {
                productIds.push(item._id);
            }
        });

        // const selectedRescueObj = { selectedRescue: radio }
        // save to local storage
        //     localStorage.setItem("selectedRescue", JSON.stringify(selectedRescueObj));
        //    JSON.parse(localStorage.getItem("selectedRescue"));

        getCheckout({
            variables: { products: productIds },
        });
    }

    return (
        <form>
            <div className="my-2">
                <h2>Our Rescues:</h2>
                {state.products.length ? (
                    <div className="radio flex-row">
                        {filterProducts().map((product) => (
                            product.category.name === "Rescues"
                                ? (
                                    <div>
                                        <label>Rescue: {product.name}</label>
                                        <p>Choose Your Rescue:</p>
                                        <input
                                            type="radio"
                                            checked={radio === product.name}
                                            value={product.name}
                                            onChange={(e) => (setRadio(product.name))}
                                        /></div>
                                ) : null
                        ))}
                    </div>
                ) : (
                    <h3>You haven't Chosen a Rescue yet!</h3>
                )}
                {loading ? <img src={spinner} alt="loading" /> : null}
            </div>
            Selected option is : {radio}
            <br></br>
            <button onClick={submitCheckout} className="btn btn-default" type="submit">
                Proceed To Checkout
            </button>
        </form >
    );
}

export default RescueForm;