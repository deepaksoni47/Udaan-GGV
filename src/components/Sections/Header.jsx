import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
// Components
import FullButton from "../Buttons/FullButton";
// Assets
import QuotesIcon from "../../assets/svg/Quotes";
import Dots from "../../assets/svg/Dots";
import Typewriter from "typewriter-effect";

export default function Header(props) {
  const handleClickScroll = () => {
    const element = document.getElementById('contact');
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div  className="lightBg" style={{ width: "100vw" }}>
      <Wrapper id = "header" className="container lightBg flexSpaceCenter">
        <LeftSide className="flexCenter">
          <div>
            <motion.div initial={{ x:-400 }} animate={{x:0}} transition={{type: "spring", stiffness: 360, damping: 20}}>
            <Entry className="Bold darkColor font40">{props.Greeting}</Entry>
            </motion.div>
            <CoverEntry>
            <motion.div initial={{ y:400 }} animate={{y:0, zIndex:9}} transition={{ type: "spring", stiffness: 560, damping: 100}}>
            <Uentry className="Bold darkColor font80">{props.title}</Uentry>
            </motion.div>
            <motion.div initial={{ x:400 }} animate={{x:0}} transition={{duration:4, type: "spring", stiffness: 360, damping: 100}}>
            <Entry className="Bold darkColor font20">{props.salutation}</Entry>
            </motion.div>
            </CoverEntry>
            <HeaderP className="font15 darkColor semiBold">
              {props.content}
            </HeaderP>
              <BtnWrapper>
              <motion.div animate={{ scale: [1, 1.1, 1.1, 1, 1], borderRadius: ["0%", "0%", "25%", "25%", "0%"]}} transition={{duration: 6, ease: "easeInOut", times: [0, 0.2, 0.5, 0.8, 1], repeat: Infinity, repeatDelay: 1}}>
                <a href = {props.ButtonLink}>
                <FullButton title={props.button} mode="light" onClick={handleClickScroll}/>
                </a>
              </motion.div>
              </BtnWrapper>
          </div>
        </LeftSide>
        <RightSide>
          <ImageWrapper>
          {/* <motion.div initial={{ x:100 }} animate={{x:0, zIndex:9}} transition={{ type: "spring", stiffness: 560, damping: 100}}> */}
          <motion.div initial={{ opacity:0 }} animate={{opacity:1, scale: 1, zIndex:9 }} transition={{ ease: "anticipate", duration: 2 }}>
            <Img
              className="radius8"
              src={props.img}
              alt="office"
              style={{ zIndex: 9 }}
            />
            </motion.div>
            <QuoteWrapper className="flexCenter lightBg radius8" style={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"}}>
              <QuotesWrapper>
                <QuotesIcon />
              </QuotesWrapper>
              <div>
                <p className="font15">

                  <Typewriter

options={{
  loop:true,
  pauseFor:1500, 
}}
  
       onInit={(typewriter)=> {
      
  
       typewriter
        
       .typeString(" Creativity is intelligence having fun")
         
       .pauseFor(1000)
       .deleteAll()
       .typeString("Udaan Welcomes you to showcase your creativity")
       .pauseFor(1000)
       .start();
       }}
       />
                </p>
                <p
                  className="font13 semiBold textRight"
                  style={{ marginTop: "10px" }}
                >
                </p>
              </div>
            </QuoteWrapper>
            <DotsWrapper>
              <Dots />
            </DotsWrapper>
          </ImageWrapper>
          <GreyDiv className="accentBg"></GreyDiv>
        </RightSide>
      </Wrapper>
    </div>
  );
}



const CoverEntry = styled.div`
@media(min-width:960px){
    display: flex;
}
`;

const Entry = styled.h1`
  font-family: 'Fredericka the Great', cursive;
  @media(min-width:960px){
    padding-top:40px;
  }

`;
const Uentry = styled.p`
  font-family: 'Cabin Sketch', cursive;
  
  :hover{
  animation-name: shake;
  
    animation-duration: 1s;
    animation-iteration-count:.5s; //infinite
  
    @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
    }
  }
`;
const Wrapper = styled.section`
  padding-top: 10vh;
  width: 100%;
  min-height: 100vh;
  @media (max-width: 960px) {
    flex-direction: column-reverse;
    padding-top: 8vh;
  }
`;
const LeftSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 2;
    margin: 50px 0;
    text-align: center;
  }
  @media (max-width: 560px) {
    margin: 15vh 0;
  }
`;
const RightSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 1;
    margin-left:70px;
  }
`;
const HeaderP = styled.div`
  max-width: 470px;
  padding: 15px 0 50px 0;
  line-height: 1.5rem;
  @media (max-width: 960px) {
    padding: 15px 0 50px 0;
    text-align: center;
    max-width: 100%;
  }
  font-family: 'Montserrat', sans-serif;
`;
const BtnWrapper = styled.div`
  max-width: 190px;
  @media (max-width: 960px) {
    margin: 0 auto;
  }
`;
const GreyDiv = styled.div`
  width: 30%;
  height: 90%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
  @media (max-width: 960px) {
    display: none;
  }
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 9;
  @media (max-width: 960px) {
    width: 100%;
    justify-content: center;
  }
`;
const Img = styled.img`
  @media (max-width: 560px) {
    width: 80%;
    height: auto;
  }
`;
const QuoteWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 50px;
  max-width: 330px;
  padding: 30px;
  z-index: 99;
  @media (max-width: 960px) {
    left: 20px;
  }
  @media (max-width: 560px) {
    bottom: -50px;
  }
  
`;
const QuotesWrapper = styled.div`
  position: absolute;
  left: -20px;
  top: -10px;
`;
const DotsWrapper = styled.div`
  position: absolute;
  right: -100px;
  bottom: 100px;
  z-index: 2;
  @media (max-width: 960px) {
    right: 100px;
  }
  @media (max-width: 560px) {
    display: none;
  }
`;