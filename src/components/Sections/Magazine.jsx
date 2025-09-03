import React from 'react'
import styled from 'styled-components';
import imgs8 from "../../assets/img/add_udaan_11.jpg";
import imgs7 from "../../assets/img/add_udaan_12.jpg";
import imgs9 from "../../assets/img/add_udaan_13.jpg";
import details from '../../details';
import MagazineCard from '../Elements/MagazineCard';

export default function Magazine(props) {
  return (
    
    <Wrapper >
      <div style={{height:"10vh"}} id = "Magz"></div>
      <div className="whiteBg" >
      <div className="container">
          <HeaderInfo>
            <h1 className="font40 semiBold">Flip through the pages of creativity!</h1>
            {/* <p className="font13 regular">
            Udaan, The Magazine is itself is an institution which prepares its contributors to
            actively participate in whatever is going on around them, which affects there lives.
            Here we try to give artists the confidence as their expression is given rightful exposer
            in our magazines every year.

              <br />
              Lets have a look on the previous year magazines:-
            </p> */}
          </HeaderInfo>
          <Magazines>
          <div id='model1'>
        <div className="divider"></div>
        <div className="members">
          
          <MagazineCard /*link={details[0].link}*/ No="9" img={imgs9}/>
          <MagazineCard link={details[1].link} No="8" img={imgs8}/>
          <MagazineCard link={details[0].link} No="7" img={imgs7}/>

        </div>
        </div>
        </Magazines>    
        </div>
        </div>
    </Wrapper>
  )
}


const Wrapper = styled.section`
  width: 100%;
  font-family: 'Playfair Display', serif;
`;

const HeaderInfo = styled.div`
    text-align: center;
    margin-bottom:30px;
    font-family: 'EB Garamond', serif;
`;
const Magazines = styled.div`
#model1 .description
{
    width: 280px;
    height: 400px;
    position: relative;
    background-color: rgba(8,61,119,0.5);
    transform: translateY(0);
    border-radius: 15px;
    transition: all 1s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#model1 img{
  border-radius: 15px;
}

#model1 .member
{
    cursor: pointer;
    transition: all 1s;
    margin:50px;
}

#model1 .member:hover
{
    transform: scale(1.01);
}

#model1 .member:hover .description
{
    transform: translateY(-100%);
}

#model1 .description h1
{
    color: #fff;
    font-size: 130px;
}


#model1 .description h2
{
    font-family: 'Poppins', sans-serif;
    text-align: center;
    color: #FFFFFF;
    font-weight: 600;
    font-size: 30px;
    margin-top: 0;
}

#model1 .description p
{
    color: #fff;
    text-align: justify;
    padding: 0 15px;
}

#model1 .description .social-media svg
{
    color: #fff;
    font-size: 35px;
    margin-left: 8px;
    cursor: pointer;
    transition: all 0.5s;
}

#model1 .description .social-media svg:hover
{
    transform: scale(1.1);
    color: #F21B3F;
}
#model1 .divider{
  color:blue;
}
`;