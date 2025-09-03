import React from "react";
import styled from "styled-components";
// Assets
import LogoImg from "../../assets/img/logo/UDAAN_logo.png";

export default function Footer() {

  const getCurrentYear = () => {
    return new Date().getFullYear();
  }

  return (
    <Wrapper>
      <div className="blackBg">
        <div className="container">
          <InnerWrapper
            className="flexSpaceCenter"
            style={{ padding: "2vh 0" }}
          >
            <StyleI>
              <img src={LogoImg} alt="UDAAN Logo" style={{ width: "15%" }} />
            </StyleI>
            <StyleP className="whiteColor font15">
              © {getCurrentYear()} -{" "}
              <span className="semiBold font1">UDAAN</span> All
              Right Reserved
            </StyleP>
          </InnerWrapper>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
const InnerWrapper = styled.div`
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
const StyleP = styled.p`
  white-space: nowrap;
`;

const StyleI = styled.div`
  @media (max-width: 550px) {
    width: 100vw;
    text-align: center;
  }
`;
