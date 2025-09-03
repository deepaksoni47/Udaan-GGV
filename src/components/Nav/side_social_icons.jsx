import { Link } from "react-scroll";
import styled from "styled-components";
import Facebook from "../../assets/img/facebook.png";
import Mail from "../../assets/img/mail.png";
import Linkedin from "../../assets/img/linkedin.png";
import Instagram from "../../assets/img/instagram.png";
import Youtube from "../../assets/img/youtube.png";
import pinterest from "../../assets/img/pinterest.png";
import Twitter from "../../assets/img/twitter.png";
export default function SocialIcon() {
  return (
    <div>
      <div>
        <Cwrapper>
          <div>
            <Link className="pointer flexNullCenter" to="home" smooth={true}>
              <Ciconflex>
                <div className="c-info">
                  <Cinfoitem>
                    <a
                      href="udaantheculture@gmail.com"
                    >
                      <Cicon src={Mail} alt="" className="c-icon" onClick={(e) => {e.preventDefault(); window.location='mailto:udaantheculture@gmail.com';}}/>
                    </a>
                  </Cinfoitem>
                </div>
                <div className="c-info">
                  <Cinfoitem>
                    <a 
                      href='Instagram/udaan.ggv'
                    >
                      <Cicon src={Instagram} alt="" className="c-icon" onClick={(e) => {e.preventDefault(); window.open('https://www.instagram.com/udaan.ggv/');}} />
                    </a>
                  </Cinfoitem>
                </div>
                <div className="c-info">
                  <Cinfoitem>
                  <a 
                      href='Facebook/udaan.ggv'                   
                    >
                    <Cicon src={Facebook} alt="" className="c-icon" onClick={(e) => {e.preventDefault(); window.open('https://www.facebook.com/udaan.ggv/');}}/>
                    </a>
                  </Cinfoitem>
                </div>
                <div className="c-info">
                  <Cinfoitem>
                  <a 
                      href='Linkedin/udaan.ggv'
                    >
                    <Cicon src={Linkedin} alt="" className="c-icon" onClick={(e) => {e.preventDefault(); window.open('https://www.linkedin.com/company/udaan.ggv/mycompany/');}} />
                    </a>
                  </Cinfoitem>
                </div>
                
                <div className="c-info">
                  <Cinfoitem>
                  <a 
                      href='pinterest/udaantheculture'
                    >
                    <Cicon src={pinterest} alt="" className="c-icon" onClick={(e) => {e.preventDefault(); window.open('https://in.pinterest.com/udaantheculture/');}} />
                    </a>
                  </Cinfoitem>
                </div>
                
                <div className="c-info">
                  <Cinfoitem>
                  <a 
                      href='youtube/@UdaanGGV'
                    >
                    <Cicon activeClass="active" src={Youtube} alt="" className="c-icon" onClick={(e) => {e.preventDefault(); window.open('https://www.youtube.com/@UdaanGGV');}}/>
                    </a>
                  </Cinfoitem>
                </div>

                <div className="c-info">
                  <Cinfoitem>
                  <a 
                      href='twitter/udaan_ggv'
                    >
                    <Cicon activeClass="active" src={Twitter} alt="" className="c-icon" onClick={(e) => {e.preventDefault(); window.open('https://twitter.com/udaan_ggv', '_blank', 'noreferrer');}}/>
                    </a>
                  </Cinfoitem>
                </div>
              </Ciconflex>
            </Link>
          </div>
        </Cwrapper>
      </div>
    </div>
  );
}


const Cwrapper = styled.div`
  @media(min-width:960px){
    margin-top:200px;
  }
  @media(max-width:960px){
    display:none;
  }
  padding-left: 4px;
  z-index: 10;
  position: fixed;
  border : 2px solid grey;
  border-radius: 100px;
  box-sizing:content-box;
  width:36px;
  height:380px;
  @media(max-width:960px){
    height:380px;
  }
  margin-left: 10px;
`;

const Cinfoitem = styled.div`
  position:sticky;
  display: flex;
  align-items: center;
  :hover{
    transform:scale(1.1) translateX(1px);
  }
  @media(min-width:960px){
    margin: 7px 0px;
  }
  @media(max-width:960px){
    margin: 7px 0px;
  }

`;

const Cicon = styled.img`
  width: 32px;
  height: 30px;
  margin-right: 20px;
  margin-bottom: 15px;
`;


const Ciconflex = styled.div``;
