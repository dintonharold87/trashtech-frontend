import React from "react";
import HeroSection from "../components/HeroSection";
import About from "../components/About";
import Faqs from "../components/Faqs"
import Contact from "../components/Contact";
const Home = () => {
  return (
    <>
      <HeroSection />
      <About />
      <Faqs />
      <Contact/>
    </>
  );
};

export default Home;
