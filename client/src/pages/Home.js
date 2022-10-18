import React from "react";
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <div>
                <h1>RESCUECHOWLOGO</h1>
                <h2>Be the change that makes a difference!</h2>
                <p>
                    An innovative fundraising initiative aimed at helping Rescues and Animal Charities raise much needed money and support from their communities, to help them continue their good works within the Animal Welfare Community.
                </p>
                <button><Link to="/who-we-are">Learn More  ►</Link></button>
            </div>
            <div>
                <h2>Who We Are</h2>
                <h3>Homeless Animals Are In Need</h3>
                <p>
                Our founder and team at Rescue Chow, have been a long-time supporters of animal rescues, fostering programs, transport, and pet food banks. We have created a meaningful way to help with raising funds, to ensure the good work continues around Canada. 
                </p>
                <p>
                Saving animals, ensuring they have food, vet care, transportation, find loving homes, or being the voice for the voiceless… there is no better work. We are here to help!
                </p>
                <p>Together we can make a difference.</p>
                <button><Link to="/who-we-are">Learn More  ►</Link></button>
            </div>
            <div>
                <h2>Contact Us</h2>
                <button><p>Learn More  ►</p></button>
            </div>
            <div>
                <h2>Choose a Rescue to Support</h2>
                <p>
                    Rescue Chow is an animal rescue fundraising initiative that assists rescues in need with fundraising. When your supporters purchase a treat package, 20% of proceeds go to your animal rescue or charity of choice.
                </p>
                <p>
                    With every purchase, $2 goes towards helping animals in rescue within our Canadian community. We help rescues throughout Canada including Ontario, British Columbia, and Quebec.
                </p>
                <button><Link to="/order-now">Get Started  ►</Link></button>
            </div>
        </div>
    );
};

export default Home;