import React,{useEffect} from "react";
import styled from "styled-components";
import { motion, useViewportScroll, useTransform, useAnimation} from "framer-motion";
// Components
import {useInView} from 'react-intersection-observer';
import FullButton from "../Buttons/FullButton";
// Assets
import WaveLine from "./WaveLine";

import AddImage2 from "../../assets/img/add_udaan_1.jpg";

export default function About() {
  const {ref, inView} = useInView();
  const animation = useAnimation();
  const animation2 = useAnimation()
  useEffect(() => {
    if(inView){
      animation.start({
        x:0, 
        transition:{type:"Spring", duration:0.5,bounce:1}
      })
      animation2.start({
        x:-1400, 
      })
    }
    if(!inView){
      animation.start({
        x:300,
      })
      animation2.start({
        x:0,
        transition:{type:"Spring", duration:0.5,bounce:1}
      })
    }
  });


  const { scrollYProgress } = useViewportScroll()
const scale = useTransform(scrollYProgress, [0.4, 1], [1.1, 2]);
  return (
    <Wrapper id="About">
      <div  className="blackBg">
        <div className="container whiteColor" style={{ paddingBottom: "2vh" }}>
          <HeaderInfo >
          <motion.div animate={animation2}>
            <h1 className="font40 extraBold">Who are we?</h1>
            <div className="font18">
              <b>What comes to your mind when you hear the word magazine?</b>
              <br />
              <br />
              <p className="font14">
              Words? Stories? Boring long articles? Something that's kept for
              leisure in dull waiting rooms?
              
              <br />
              <br/>
              <b>No</b>, on the contrary, it's the most happening thing in the
              university. It is a foldable world of breathtaking pictures,
              stunning artwork, and some of the most intriguing stories. We are
              a platform that gives you the runway to fly as an artist, writer,
              photographer, designer, marketer, coder, or all of the above!
              </p>
              <br />
              <br />
              <b>
                <i>We are the spirit of GGV.</i>
              </b>
              <br />
              <br />
              <p className="font14">
              As the official magazine of GGV, our primary responsibility is to
              publish an annual magazine born under the creative guidance of our
              Hon’ble VC, Mr. Alok Chakrawal sir, and teacher coordinator Mr.
              Manish Srivasatava sir. It is nurtured with the blood and sweat of
              a team carefully handpicked and supervised by our student
              coordinators and in the end, adorned by YOUR talents. We are not
              joking when we say UDAAN magazine is a gift of love from us to the
              world as our magazine finds a place at the table of the Hon'ble
              President of India.
              </p>
            </div>
          </motion.div>
          </HeaderInfo>
          <VideoContainer>
            <motion.div >
            <iframe
              src="https://www.youtube.com/embed/x3AoKpJv6p4?controls=0"
              title="YouTube video player"
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              }}
            ></iframe>
            </motion.div>
          </VideoContainer>
        </div>
      </div>
      <WaveCont className="lightBg">
        <Wavealong className="container">
          <Advertising className="flexSpaceCenter">
            <AddLeft>
              <AddLeftInner>
                <ImgWrapper className="flexCenter">
                <motion.div style={{ scale }}>
                  <img className="radius8" src={AddImage2} alt="add" />
                </motion.div>
                </ImgWrapper>
              </AddLeftInner>
            </AddLeft>
            <AddRight ref={ref}>
            <motion.div animate={animation}>
              <h4 className="font15 semiBold">About Our University</h4>
              <Uname className="font30 extraBold">
                Guru Ghasidas Vishwavidyalaya, Bilaspur
              </Uname>
              <UContent className="font16">
                Established in 1983 and designated the status of a central
                university in 2009, Guru Ghasidas Vishwavidyalaya is not only an
                institution of excellence rather a tale of luminaries. A vision
                for a glorious tomorrow,built in a creative environment that
                promises its students a world of possibilities. GGV stands for
                many different things for different people, but one common
                takeaway is immense exposure. With more than 11 schools and 32
                departments, the university ensures not only your academic
                growth but enhances your cultural growth as well. There are
                different clubs in the university for the students to learn and
                gain confidence in their skills.

              </UContent>
              {/* <br />
              <UContent className="font15 semiBold">
              💃 Abhinartan ~ The official dance group of GGV 
                <br />
                📹 Chalchitra ~ A Culture of Filmmaking
                <br /> 🥁 Tarang ~ The Band
                <br />
                🪶 Udaan ~ The Culture
                <br /> 🎭 Urchins ~ The University Drama & Play Group
              </UContent> */}
              <ButtonsRow
                className="flexNullCenter"
                style={{ margin: "30px 0" }}
              >
                <div style={{ width: "190px" }}>
                  <FullButton
                    title="University Website"
                    action={() => window.open("https://www.ggu.ac.in/")}
                  />
                </div>
              </ButtonsRow>
              </motion.div>
            </AddRight>
          </Advertising>
        </Wavealong>
      </WaveCont>
      <WaveDiv>
        <WaveLine/>
      </WaveDiv>
    </Wrapper>
  );
}


const WaveCont = styled.div`
@media (min-width: 960px){
position:relative;
margin-left: 110px;
}
`;

const Wavealong = styled.div`
@media (min-width: 960px){
position: absolute;
z-index: 1;
}
`;

const WaveDiv = styled.div`
@media (min-width: 960px){
padding-top: 300px;
padding-bottom: 100px;
}
@media (max-width: 960px){
display:none;
}
z-index: 0;
`;

const UContent = styled.p`
  font-family: 'Montserrat', sans-serif;
`;

const Uname = styled.h2`
  font-family: 'EB Garamond', serif;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Wrapper = styled.section`
  width: 100%;
  padding: 10vh 0;
  font-family: 'Merriweather', serif;
`;
const HeaderInfo = styled.div`
  padding: 10vh 0;
  @media (max-width: 860px) {
    justify-content: space-evenly;
  }
`;
const Advertising = styled.div`
  padding: 100px 0;
  margin: 100px 0;
  position: relative;
  @media (max-width: 1160px) {
    padding: 60px 0 40px 0;
  }
  @media (max-width: 860px) {
    flex-direction: column;
    padding: 0 0 30px 0;
    margin: 150px 0 0px 0;
  }
`;
const ButtonsRow = styled.div`
  @media (max-width: 860px) {
    justify-content: space-between;
  }
`;
const AddLeft = styled.div`
  position: relative;
  width: 50%;
  p {
    max-width: 475px;
  }
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
    text-align: center;
    h2 {
      line-height: 3rem;
      margin: 15px 0;
    }
    p {
      margin: 0 auto;
    }
  }
`;
const AddRight = styled.div`
  width: 50%;
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
  }
`;
const AddLeftInner = styled.div`
  width: 100%;
  position: absolute;
  top: -300px;
  left: 0;
  @media (max-width: 1190px) {
    top: -250px;
  }
  @media (max-width: 920px) {
    top: -200px;
  }
  @media (max-width: 860px) {
    order: 1;
    position: relative;
    top: -60px;
    left: 0;
  }
`;
const ImgWrapper = styled.div`
  width: 100%;
  padding: 0 15%;
  img {
    width: 100%;
    height: auto;
  }
  @media (max-width: 400px) {
    padding: 0;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  margin-bottom: 5vh;
`;
