import React from "react";
import { useQuery } from "@apollo/client";
import {QUERY_RESCUES} from '../utils/shopping/queries';


const FindARescue = () => {
    const {data} = useQuery(QUERY_RESCUES);
    let rescues;
    if (data) {
        rescues = data.rescues;
    }
    return (
        <div>
            <div>
                <h1>Find Rescue</h1>
                <p>
                    You get to choose where your animal rescue fundraising money goes. Here is a list of the rescues you can choose to donate your subscription money to, helping organizations across Canada, including: Ontario, British Columbia, and Quebec.
                </p>
            </div>
            {rescues.map((rescue) => (
                <div key={rescue._id}>
                    <h2>{rescue.name}</h2>
                    <div>
                        <button>Support This Rescue</button>
                        {rescue.website ? (
                            <button><a href={rescue.website} target={"_blank"} rel="noreferrer">Visit Site</a></button>
                        ) : null}
                    </div>
                    
                </div>
            ))}
        </div>
    );
};

export default FindARescue;