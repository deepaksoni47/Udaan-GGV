import React from "react";
import styled from "styled-components";
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typewriter from "typewriter-effect";


function Modal({ open, onClose }) {

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  
  const [name, setname] = React.useState("")
  const [email, setemail] = React.useState("")
  const [type_content, settype_content] = React.useState("")
  const [contact, setcontact] = React.useState("")
  const [dept, setdept] = React.useState("")
  const [content, setcontent] = React.useState(null)
  const [college, setcollege] = React.useState("")
  const [error, setError] = React.useState("");

        



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
        const handletype_content = (event)=>{
          const type_content = event.target.value;
          console.log(type_content);
          settype_content(type_content)
        }
        const handlecontact = (event)=>{
          const contact = event.target.value;
          console.log(contact);
          setcontact(contact)
        }
        const handledept = (event)=>{
          const dept = event.target.value;
          console.log(dept);
          setdept(dept)
        }
        const handlecontent = (event)=>{
          const content = event.target.files[0];
          console.log(content);
          setcontent(content)
             
        }
        const handlecollege = (event)=>{
          const college = event.target.value;
          console.log(college);
          setcollege(college)
        }

        // const checkEmail = (e) => {
        //   setemail(e.target.value);

        //   if(regex.test(email) === false){
        //     setError('Enter a valid email address!');
        //   }
          
        //   else {
        //     setError('');
        //     const email = e.target.value;
        //     console.log(email);
        //     setemail(email)
        //   }
        // }

        const submitContributor = async(e)=>{
          // if(email!='' && !{error}){
          e.preventDefault();
          
          let form_data = new FormData();
          form_data.append('name', name)
          form_data.append('email', email)
          form_data.append('type_content', type_content)
          form_data.append('contact', contact)
          form_data.append('dept', dept)
          form_data.append('college', college)
          form_data.append('content', content)

          console.log(form_data);
          await axios.post('https://hammerhead-app-ni47s.ondigitalocean.app/content/', form_data, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
          .then(result=>{
            toast('✨ Thank You! We appreciate your contribution', {
              position: "top-center",
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
              position: "top-center",
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
        // }

  

  if (!open) return null;
  return (
    <Overlay onClick={onClose}>
      <PopModal>
        <div onClick={(e) => {e.stopPropagation();}} className="modalContainer col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <ModalR>
            <ModalClose
              onClick={onClose}
              class="closeBtn col-xs-12 col-sm-12 col-md-12 col-lg-12"
            >
              X
            </ModalClose>
            <Wrapper id="contact">
              <div className="whiteBg">
                <div className="container">
                  <HeaderInfo>
                    <h1 className="font30 extraBold col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      
                      <Typewriter
  
       onInit={(typewriter)=> {
  
       typewriter
        
       .typeString("UDAAN Welcomes You!")
         
       .pauseFor(1000)
       .deleteAll()
       .typeString("Scroll down to Submit")
       .start();
       }}
       />
                    </h1>
                  </HeaderInfo>
                  <form onSubmit = {submitContributor} encType="multipart/form-data">
                  <div className="row" style={{ paddingBottom: "50px" }}>
                    <div
                      className="whiteBg col-xs-12 col-sm-12 col-md-12 col-lg-12 shadowPlus radius6"
                      style={{ paddingBottom: "20px" }}
                    >
                      <Form>
                        <Labeled className="font15">Name:</Labeled>
                        <input type="text" id="name" name="name" className="font15" value={name} onChange={(e) => handlename(e)}/>
                        <Labeled className="font15">Email:</Labeled>
                        <input type="text" id="email" name="email" className="font15" value={email} onChange={(e) => handleemail(e)}/>
                        <Labeled  className="font15">Type of content:</Labeled>
                        <input list = "contType" type="text" id="type_content" name="type_content" className="font15" value={type_content} onChange={(e) => handletype_content(e)}/>
                          <datalist id="contType">
                            <option value="Art & Craft"/>
                            <option value="English Editorials"/>
                            <option value="Hindi Editorials"/>
                            <option value="Photograph"/>
                          </datalist>
                        <Labeled className="font15">Phone No.:</Labeled>
                        <input type="text" id="contact" name="contact" className="font15" value={contact} onChange={(e) => handlecontact(e)}/>
                        <Labeled className="font15">Department:</Labeled>
                        <input list="browsers" id="dept" name="dept" className="font15" value={dept} onChange={(e) => handledept(e)}/>
                          <Dropdown id="browsers">
                            <option value="others"/>
                            <option value="Department of English and Foreign language"/>
                            <option value="Department of Hindi"/>
                            <option value="Department of Journalism & Mass Comm"/>
                            <option value="Department of Libray & Information Science"/>
                            <option value="Department of Civil Engineering"/>
                            <option value="Department of Computer Science & Engineering"/>
                            <option value="Department of Electronics & Communication Engineering"/>
                            <option value="Department of Industrial & Production Engineering"/>
                            <option value="Department of Information Technology"/>
                            <option value="Department of Chemical Engineering"/>
                            <option value="Department of Mechanical Engineering"/>
                            <option value="Department of Botany"/>
                            <option value="Department of Zoology"/>
                            <option value="Department of Anthropology & Tribal Development"/>
                            <option value="Department of Economics"/>
                            <option value="Department of History"/>
                            <option value="Department of Political Science & Public Administration"/>
                            <option value="Department of Social Work"/>
                            <option value="Department of Computer Science & Information Technology"/>
                            <option value="Department of Mathematics"/>
                            <option value="Department of Forestry, Wildlife & Environmental Science"/>
                            <option value="Department of Pharmacy"/>
                            <option value="Department of Chemistry"/>
                            <option value="Department of Pure & Applied Physics"/>
                            <option value="Department of Commerce"/>
                            <option value="Department of Management Studies"/>
                            <option value="Department of Law"/>
                            <option value="Department of Education"/>
                            <option value="Department of Physical Education"/>
                            <option value="Department of Biotechnology"/>
                            <option value="Department of Forensic Science"/>
                            <option value="Department of Rural Technology"/>
                            <option value="Department of Electronics"/>
                          </Dropdown>
                          <Labeled className="font15">College/University:</Labeled>
                        <input list="Clg" id="college" name="college" className="font15" value={college} onChange={(e) => handlecollege(e)}/>
                        <datalist id="Clg">
                          <option value = "other"/>
                            <option value="Guru Ghasidas Vishwavidyalaya"/>
                          </datalist>
                        <Wrap className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <Wrapheader>Upload The File</Wrapheader>
                        <Wrapform action="#">
                          <input
                            class="file-input"
                            type="file"
                            name="content"
                            src = {content}
                            multiple
                            onChange={(e) => handlecontent(e)}
                          />
                          <file src = {content}/>
                          <Itag class="fas fa-cloud-upload-alt"></Itag>
                          <Ptag>Browse File to Upload</Ptag>
                          <Ptag>only .pdf, .jpeg, .jpg accepted</Ptag>
                        </Wrapform>
                      </Wrap>
                      </Form>
                    </div>
                    <SumbitWrapper className="flex">
                      
                      <ButtonInput
                        type="submit"
                        value="Submit Content"
                        className="pointer animate radius8"
                        style={{ maxWidth: "160px" }}
                        onclick = {submitContributor}
                      />
                    </SumbitWrapper>
                    <div style={{width:"100%"}}>
                    <p style={{color:"red", fontSize:"10px", textAlign:"center", paddingTop:"1vh"}}>{error}</p>
                    </div>
                  </div>
                  </form>
                </div>
              </div>
            </Wrapper>
          </ModalR>
        </div>
      </PopModal>
    </Overlay>
  );
}

const Dropdown = styled.datalist`
  background-color: white;
  color: black;
`;

const Wrapper = styled.section`
  width: 100%;

`;

const PopModal = styled.div`
  @media(min-width:760px){
    max-width: 550px;
    max-height: 600px;
  }
  @media(max-width:759px){
    max-width: 300px;
    max-height: 500px;
  }


  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  z-index: 1000;
  align-content: center;
  overflow-x: auto;
  overflow-y: auto;
  background-color: white;
  border: 4px black;;
  border-style: double;
  border-radius: 20px;
`;

const ModalClose = styled.div`
  position: fixed;
  top: 30px;
  right: 30px;
  color: black;
  font-weight: bold;
  :hover {
    cursor: pointer;
  }
`;

const ModalR = styled.div`
`;

const Labeled = styled.label`
  font-weight: bold;
  color: #0000a3;
`;
const HeaderInfo = styled.div`
  padding: 30px 0 20px 0;
  text-align: center;
  color: #002366;
`;
const Form = styled.form`
  padding-top: 10px;
  input,
  textarea {
    width: 100%;
    border: 10px;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid #707070;
    height: 40px;
    color: black;
  }
  textarea {
    min-height: 150px;
  }
  @media (max-width: 860px) {
    padding: 20px 0;
  }
`;
const ButtonInput = styled.input`
  margin: auto;
  border: none;
  background: linear-gradient(
    45deg,
    #000075,
    #000075,
    #0000a3,
    #0000d1,
    #0000ff,
    #2e2eff
  );
  animation: steam 20s linear infinite;
  width: 100%;
  padding: 22px;
  outline: none;
  color: #fff;
  :hover {
    transform: translatey(-5px);
    font-size: 16px;
  }
  @media (max-width: 991px) {
    margin: 0 auto;
  }
`;

const SumbitWrapper = styled.div`
  width: 100%;
  margin: auto;
  padding-top: 10px;
`;

const Wrap = styled.div`
  width: 1200px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 25px;
  box-shadow: 7px 7px 5px rgba(0, 0, 0, 0.02);
`;

const Wrapheader = styled.div`
  color: #0000a3;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-top: 10px;
`;

const Wrapform = styled.div`
  height: 180px;
  display: flex;
  cursor: pointer;
  margin: 30px 10px;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  border: 2px dashed #000;

  input[type=file]::file-selector-button {
  border: 1px #0000a3 solid;
  font-family: 'Times New Roman', Times, serif;
  padding: 7px 15px;
  border-radius: 10px;
  color: #0000a3;
  cursor: pointer;
}

input[type=file]::file-selector-button:hover {
  background-color:#0000a3 ;
  color:white;
}
`;

const Itag = styled.i`
  font-size: 50px;
  color: #0000a3;
`;

const Ptag = styled.p`
  margin-top: 20px;
  font-size: 16px;
  color: #0000a3;
`;

const Overlay = styled.div`

`;

export default Modal;
