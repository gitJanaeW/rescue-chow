import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_THOUGHT } from '../../utils/shopping/mutations';
import { QUERY_PRODUCTS } from '../../utils/shopping/queries';

const ThoughtForm = ({ product }) => {
    const [thoughtText, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addThought, { error }] = useMutation(ADD_THOUGHT, {
        update(cache, { data: { addThought } }) {

            // could potentially not exist yet, so wrap in a try/catch
            try {
                // update me array's cache
                const { products } = cache.readQuery({ query: QUERY_PRODUCTS });
                cache.writeQuery({
                    query: QUERY_PRODUCTS,
                    data: { thoughts: [...products.thoughts, addThought] },
                });
            } catch (e) {
                console.warn("First thought insertion by user!")
            }

            // update thought array's cache
            const { products } = cache.readQuery({ query: QUERY_PRODUCTS });
            cache.writeQuery({
                query: QUERY_PRODUCTS,
                data: { thoughts: [addThought, { products }] },
            });
        }
    });

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
                variables: { thoughtText: thoughtText },

            });
            // console.log(addThought())
            // clear form value
            setBody('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
        // console.log(thoughtText)
    };

    return (
        <div>
            <p
                className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
            >
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
                    name="thoughtText"
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
