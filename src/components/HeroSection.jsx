import React from 'react'
import hero from "../assets/hero.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section id="heroSection" className="bg-secondary-100 mt-4">
      <div className="container flex flex-col md:flex-row items-center px-6 mx-auto p-10 space-y-0 md:space-y-0 ">
        {/* left section */}
        <div className="flex flex-col mb-8 space-y-4 md:space-y-8 md:w-1/2 mt-16">
          <h1 className="text-4xl md:text-5xl leading-10 text-greenDark font-sans font-extrabold text-left">
            Streamline your <span className="text-greenLight">Garbage</span>{" "}
            collection!!
          </h1>
          <p className="text-sm md:text-4xl font-semibold font-sans leading-7 text-greenDark">
            A smarter way to manage waste.
          </p>
          <div className="flex items-center justify-center  px-4 py-2 bg-greenDark  rounded-lg w-fit md:justify-start">
            <Link
              to="/client_registration"
              className=" text-beigeLight text-sm font-semibold font-sans md:text-base leading-normal"
            >
              Signup
            </Link>
          </div>
        </div>
        {/* right section-image */}
        <div className="md:w-1/2">
          <img src={hero} alt="" className="hidden md:block w-full h-auto" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection