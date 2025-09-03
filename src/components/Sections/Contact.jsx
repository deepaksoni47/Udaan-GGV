import React from "react";
import styled from "styled-components";
import axios from 'axios';
// ToastContainer,
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {

  const [name, setname] = React.useState("")
  const [email, setemail] = React.useState("")
  const [subject, setsubject] = React.useState("")
  const [message, setmessage] = React.useState("")




        const handlename = (event)=>{
          const name = event.target.value;
          console.log(name);
          setname(name)
        }

        const handleemail = (event)=>{
          const email = event.target.value;
          console.log(email);
          setemail(email)
        }
        const handlesubject = (event)=>{
          const subject = event.target.value;
          console.log(subject);
          setsubject(subject)
        }
        const handlemessage = (event)=>{
          const message = event.target.value;
          console.log(message);
          setmessage(message);
        }

        const submitMessage = async(e)=>{
          e.preventDefault();
          
          let form_data = new FormData();
          form_data.append('name', name)
          form_data.append('email', email)
          form_data.append('subject', subject)
          form_data.append('message', message)


          console.log(form_data);

          await axios.post('https://hammerhead-app-ni47s.ondigitalocean.app/msg/', form_data, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
          .then(result=>{
            toast('🚀 We recieved the message, our team will contact you shortly.', {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch(error=>{
            toast('🦄 Failed! Please try again', {
              background: "#00FF00 !important",
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
        }

  return (
    <Wrapper id="cont">
      <div className="lightBg">
        <div className="container">
          <HeaderInfo>
            <Hh className="font40 extraBold">GET IN TOUCH</Hh>
            <hr
              style={{
                width: "10vh",
                height: "2px",
                backgroundColor: "#37D6F4",
                border: "none",
                margin: "0px auto 20px",
              }}
            />
            <ContentP className="font15 greyColor" style={{ margin: "0 12vw" }}>
              If you have any doubts or suggestions for us, you can use this space. We'll try to get back to you soon.

            </ContentP>
          </HeaderInfo>
          <form onSubmit = {submitMessage} encType="multipart/form-data">
            <div className="row" style={{ paddingBottom: "30px" }}>
              <Fdiv
                className="whiteBg col-xs-12 col-sm-12 col-md-6 col-lg-6 shadowPlus radius6"
                style={{ paddingBottom: "20px" }}
              >
                <Form>
                  <label className="font15">Name:</label>
                  <input type="text" id="Name" name="name" className="font15" value={name} onChange={(e) => handlename(e)}
                  />
                  <label className="font15">Email:</label>
                  <input type="text" id="email" name="email" className="font15" value={email} onChange={(e) => handleemail(e)}
                  />
                  <label className="font15">Subject:</label>
                  <input type="text" id="subject" name="subject" className="font15" value={subject} onChange={(e) => handlesubject(e)}
                  />
                  <label className="font15">Message:</label>
                  <textarea rows="4" cols="50" type="text" id="message" name="message" className="font15" value={message} onChange={(e) => handlemessage(e)}
                  />
                </Form>
                <SumbitWrapper className="flex">
                  <ButtonInput
                    type="submit"
                    value="Send Message"
                    className="pointer animate radius8"
                    style={{ maxWidth: "220px" }}
                    action = {submitMessage}
                  />
                </SumbitWrapper>
                <ToastContainer 
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"/>
              </Fdiv>
            
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 flex">
              <iframe
                title="address_map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3464.918648042451!2d82.13751!3d22.129284000000002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc25336236f6ef034!2sUDAAN!5e1!3m2!1sen!2sin!4v1668890115089!5m2!1sen!2sin"
                width="800"
                height="600"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ borderRadius: "6px" }}
              ></iframe>
            </div>
           
          </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
}

const Fdiv = styled.div`
font-family: 'EB Garamond', serif;
`;

const Hh = styled.h1`
font-family: 'EB Garamond', serif;
  background: linear-gradient(to right, hsl(0, 0%, 30%) 0, hsl(0, 0%, 70%) 10%, hsl(0, 0%, 30%) 30%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 4s infinite linear;
  @keyframes shine {
  0% {
    background-position: 0;
  }
  60% {
    background-position: 600px;
  }
  100% {
    background-position: 800px;
  }
}
`;
const Wrapper = styled.section`
  width: 100%;
  font-family: 'Playfair Display SC', serif;
`;
const HeaderInfo = styled.div`
  padding: 70px 0 30px 0;
    text-align: center;

`;
const Form = styled.div`
  padding-top: 70px;
  input,
  textarea {
    width: 100%;
    background-color: transparent;
    border: 0px;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid #707070;
    height: 30px;
    margin-bottom: 30px;
  }
  textarea {
    min-height: 100px;
  }
  @media (max-width: 860px) {
    padding: 30px 0;
  }
`;
const ButtonInput = styled.input`
  border: none;
  background-color: #37D6F4;
  width: 100%;
  padding: 15px;
  outline: none;
  color: #fff;
  :hover {
    transform: translatey(-5px);
  }
  @media (max-width: 991px) {
    margin: 0 auto;
  }
`;

const ContentP = styled.p`
font-family: 'Montserrat', sans-serif;
`;

const SumbitWrapper = styled.div`
  @media (max-width: 991px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;

export default Contact;









