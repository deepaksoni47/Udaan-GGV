import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoImg from "../../assets/img/logo/UDAAN_black.png";
import Facebook from "../../assets/img/facebook.png";
import Mail from "../../assets/img/mail.png";
import Linkedin from "../../assets/img/linkedin.png";
import Instagram from "../../assets/img/instagram.png";
import Youtube from "../../assets/img/youtube.png";
import pinterest from "../../assets/img/pinterest.png";
import Twitter from "../../assets/img/twitter.png";
// Assets
// import CloseIcon from "../../assets/svg/CloseIcon";
// import LogoIcon from "../../assets/svg/Logo";

export default function Sidebar({ sidebarOpen, toggleSidebar }) {
  return (
    <Wrapper className="animate lightBg" sidebarOpen={sidebarOpen}>
      <SidebarHeader className="flexSpaceCenter">
        <div className="flexNullCenter">
          {/* <LogoIcon /> */}
          <h1 className="whiteColor font20" style={{ marginLeft: "15px" }}>
          <img src={LogoImg} alt="UDAAN Logo" style={{ width: "30%", paddingTop:"10px" }} />
          </h1>
        </div>
        <CloseBtn onClick={() => toggleSidebar(!sidebarOpen)} className="animate pointer">
          {/* <CloseIcon /> */} X
        </CloseBtn>
      </SidebarHeader>

      <UlStyle className="flexNullCenter flexColumn ">
      <li className="semiBold font15 pointer navlist">
          <Link
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className="darkColor navA"
            style={{ padding: "10px 15px" }}
            to="/"
            offset={-60}
          >
            Home
          </Link>
        </li>
        <li className="semiBold font15 pointer navlist">
          <Link
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className="darkColor navA"
            style={{ padding: "10px 15px" }}
            to="/team"
            offset={-60}
          >
            Teams
          </Link>
        </li>
        <li className="semiBold font15 pointer navlist">
          <Link
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className="darkColor navA"
            style={{ padding: "10px 15px" }}
            to="/gallery"
            offset={-60}
          >
            Gallery
          </Link>
        </li>
        <li className="semiBold font15 pointer navlist">
          <Link
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className="darkColor navA"
            style={{ padding: "10px 15px" }}
            to="/magazines"
            offset={-60}
          >
            Magazine
          </Link>
        </li>
        <li className="semiBold font15 pointer navlist">
          <a 
            href="#cont"
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className="darkColor navA"
            style={{ padding: "10px 15px" }}
            offset={-60}
          >
            Contact
          </a>
        </li>
      </UlStyle>
      <SocioUL>
        <Socialli><a href="mailto:udaantheculture@gmail.com"><img src={Mail} alt="" style={{height:"1.7rem", width:"1.7rem"}}/></a></Socialli>
        <Socialli><a href="https://www.instagram.com/udaan.ggv/?theme=dark" target="_blank"><img src={Instagram} alt="" style={{height:"1.7rem", width:"1.7rem"}}/></a></Socialli>
        <Socialli><a href="https://www.facebook.com/udaan.ggv/" target="_blank"><img src={Facebook} alt="" style={{height:"1.7rem", width:"1.7rem"}}/></a></Socialli>
        <Socialli><a href="https://www.linkedin.com/company/udaan.ggv/mycompany/" target="_blank"><img src={Linkedin} alt="" style={{height:"1.7rem", width:"1.7rem"}}/></a></Socialli>
        <Socialli><a href="https://in.pinterest.com/udaantheculture/" target="_blank"><img src={pinterest} alt="" style={{height:"1.7rem", width:"1.7rem"}}/></a></Socialli>
        <Socialli><a href="https://www.youtube.com/@UdaanGGV" target="_blank"><img src={Youtube} alt="" style={{height:"1.7rem", width:"1.7rem"}}/></a></Socialli>
        <Socialli><a href="https://twitter.com/udaan_ggv" target="_blank"><img src={Twitter} alt="" style={{height:"1.7rem", width:"1.7rem"}}/></a></Socialli>
      </SocioUL>
    </Wrapper>
  );
}

const SocioUL = styled.ul`
margin:10px;
text-align: center;
border:2px grey solid;
border-radius: 20px;
`;

const Socialli = styled.ul`
display:inline;
padding:0.3rem;
margin-top:20px;
cursor:pointer;
img
{
  padding-top:2px;
:hover{
  transform:scale(1.05) translateX(1px);
}
}
`; 
const Wrapper = styled.nav`
  width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  padding: 0 30px;
  right: ${(props) => (props.sidebarOpen ? "0px" : "-400px")};
  z-index: 9999;
  @media (max-width: 400px) {
    width: 100%;
  }
`;
const SidebarHeader = styled.div`
  padding: 20px 0;
`;
const CloseBtn = styled.button`
  border: 0px;
  outline: none;
  background-color: transparent;
  padding: 10px;
`;
const UlStyle = styled.ul`
  padding: 40px;
  li {
    margin: 20px 0;
  }
`;
