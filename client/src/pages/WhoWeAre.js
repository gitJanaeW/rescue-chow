import React from "react";
import dogHeartImg from "../assets/icons8-dog-heart-64.png";
import petFood from "../assets/icons8-pet-food-64.png";
import heartPaw from "../assets/icons8-heart-with-dog-paw-64.png";

const WhoWeAre = () => {
  return (
    <div className="bg-who-section bg-cover bg-fixed divide-y-2 divide-slate-400/25 divide-solid">
      <header className="bg-rescue-paws bg-center pb-24 pt-20  contrast-100   ">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-start"></div>

        <div className="pl-28">
          <h2 className="text-9xl font-medium font-love text-red-400">
            Who We Are
          </h2>
          <p className="text-lg font-serif text-gray-600 font-semibold w-1/3">
            " Rescue Chow is a community initiative to make a difference in the
            lives of all animals in rescue and in need. "
          </p>
        </div>
      </header>
      <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-8xl font-love font-medium text-red-400">
              Rescue Chows continued mission is 3 part:
            </h2>
          </div>

          <div className="mt-10 mb-10">
            <dl className="space-y-10 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10 md:space-y-0">
              <div className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md ">
                    <a href="/find-a-rescue">
                      <img
                        className="h-12 w-12"
                        src={dogHeartImg}
                        alt="rescue chow logo"
                      />
                    </a>
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                    Part 1!
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Search Our List Of Rescues In Need…
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md ">
                    <a href="/shop">
                      <img
                        className="h-12 w-12"
                        src={petFood}
                        alt="rescue chow logo"
                      />
                    </a>
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                    Part 2!
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Customer Orders Treats …
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md ">
                    <img
                      className="h-12 w-12"
                      src={heartPaw}
                      alt="rescue chow logo"
                    />
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                    Part 3!
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500  ">
                  25% Goes Directly To The Chosen Rescue…
                </dd>
              </div>
            </dl>
          </div>
          <div className="lg:text-center">
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto  ">
              Each Registered Rescue is given a unique link to ensure that
              supporter's purchases are given to the correct charity or rescue.
              Rescue Admins have access to the back end of our platform to track
              and see how successful their campaign is going, and how many funds
              have been raised. Full transparency is part of our integral
              approach and mandate.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center space-x-2 py-28">
        <h2 className="font-love text-white text-7xl font-medium w-1/2 drop-shadow-[0_0_2px_rgba(0,0,0,1)] ">
          What is a treat subscription initiative?
        </h2>
        <p className=" max-w-2xl text-xl text-red-300 drop-shadow-[0_0_2px_rgba(0,0,0,1)] font-serif lg:mx-auto">
          Each Registered Rescue is given a unique link to ensure that their
          purchases are given to the correct charity or rescue. Rescue Admins
          have access to the back end of our platform to track and see how
          successful their campaign is going, and how many funds have been
          raised. Full transparency is part of our integral approach and
          mandate.
        </p>
      </div>
      <div className="bg-red-400 bg-opacity-80 pb-24 pt-16  ">
        <div className="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <h2 className="text-5xl font-medium font-love text-white drop-shadow-[0_0_2px_rgba(0,0,0,1)]  w-7/12">
            " There has to be a way to raise money for the many integral rescues
            that are in such dire need."
          </h2>
        </div>
        <div className=" flex flex-row items-center justify-center space-x-4">
          <p className="mt-4 max-w-2xl text-xl text-white drop-shadow-[0_0_2px_rgba(0,0,0,1)] lg:mx-auto  ">
            Each Registered Rescue is given a unique link to ensure that
            supporter's purchases are given to the correct charity or rescue.
            Rescue Admins have access to the back end of our platform to track
            and see how successful their campaign is going, and how many funds
            have been raised. Full transparency is part of our integral approach
            and mandate.
          </p>
        </div>
      </div>
      <div className="bg-white  pb-16 pt-12  ">
        <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <h2 className="text-8xl font-medium font-love text-red-400   ">
            Order Today!
          </h2>
        </div>
        <div className=" flex flex-row items-center justify-center space-x-4">
          <p className="mt-4 max-w-2xl text-center font-medium text-xl text-gray-500  lg:mx-auto  ">
            On average $2.50 goes towards helping animals in rescue within our
            community.
          </p>
        </div>
        <div className=" flex flex-row items-center justify-center pt-10 space-x-4">
          <a
            href="/Shop"
            className="inline-flex items-center justify-center rounded-full border border-transparent  bg-red-400 px-5 py-3 text-base font-medium text-white hover:bg-black"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
