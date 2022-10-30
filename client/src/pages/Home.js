import React from "react";
import { Link } from "react-router-dom";
import rescueChow from "../assets/Rescue-Chow-Logo-white-outline.gif";
import petsAbout from "../assets/pets-about-free-img.png";

const Home = () => {
  return (
    <div className="bg-hero-pattern bg-cover bg-fixed ">
      <header className="bg-header-pattern bg-center pb-20 pt-20 contrast-75 ">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <img
            className="object-fill h-72 w-3/4"
            src={rescueChow}
            alt="rescue chow logo"
          />
        </div>
        <div className=" flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-mono">
            Be the change that makes a difference!
          </h1>

          <p className="text-center max-w-4xl">
            An innovative fundraising initiative aimed at helping Rescues and
            Animal Charities raise much needed money and support from their
            communities, to help them continue their good works within the
            Animal Welfare Community.
          </p>
          <a
            href="/who-are-we"
            className="inline-flex items-center justify-center rounded-full border border-transparent bg-red-400 px-5 py-3 text-base font-medium text-white hover:bg-black"
          >
            Learn more
          </a>
        </div>
      </header>
      <main>
        <div className="mx-auto py-6 sm:px-6 lg:px-8  ">
          <div>
            <h2>Who We Are</h2>
            <h3>Homeless Animals Are In Need</h3>

            <p>Together we can make a difference.</p>
          </div>
          <div className="relative overflow-hidden bg-white w-full  shadow-inner">
            <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
              <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                <div className="sm:max-w-lg">
                  <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Who We Are
                  </h1>
                  <p className="mt-4 text-xl text-gray-500">
                    Our founder and team at Rescue Chow, have been a long-time
                    supporters of animal rescues, fostering programs, transport,
                    and pet food banks. We have created a meaningful way to help
                    with raising funds, to ensure the good work continues around
                    Canada.
                  </p>
                  <p className="mt-4 text-xl text-gray-500">
                    Saving animals, ensuring they have food, vet care,
                    transportation, find loving homes, or being the voice for
                    the voiceless… there is no better work. We are here to help!
                  </p>
                </div>
                <div>
                  <div className="mt-10">
                    {/* Decorative image grid */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                    >
                      <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                        <div className="flex items-center space-x-6 lg:space-x-8">
                          <img
                            src={petsAbout}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>

                    <a
                      href="/who-we-are"
                      className="inline-block rounded-md border border-transparent bg-red-400 py-3 px-8 text-center font-medium text-white hover:bg-indigo-700"
                    >
                      Learn More!
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2>Contact Us</h2>
            <button>
              <Link to="/get-in-touch">Learn More ►</Link>
            </button>
          </div>
          <div>
            <h2>Choose a Rescue to Support</h2>
            <p>
              Rescue Chow is an animal rescue fundraising initiative that
              assists rescues in need with fundraising. When your supporters
              purchase a treat package, 20% of proceeds go to your animal rescue
              or charity of choice.
            </p>
            <p>
              With every purchase, $2 goes towards helping animals in rescue
              within our Canadian community. We help rescues throughout Canada
              including Ontario, British Columbia, and Quebec.
            </p>
            <button>
              <Link to="/shop">Get Started ►</Link>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
