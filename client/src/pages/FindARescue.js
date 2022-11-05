import React, { useEffect } from "react";
import { useStoreContext } from "../utils/shopping/GlobalState";
import { useQuery } from "@apollo/client";
import { idbPromise } from "../utils/helpers";
import img from "../assets/cat-and-girl.jpg";
import { QUERY_RESCUES } from "../utils/shopping/queries";
import { UPDATE_RESCUES } from "../utils/shopping/actions";

function FindARescue() {
const [state, dispatch] = useStoreContext();

const { loading, data } = useQuery(QUERY_RESCUES);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_RESCUES,
        rescues: data.rescues,
      });
      data.rescues.forEach((rescue) => {
        idbPromise("rescues", "put", rescue);
      });
    } else if (!loading) {
      idbPromise("rescues", "get").then((rescues) => {
        dispatch({
          type: UPDATE_RESCUES,
          rescues: rescues,
        });
      });
    }
  }, [data, loading, dispatch]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Rescues
          </h2>
        </div>

        <div className="mt-16 space-y-16">
          {state.rescues.map((rescue, rescueIdx) =>
              <div
                key={rescue.name}
                className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"
              >
                <div
                  className={classNames(
                    rescueIdx % 2 === 0
                      ? "lg:col-start-1"
                      : "lg:col-start-8 xl:col-start-9",
                    "mt-6 lg:mt-0 lg:row-start-1 lg:col-span-5 xl:col-span-4"
                  )}
                >
                  <a href={rescue.website} rel='noopener'>
                    <h3 className="text-lg font-medium text-gray-900">
                      {rescue.name}
                    </h3>
                  </a>
                  <p className="mt-2 text-sm text-gray-500">
                    {rescue.description}
                  </p>
                </div>
                <div
                  className={classNames(
                    rescueIdx % 2 === 0
                      ? "lg:col-start-6 xl:col-start-5"
                      : "lg:col-start-1",
                    "flex-auto lg:row-start-1 lg:col-span-7 xl:col-span-8"
                  )}
                >
                  <div className="aspect-w-5 aspect-h-2 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={img}
                      alt="rescue"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FindARescue;
