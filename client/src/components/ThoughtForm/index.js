import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_THOUGHT } from '../../utils/shopping/mutations'
import { useStoreContext } from '../../utils/shopping/GlobalState';
import { QUERY_PRODUCTS } from '../../utils/shopping/queries';
import Rate from '../../components/Rate'

const ThoughtForm = ({ }) => {
    const [thoughtText, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addThought, { error }] = useMutation(ADD_THOUGHT);
    const [state, dispatch] = useStoreContext();
    const { id } = useParams();
    const [rating, setRating] = useState(0);

    const [currentProduct, setCurrentProduct] = useState({});

    const { loading, data } = useQuery(QUERY_PRODUCTS);
    const { products } = state;
    const product = currentProduct._id
    useEffect(() => {
        // already in global store
        if (data && data.products && data.products.length) {
            setCurrentProduct(data.products.find((product) => product._id === id));

        }
    }, [products, data, loading, dispatch, id]);

    // update state based on form input changes
    const handleChange = (event) => {
        if (event.target.value.length <= 280) {
            setBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }

    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addThought({
                variables: { product, thoughtText },
            });

            console.log("hi")
            console.log(products._id)
            // clear form value
            setBody('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <p
                className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
            >
                Leave A Review!
                hi    <Rate rating={rating} onRating={rate => setRating(rate)}></Rate>
                Character Count: {characterCount}/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Leave a review..."
                    value={thoughtText}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>

                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>

            {error && <div>Something went wrong...</div>}
        </div>
    );
};

export default ThoughtForm;
