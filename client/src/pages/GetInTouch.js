import React, { useState } from "react";
import { captializeFirstChar, validateEmail } from "../utils/helpers";

const GetInTouch = () => {
  const [emailObj, setEmailObj] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const getEmailState = (e) => {
    if (e.target.name === "email") {
      const isValid = validateEmail(e.target.value);
      if (!isValid) {
        setErrorMsg("Your email is invalid");
      } else {
        setErrorMsg("");
      }
    } else {
      if (!e.target.value.length) {
        setErrorMsg(`${e.target.name} is required.`);
      } else {
        setErrorMsg("");
      }
    }
    if (!errorMsg) {
      return setEmailObj({ ...emailObj, [e.target.name]: e.target.value });
    }
  };
  const logEmail = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <header className="bg-rescue-paws bg-center pb-24 pt-20    ">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8  ">
          <div className="px-28 flex justify-between align-center">
            <h2 className="text-9xl font-medium font-love text-red-400">
              Get In Touch
            </h2>
            <p className="text-lg font-serif text-gray-600 font-semibold w-1/3">
              Don't wait to subscribe to our service to help out animal rescue
              charities as well as feed your pets healthy treats! To get in
              touch with us, you can send us an email containing any questions
              or comments.
            </p>
          </div>
        </div>
      </header>

      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8871.436411564438!2d-78.92307018579231!3d43.87225653063157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d51def76b791b9%3A0xe40b7d9a530a09e0!2s1375%20Hopkins%20St%2C%20Whitby%2C%20ON%20L1N%202C2!5e0!3m2!1sen!2sca!4v1666107343570!5m2!1sen!2sca"
          title="Rescue Chow Location"
          width="100%"
          height="550"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="bg-gray-100">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-5 sm:p-6 flex align-center justify-around">
            <h2 className="text-7xl text-center mt-20 font-medium font-love text-red-400">
              Send Your Questions
            </h2>

            <form className="w-1/3" onSubmit={logEmail}>
              <div>
                <div className="align">
                  <label htmlFor="name">Name:</label>
                  <input
                    className="block w-10/12 bg-gray-100 rounded-md border-gray-300 outline outline-1 outline-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onBlur={getEmailState}
                    type="text"
                    name="name"
                  />
                </div>
                <div className="align">
                  <label htmlFor="email">Email:</label>
                  <input
                    className="block w-10/12 bg-gray-100  rounded-md border-gray-300 outline outline-1 outline-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onBlur={getEmailState}
                    type="email"
                    name="email"
                  />
                </div>
                <div>
                  <label htmlFor="message">Message</label>
                  <br />
                  <textarea
                    className="block w-full flex-1 bg-gray-100  rounded-md border-gray-300 outline outline-1 outline-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onBlur={getEmailState}
                    name="message"
                  />
                </div>
                {errorMsg && <p>{captializeFirstChar(errorMsg)}</p>}
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-gray-400 bg-red-300 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-black  "
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
