

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// Components
import Sidebar from "./Sidebar";
import Backdrop from "../Elements/Backdrop";
import LogoImg from "../../assets/img/logo/UDAAN_black.png";
import {motion} from 'framer-motion';
// Assets
// import LogoIcon from "../../assets/svg/Logo";
// import BurgerIcon from "../../assets/svg/BurgerIcon";

export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);


  return (

    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}

      <Wrapper className="flexCenter animate whiteBg" style={y > 100 ? { height: "60px" } : { height: "80px" }}>
      
        <NavInner className="container flexSpaceCenter">
          <Link  className="pointer" to="/" >
            <motion.img initial={{opacity:0           
          }}

          animate={{
              opacity:1
          }}
          transition={{
              duration:2,
              ease:'easeInOut'
          }}
            src={LogoImg} width="150rem" alt="UDAAN Logo"/>
          </Link> 
          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            {/* <BurgerIcon /> */}<svg id="Layer_2" enable-background="new 0 0 32 32" width={20.459} height={50.42} viewBox="0 0 32 32"  xmlns="http://www.w3.org/2000/svg"><path d="m29 31.981h-8.334c-1.654 0-3-1.346-3-3v-8.334c0-1.654 1.346-3 3-3h8.334c1.654 0 3 1.346 3 3v8.334c0 1.655-1.346 3-3 3zm-8.334-12.334c-.552 0-1 .448-1 1v8.334c0 .552.448 1 1 1h8.334c.552 0 1-.448 1-1v-8.334c0-.552-.448-1-1-1zm-7.521 12.291h-12.145c-.553 0-1-.447-1-1s.447-1 1-1h12.145c.553 0 1 .447 1 1s-.448 1-1 1zm0-6.052h-12.145c-.553 0-1-.447-1-1s.447-1 1-1h12.145c.553 0 1 .447 1 1s-.448 1-1 1zm.189-6.052h-12.334c-.553 0-1-.447-1-1s.447-1 1-1h12.334c.553 0 1 .447 1 1s-.447 1-1 1zm15.666-5.456h-8.334c-1.654 0-3-1.346-3-3v-8.334c0-1.654 1.346-3 3-3h8.334c1.654 0 3 1.346 3 3v8.334c0 1.654-1.346 3-3 3zm-8.334-12.334c-.552 0-1 .448-1 1v8.334c0 .552.448 1 1 1h8.334c.552 0 1-.448 1-1v-8.334c0-.552-.448-1-1-1zm-9.332 12.334h-8.334c-1.654 0-3-1.346-3-3v-8.334c0-1.654 1.346-3 3-3h8.334c1.654 0 3 1.346 3 3v8.334c0 1.654-1.346 3-3 3zm-8.334-12.334c-.552 0-1 .448-1 1v8.334c0 .552.448 1 1 1h8.334c.552 0 1-.448 1-1v-8.334c0-.552-.448-1-1-1z"/></svg>
          </BurderWrapper>
          <UlWrapper className="flexNullCenter">
          <li className="semiBold font15 pointer navlist">
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{scale: 0.8}}>
              <Link style={{ padding: "10px 15px" }} to="/"  offset={-80}>
                Home
              </Link>
            </motion.div>
            </li>
            <li className="semiBold font15 pointer navlist">
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{scale: 0.8}}>
              <Link style={{ padding: "10px 15px" }} to="/team"  offset={-80}>
                Team
              </Link>
            </motion.div>
            </li>
            <li className="semiBold font15 pointer navlist">
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{scale: 0.8}}>
              <Link style={{ padding: "10px 15px" }} to="/gallery" offset={-80}>
                Gallery
              </Link>
            </motion.div>
            </li>
            <li className="semiBold font15 pointer navlist">
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{scale: 0.8}}>
              <Link style={{ padding: "10px 15px" }} to="/magazines" offset={-80}>
                Magazines
              </Link>
            </motion.div>  
            </li>
            <li className="semiBold font15 pointer navlist">
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{scale: 0.8}}>
              <a style={{ padding: "10px 15px" }} href = "#cont">
                Contact
              </a>
            </motion.div>
            </li>
          </UlWrapper>
        </NavInner>
      
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: absolute;
  height: 100%;
`
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;



