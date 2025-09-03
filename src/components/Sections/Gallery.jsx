
import styled from 'styled-components';
import PhotoAlbum from "react-photo-album";
import img1 from "../../assets/img/add_udaan_1.jpg";
import img2 from "../../assets/img/add_udaan_2.jpg";
import img3 from "../../assets/img/add_udaan_3.jpg";
import img4 from "../../assets/img/add_udaan_4.jpg";
import img5 from "../../assets/img/add_udaan_5.jpg";
import img6 from "../../assets/img/add_udaan_6.jpg";
import img7 from "../../assets/img/add_udaan_7.jpg";
import img8 from "../../assets/img/add_udaan_8.jpg";
import img9 from "../../assets/img/add_udaan_9.jpg";
import img10 from "../../assets/img/add_udaan_10.jpg";
import img11 from "../../assets/img/Gallery/1.jpg";
import img12 from "../../assets/img/Gallery/2.jpg";
import img13 from "../../assets/img/Gallery/2.png";
import img14 from "../../assets/img/Gallery/3.jpg";
import img15 from "../../assets/img/Gallery/14.jpg";
import img16 from "../../assets/img/Gallery/Img5.jpg";
import carousel1 from "../../assets/img/Gallery/Img1.jpg";
import carousel2 from "../../assets/img/Gallery/Img12.jpg";
import carousel3 from "../../assets/img/Gallery/Img3.jpg";
import carousel4 from "../../assets/img/Gallery/Img4.jpg";
import carousel5 from "../../assets/img/Gallery/Img5.jpg";
import carousel6 from "../../assets/img/Gallery/Img11.jpg";
import carousel7 from "../../assets/img/Gallery/Img7.jpg";
import carousel8 from "../../assets/img/Gallery/Img13.jpg";
import carousel9 from "../../assets/img/Gallery/Img14.jpg";
import carousel10 from "../../assets/img/Gallery/Img15.jpg";
import { Carousel } from 'react-carousel-minimal';
import React from "react";


const photos = [
    { src: img1, width: 800, height: 900, },
    { src: img2, width: 2500, height: 2000 },
    { src: img3, width: 1600, height: 2000 },
    { src: img4, width: 2000, height: 2500 },
    { src: img6, width: 1000, height: 900 },
    { src: img7, width: 900, height: 900 },
    { src: img8, width: 1600, height: 1900 },
    { src: img9, width: 600, height: 900 },
    { src: img10, width: 600, height: 700 },
    { src: img1, width: 1600, height: 900 },
    { src: img5, width: 1600, height: 2200 },


];



export default function Gallery() {

    const data = [
      {
        image: carousel3,
        caption: ""
      },
      {
        image: carousel10,
        caption: ""
      },
      {
        image: carousel7,
        caption: ""
      },
        {
          image: carousel1,
          caption: `<div>
                    </div>`
        },
        {
          image: carousel2,
          caption: ""
        },
        {
          image: carousel4,
          caption: ""
        },
        {
          image: carousel6,
          caption: ""
        },
        {
          image: carousel8,
          caption: ""
        },
        {
          image: carousel9,
          caption: ""
        },
        {
          image: carousel5,
          caption: ""
        },
      ];
    
      const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
      }
      const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
      }
    
  return (
    <Wrapper>
      <div style={{height:"8vh"}} id="photo"></div>
        <div style={{ textAlign: "center" }}>
        <h1>Let's have a Look</h1>
        <div>
          <Carousel
            data={data}
            time={3000}
            width="1050px"
            height="500px"
            captionStyle={captionStyle}
            radius="10px"
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={true}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              maxWidth: "850px",
              maxHeight: "500px",
              margin: "40px auto",
            }}
          />
        </div>
      </div> 
      <br/><br/><br/><br/><br/><br/><br/>
      {/* <PhotoAlbum layout="masonry" photos={photos} /> */}
      <section class = "photo gallary">
    <div class="container">
      <div class="heading">
        <h3>Photo <span>Gallery</span></h3>
      </div>
      <div class="box">
        
        <div class="dream">
          <img class="team-img" src={img1} alt=""/>
           <img class="team-img" src={img2} alt=""/>
            <img class="team-img" src={img3} alt=""/>
             <img class="team-img" src={img4} alt=""/>
             <img class="team-img" src={img16} alt=""/>
              
        </div>
  
          <div class="dream">
          <img class="team-img" src={img6} alt=""/>
           <img class="team-img" src={img7} alt=""/>
            <img class="team-img" src={img8} alt=""/>
             <img class="team-img" src={img9} alt=""/>
              <img class="team-img" src={img10} alt=""/>
              
        </div>
  
          <div class="dream">
          <img class="team-img" src={img11} alt=""/>
           <img class="team-img" src={img12} alt=""/>
            <img class="team-img" src={img13} alt=""/>
             <img class="team-img" src={img14} alt=""/>
              <img class="team-img" src={img15} alt=""/>
              <img class="team-img" src={img5} alt=""/>
        </div>
  
  
  
  
      </div>  
  
    </div>
  </section>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 8vw;
  width: 100%;
  min-height: 100vh;

  .container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 40px 20px 0 20px;
}

.container .heading{
  width: 50%;
  padding-bottom: 50px;
}
.container .heading h3{
  font-size: 3em;
  font-weight: bolder;
  padding-bottom: 10px;
  border-bottom: 3px solid #222;
}

.container .heading h3 span{
  font-weight: 100;
}
.container .box{
 display: flex;
 flex-direction: row;
 justify-content: space-between;
}

.container .box .dream{
  display: flex;
  flex-direction: column;
  width: 32.5%;
}

.container .box .dream img{
  width: 100%;
  padding-bottom: 5px;
  border-radius: 30px;
}

img:hover {
  transform: scale(1.02); 

}


.container .btn{
  margin: 40px 0 70px 0;
  background: #222;
  padding: 15px 40px ;
  border-radius: 5px;
}

.container .btn a{
 color: #fff;
 font-size: 1.2em;
 text-decoration: none;
 font-weight: bolder;
 letter-spacing: 3px;
}

@media only screen and (max-width: 769px){
    .container .box{
   flex-direction: column;
  }

.container .box .dream{
  width: 100%;
}





}

@media only screen and (max-width: 643px){
.container .heading{
  width: 100%;
}
.container .heading h3{
  font-size: 1em;

}}
`;