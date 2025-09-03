import React, {useState, useEffect} from "react";
// Sections
import SocialIcon from "../components/Nav/side_social_icons";
import Header from "../components/Sections/Header";
import ContentInvite from "../components/Sections/contentInvite";
import Patrons from "../components/Sections/patrons";
import About from "../components/Sections/About";
import Contact from "../components/Sections/Contact";
import Footer from "../components/Sections/Footer";
import { Dna  } from "react-loader-spinner";
import styled from "styled-components";
import HeaderImage from "../assets/img/add_udaan_5.1.jpg";

function Landing() {
  const[loading, setLoading] = useState(false);
  useEffect(()=>{
  setLoading(true)
  setTimeout(()=>{
    setLoading(false)
  }, 1500)
}, [])


  return (
    <div style={{overflowX: "hidden"}}>
      {

        loading ?(
        <Preloader>
        <Dna
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
/>
        </Preloader>
        )
        :(


      <>
        <SocialIcon />
        <Header img = {HeaderImage} Greeting = "Welcome to" title="UDAAN" salutation="it's u!" button="Submit Content" ButtonLink = "#contentInvite" content="The official magazine of GGV welcomes you. It’s happening right here at UDAAN, the homeland of creative geniuses of GGV, harboring a great fusion of talent and culture from across the country. We invite you to be a part of this phenomenal journey and live this
        experience with us. This creative space has been built for You, feel free to explore ahead!"/>
        <Patrons />

        <About style={{position:"absolute"}} />
        <ContentInvite />
        <Contact />
        <Footer />
      </>
        )
      }
    </div>
  );
}

const Preloader = styled.div`
@media(min-width: 960px){
  display:flex;
  justify-content:center;
  align-items:center;
  width: 100%;
  height: 100vh;
}
@media(max-width:959px){
  display:flex;
  justify-content:center;
  align-items:center;
  width: 100%;
  height: 100vh;
}
`;

export default Landing;