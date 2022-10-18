import React, {useState} from "react";
import {captializeFirstChar, validateEmail} from '../utils/helpers';

const GetInTouch = () => {
    const [emailObj, setEmailObj] = useState();
    const [errorMsg, setErrorMsg] = useState();
    // check for live changes to the state of the form
    const getEmailState = (e) => {
        if (e.target.name === 'email') {
            const isValid = validateEmail(e.target.value);
            if (!isValid) {
                setErrorMsg('Your email is invalid');
            } else {
                setErrorMsg('');
            }
        } else {
            if (!e.target.value.length) {
                setErrorMsg(`${e.target.name} is required.`);
            } else {
                setErrorMsg('');
            }
        }
        if(!errorMsg) {
            return setEmailObj({...emailObj, [e.target.name]: e.target.value});
        }
    };
    const logEmail = (e) => {
        e.preventDefault();
        console.log(emailObj);
    };
    return (
        <div>
            <div>
                <h2>Get In Touch</h2>
                <p>
                    Don't wait to subscribe to our service to help out animal rescue charities as well as feed your pets healthy treats! To get in touch with us, you can send us an email containing any questions or comments.
                </p>
            </div>
            <div>
                <div>
                    <h3>You Can Call Us At</h3>
                    <h4>+1(905) 767-8372</h4>
                </div>
                <div>
                    <h3>Email Us</h3>
                    <a href="mailto: info@rescuechow.com"><h4>info@rescuechow.com</h4></a>
                </div>
                <div>
                    <h3>Facebook</h3>
                    <h4>FACEBOOKLOGO</h4>
                </div>
            </div>
            <div>
                {/* Google Maps of business location goes here. I forgot how to do that so I'll have to check */}
            </div>
            <div>
                <h1>Reach Out</h1>
                <div>
                    <div>
                        <form onSubmit={logEmail}>
                            <div className='align'>
                                {/* name */}
                                <label htmlFor='name'>Name:</label>
                                <input onBlur={getEmailState} type='text' name='name'/>
                            </div>
                            <div className='align'>
                                {/* email */}
                                <label htmlFor='email'>Email:</label>
                                <input onBlur={getEmailState} type='email' name='email'/>
                            </div>
                            <div>
                                {/* message */}
                                <label htmlFor='message'>Message</label>
                                <br/>
                                <textarea onBlur={getEmailState} name='message'/>
                            </div>
                            {errorMsg && (<p>{captializeFirstChar(errorMsg)}</p>)}
                            <button type='submit'>Send  ►</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetInTouch;