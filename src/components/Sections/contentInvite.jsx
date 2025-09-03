import React,{useRef} from 'react'
import { motion } from "framer-motion";
import styled from "styled-components";
// import Modal from './Modal';
// Components
// import ClientSlider from "../Elements/ClientSlider";
import ServiceBox from "../Elements/ServiceBox";
import FullButton from "../Buttons/FullButton";
// Assets
import AddImage1 from "../../assets/img/add_udaan_4.jpg";
import AddImage2 from "../../assets/img/add_udaan_6.jpg";
import AddImage3 from "../../assets/img/add_udaan_7.jpg";
import AddImage4 from "../../assets/img/add_udaan_8.jpg";
export default function ContentInvite() {
  const [openModal, setOpenModal] = React.useState(false)
    const scrollRef = useRef(null)
    const handleButtonClick = () => {
    setOpenModal(true);
    // Redirect to the Google Form link
    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSfWj7bnad8OhfYhtM56MvKs8XAnDuzM0O8bWZk3fF--xbe8iA/viewform';
  };
  return (
    <Wrapper >
      <div className="whiteBg">
        <div className="container">
          <HeaderInfo >
            <h4 className="font15 semiBold">Get excited!</h4>
            <h1 className="font40 extraBold">We are accepting submissions</h1>
            <br/>
            <ContentP className="font13">
            Season X of UDAAN magazine is now inviting submissions for the 2022-23 issue.
Submissions are open from the 16th July 2023 to the 10th August 2023. You
can submit your content online in the given form below or offline in the UDAAN drop-boxes
placed at all important locations across the university.

              <br />
              The categories under which you can submit are-
            </ContentP>
          </HeaderInfo>
          <ServiceBoxRow className="flex">
            
            <ServiceBoxWrapper >
            <motion.div whileHover={{ scale: 1.05}}>
            <a href = "#contentInvite">
              <ServiceBox
                icon="roller"
                title="Art & Design"
                subtitle="A clear picture of your original artwork in JPEG/JPG format and not
                more than 25Mb."
              />
              </a>
              </motion.div>
            </ServiceBoxWrapper>
            
            <ServiceBoxWrapper>
            <motion.div whileHover={{ scale: 1.05 }}>
            <a href = "#contentInvite">
              <ServiceBox
                icon="monitor"
                title="English Editorials"
                subtitle="Original prose or poetry, fiction or non-fiction, in PDF format, with
                not more than 400 words."
              />
              </a>
            </motion.div>
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
            <motion.div whileHover={{ scale: 1.05 }}>
            <a href = "#contentInvite">
              <ServiceBox
                icon="browser"
                title="Hindi Editorials"
                subtitle="Original prose or poetry, fiction or non-fiction, in PDF format, with not
                more than 400 words."
              />
              </a>
            </motion.div>
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
            <motion.div whileHover={{ scale: 1.05 }}>
            <a href = "#contentInvite">
              <ServiceBox
                icon="printer"
                title="Photography"
                subtitle="Photographs clicked by you sent in JPEG/JPG format and not more than
                25Mb."
              />
            </a>
            </motion.div> 
            </ServiceBoxWrapper>
          </ServiceBoxRow>
        </div>
        <div  id="contentInvite" style={{padding:"12px"}}></div>
        <div  className="accentBg lightColor">
          <div className="container">
            <Advertising className="flexSpaceCenter">
              <AddLeft>
                <ContentP className="font15 semiBold">Put on your creative hats!</ContentP>
                <h2 className="font40 extraBold">A Study of Creativity</h2>
                <ContentP className="font15">
                We are eager to see your flair so don't hesitate to flaunt your best works.
                </ContentP>
                <ButtonsRow
                  className="flexNullCenter"
                  style={{ margin: "30px 0" }}
                >
                  <div style={{ width: "190px" }}>
                  <FullButton
        mode="dark"
        title="Upload Content"
        action={handleButtonClick}
      />
                    {/* <FullButton
                      mode="dark"
                      title="Upload Content"
                      action={() => setOpenModal(true)}
                    />
                    <Modal open={openModal} onClose = {() => setOpenModal(false)} /> */}
                  </div>
                  <ContactButton style={{ width:"190px" }}>
                    <a href = "#cont">
                    <FullButton
                      mode="dark"
                      title="Contact Us"
                    />
                    </a>
                  </ContactButton>
                </ButtonsRow>
              </AddLeft>
              <AddRight>
              <div ref={scrollRef} style={{ overflow: "scroll" }}>
                <AddRightInner>
                  <div className="flexNullCenter">
                    <AddImgWrapp1 className="flexCenter">
                      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{duration:3}}>
                      <img  src={AddImage1} alt="office" />
                      </motion.div>
                    </AddImgWrapp1>
                    <AddImgWrapp2>
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{duration:4}}>
                      <img src={AddImage2} alt="office" />
                      </motion.div>
                    </AddImgWrapp2>
                  </div>
                  <div className="flexNullCenter">
                    <AddImgWrapp3>
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{duration:1}}>
                      <img src={AddImage3} alt="office" />
                      </motion.div>
                    </AddImgWrapp3>
                    <AddImgWrapp4>
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{duration:2}}>
                      <img src={AddImage4} alt="office" />
                      </motion.div>
                    </AddImgWrapp4>
                  </div>
                </AddRightInner>
              </div>
              </AddRight>
            </Advertising>
          </div>
        </div>
      </div>
      {/* <div className="lightBg" style={{ padding: "50px 0" }}>
        <div className="container">
          <ClientSlider />
        </div>
      </div> */}
    </Wrapper>
  );
}

