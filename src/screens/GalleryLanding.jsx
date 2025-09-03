import React, {useLayoutEffect} from "react";
// Sections
import SocialIcon from "../components/Nav/side_social_icons";
import Header from "../components/Sections/Header";
import Contact from "../components/Sections/Contact";
import Footer from "../components/Sections/Footer";
import Gallery from "../components/Sections/Gallery";
import HeaderImage from "../assets/img/add_udaan_10.jpg";

function GalleryLanding() {

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
});
  return (
      <div style={{overflowX: "hidden"}}>
        <SocialIcon />
        <Header img = {HeaderImage} Greeting = "Be Updated" title="Photo Arcade" salutation="" button="Have A Look" ButtonLink = "#photo" content="Glance through some of the best artworks, photographs and events covered by this season's team."/>
        <Gallery/>
        <Contact />
        <Footer />
      </div>
  );
}

export default GalleryLanding;