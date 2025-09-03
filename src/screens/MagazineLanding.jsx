import React,{useLayoutEffect} from "react";
// Sections
import SocialIcon from "../components/Nav/side_social_icons";
import Header from "../components/Sections/Header";
import Contact from "../components/Sections/Contact";
import Footer from "../components/Sections/Footer";
import Magazine from "../components/Sections/Magazine";
import HeaderImage from "../assets/img/add_udaan_11.jpg";

function MagazineLanding() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
});

  return (
      <div style={{overflowX: "hidden"}}>
        <SocialIcon />
        <Header img = {HeaderImage} Greeting = "Read Our" title="Magazine Galore" salutation="" button="Start Reading" ButtonLink = "#Magz" content="Explore with us the yesteryears, a sneak peek into previous seasons of UDAAN!"/>
        <Magazine/>
        <Contact />
        <Footer />
      </div>
  );
}

export default MagazineLanding;