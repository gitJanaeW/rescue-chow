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
                    <h4><a href="tel:+19057678372">+1(905) 767-8372</a></h4>
                </div>
                <div>
                    <h3>Email Us</h3>
                    <a href="mailto: info@rescuechow.com"><h4>info@rescuechow.com</h4></a>
                </div>
                <div>
                    <h3>Facebook</h3>
                    <a href="https://www.facebook.com/rescuechow" target="_blank" rel="noreferrer">facebook logo goes here</a>
                </div>
            </div>
            <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8871.436411564438!2d-78.92307018579231!3d43.87225653063157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d51def76b791b9%3A0xe40b7d9a530a09e0!2s1375%20Hopkins%20St%2C%20Whitby%2C%20ON%20L1N%202C2!5e0!3m2!1sen!2sca!4v1666107343570!5m2!1sen!2sca" title="Rescue Chow Location" width="100%" height="550" style={{border: 0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div>
                <h2>Send Your Questions</h2>
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