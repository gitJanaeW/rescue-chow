import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_THOUGHT } from "../../utils/shopping/mutations";
import { useStoreContext } from "../../utils/shopping/GlobalState";
import { QUERY_PRODUCTS } from "../../utils/shopping/queries";
import Rate from "../../components/Rate";

const ThoughtForm = ({}) => {
  const [thoughtText, setBody] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [addThought, { error }] = useMutation(ADD_THOUGHT);
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  const [rating, setRating] = useState(0);

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const { products } = state;
  const product = currentProduct._id;
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

      console.log("hi");
      console.log(products._id);
      // clear form value
      setBody("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p
        className={`m-0 ${characterCount === 280 || error ? "text-error" : ""}`}
      >
        <Rate rating={rating} onRating={(rate) => setRating(rate)}></Rate>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
          <label htmlFor="comment" className="sr-only">
            Add your comment
          </label>
          <textarea
            rows={3}
            name="comment"
            id="comment"
            value={thoughtText}
            className="block w-full resize-none border-0 py-3 focus:ring-0 sm:text-sm"
            placeholder="Add your Review..."
            defaultValue={""}
            onChange={handleChange}
          />
        </div>

        <button
          className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
          type="submit"
        >
          Write a Review
        </button>
      </form>

      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default ThoughtForm;
