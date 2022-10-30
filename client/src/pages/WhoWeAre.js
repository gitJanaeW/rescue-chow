import React from "react";
import { Link } from "react-router-dom";

const WhoWeAre = () => {
    return (
        <div>
            <div>
                <h2>Who We Are</h2>
                <p>
                    Rescue Chow is a community initiative to make a difference in the lives of all animals in rescue and in need.
                </p> 
                </div>
            <div>
                <h2>Rescue Chows continued mission is 3 part:</h2>
                <h3>Search Our List of Rescues in Need...</h3>
                {/* This link is beyond MVP */}
                <p>Register  ►</p>
                <h3>Orders Treats...</h3>
                <Link to="/order-now">Order Now  ►</Link>
                <h3>25% Goes Directly To The Chosen Rescue...</h3>
                <p>
                    Each Registered Rescue is given a unique link to ensure that supporter's purchases are given to the correct charity or rescue. Rescue Admins have access to the back end of our platform to track and see how successful their campaign is going, and how many funds have been raised. Full transparency is part of our integral approach and mandate.
                </p>
            </div>
            <div>
                <h2>"There has to be a way to raise money for the many integral rescues that are in such dire need."</h2>
                <p>
                    The founder of Barnies Horse and Pet, Terasa Hill, started Rescue Chow Pet Food Bank in Whitby On, to help animals in need. She has partnered and supported many rescues and charities across the country. ”There has to be a way to raise money for the many integral rescues that are in need“ she is quoted. She and her team are dedicated in their quest and quietly continue to do what they can, to make a difference in the lives of animals each and every day. Rescue Chow Pet Foodbank is still operational, and feeds over 500 animals each month, in the Durham Region including British Columbia, Ontario, and Quebec.
                </p>
            </div>
            <div>
                <h1>Order Today</h1>
                <p>
                    On average $2.50 goes towards helping animals in rescue within our community.
                </p>
                <button><Link to="/shop">Order Now  ►</Link></button>
            </div>
        </div>
    );
};

export default WhoWeAre;