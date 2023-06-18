import React from 'react'
import about from "../assets/about.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section id="about" className="bg-greenDark p-10">
      <h2 className="text-3xl md:text-4xl leading-7 text-greenLight uppercase font-sans font-extrabold">
        About Us
      </h2>
      <div className="container flex flex-col px-4 mx-auto p-10 space-y-12 md:space-y-0 md:space-x-8 md:flex-row">
        {/* left side */}
        <div className="md:w-1/2 mt-12">
          <img src={about} alt="" className="hidden md:block w-full h-auto" />
        </div>
        {/* right side */}
        <div className="flex flex-col mb-32 space-y-2 md:space-y-4 md:w-1/2">
          <h3 className="font-body text-greenPale text-2xl md:text-3xl text-sans font-semibold">
            What is TrashTech?
          </h3>
          <p className="text-sm md:text-base text-beigeLight text-sans font-medium">
            At TrashTech, we are passionate about revolutionizing waste
            management and promoting sustainable practices. We believe that by
            leveraging technology, we can streamline garbage collection,
            minimize environmental impact, and build cleaner and healthier
            communities.
          </p>
          <p className="text-sm md:text-base text-beigeLight text-sans font-medium">
            TrashTech is on a mission to transform the way waste is managed. We
            strive to provide individuals, communities, and waste management
            authorities with an efficient, user-friendly platform that
            simplifies waste collection, promotes recycling, and encourages
            responsible waste disposal practices.
          </p>
          <p className="text-sm md:text-base text-beigeLight text-sans font-medium">
            Join us on this journey to make a positive impact on the environment
            and create a sustainable future for generations to come.{" "}
            <Link
              className="text-sm font-semibold leading-tight text-greenLight border-b-2 border-greenLight"
              to="/login"
            >
              Get Started
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default About