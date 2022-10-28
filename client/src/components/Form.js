// import React, { useState } from "react";
// import ProductItem from "./shopping/ProductItem";
// import ProductList from "./shopping/ProductList";
// import { useStoreContext } from "../utils/shopping/GlobalState";

// const RescueForm = () => {
//     const [radio, setRadio] = useState("")
//     const [state] = useStoreContext();

//     const { currentCategory } = state;
//     console.log(currentCategory)
//     // const [isChecked, setIsChecked] = useState(false)
//     //     constructor() {
//     //         super();
//     //         this.state = {
//     //             name: "React"
//     //         };
//     //         this.onValueChange = this.onValueChange.bind(this);
//     //         this.formSubmit = this.formSubmit.bind(this);
//     //     }

//     //     onValueChange(event) {
//     //         this.setState({
//     //             selectedOption: event.target.value
//     //         });
//     //     }

//     //     formSubmit(event) {
//     //         event.preventDefault();
//     //         const selectedRescueObj = { selectedRescue: this.state.selectedOption }
//     //         console.log(selectedRescueObj)
//     //         // save to local storage
//     //         localStorage.setItem("selectedRescue", selectedRescueObj);
//     //         let newObject = localStorage.getItem("selectedRescue");
//     //         console.log(JSON.parse(newObject));
//     //     }
//     //     const testArray = ["rescue1", "rescue2"
//     // ]

//     return (
//         <form >
//             <div className="radio">
//                 <label>
//                     <input
//                         type="radio"
//                         value="Rescue1"
//                         checked={radio === "Rescue1"}
//                         onChange={(e) => { setRadio(e.target.checked) }}
//                     />
//                     Rescue1
//                     {/* <ProductItem></ProductItem> */}
//                 </label>
//             </div>

//             <div>
//                 Selected option is : {radio}
//             </div>
//             {/* upon button click, run function that saves chosen rescue to the users local storage */}
//             <button className="btn btn-default" type="submit">
//                 Proceed To Checkout
//             </button>
//         </form>
//     );
// }


// export default RescueForm;
// // onSubmit={this.formSubmit}

import React, { useEffect } from 'react';
import ProductItem from './shopping/ProductItem';
import { useStoreContext } from '../utils/shopping/GlobalState';
import { UPDATE_PRODUCTS } from '../utils/shopping/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/shopping/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function RescueForm() {
    const [state, dispatch] = useStoreContext();

    const { currentCategory } = state;

    const { loading, data } = useQuery(QUERY_PRODUCTS);

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products,
            });
            data.products.forEach((product) => {
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
    }, [data, loading, dispatch]);

    function filterProducts() {
        if (!currentCategory) {
            return state.products;
        }

        return state.products.filter(
            (product) => product.category._id === currentCategory
        );
    }

    return (
        <form>
            <div className="my-2">
                <h2>Our Rescues:</h2>

                {state.products.length ? (
                    <div className="flex-row">
                        {filterProducts().map((product, i) => (
                            <input
                                type="radio"
                                value={i}
                            />
                        ))}
                        {filterProducts().map((product) => (
                            product.category.name === "Rescues" ? (
                                <ProductItem
                                    key={product._id}
                                    _id={product._id}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    quantity={product.quantity}
                                />

                            ) : null

                        ))
                        }

                    </div>

                ) : (
                    <h3>You haven't Chosen a Rescue yet!</h3>
                )}
                {loading ? <img src={spinner} alt="loading" /> : null}
            </div>
        </form >
    );
}

export default RescueForm;