const ContactButton = styled.div`
@media(min-width:860px){ 
margin-left: "8px";
}
`;

const Wrapper = styled.section`
  width: 100%;
  font-family: 'Playfair Display', serif;
`;
const ServiceBoxRow = styled.div`
  @media (max-width: 860px) {
    flex-direction: column;
  }
`;
const ServiceBoxWrapper = styled.div`
  width: 20%;
  text-align: center;
  margin-right: 5%;
  margin-top:6vh;
  margin-bottom: 6vh;
  padding: 8vh 1vh;
  @media (max-width: 860px) {
    width: 100%;
    margin-top:4vh;
    margin-bottom: 4vh;
  }
  :hover{
    box-shadow:rgba(55,214,244, 0.3) 0px 5px 15px;
    border-radius: 50px;
    box-sizing:border-box;
  }
`;
const HeaderInfo = styled.div`
    text-align: center;
    margin-bottom:30px;
    font-family: 'EB Garamond', serif;
`;
const ContentP = styled.p`
font-family: 'Montserrat', sans-serif;
font-weight: bold;
`
const Advertising = styled.div`
  margin: 20vh 0;
  padding: 100px 0;
  position: relative;
  @media (max-width: 1160px) {
    padding: 100px 0 40px 0;
  }
  @media (max-width: 860px) {
    flex-direction: column;
    padding: 0 0 30px 0;
    margin: 80px 0 0px 0;
  }
`;
const ButtonsRow = styled.div`
  @media (max-width: 860px) {
    display: flex;
    flex-direction: column;
  }
`;
const AddLeft = styled.div`
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
  position: absolute;
  top: -70px;
  right: 0;
  @media (max-width: 860px) {
    width: 80%;
    position: relative;
    order: 1;
    top: -40px;
  }
`;
const AddRightInner = styled.div`
  width: 100%;
`;
const AddImgWrapp1 = styled.div`
  width: 48%;
  margin: 0 6% 10px 6%;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;
const AddImgWrapp2 = styled.div`
  width: 30%;
  margin: 0 5% 10px 5%;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;
const AddImgWrapp3 = styled.div`
  width: 20%;
  margin-left: 40%;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;
const AddImgWrapp4 = styled.div`
  width: 30%;
  margin: 0 5% auto;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;