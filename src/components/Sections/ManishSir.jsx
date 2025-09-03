import React from 'react';
import styled from 'styled-components';
import img1 from "../../assets/img/Team/ManishSir.jpg";


export default function ManishSir() {
  return (
    <Wrapper>
        <div class="container">
              <div class="card is-horizontal">
                <div class="card-content">
                  <div class="content">
                    <h2>Dr. Manish Shrivastava</h2>
                    <h3>Teacher Coordinator, UDAAN</h3>
                    <p>The life source of UDAAN, we are indebted to Mr Manish Shrivasatava sir, for taking up the role of our teacher coordinator and guiding us throughout our journey of twelve years. Your support encourages us to keep going and improving ourselves with every edition. If it wasn’t for your love of creativity and student welfare, UDAAN would not have been possible.</p>
                  </div>
                </div>
                <div class="card-image">
                  <figure class="image">
                    <img src={img1} alt="Teacher Coordinator"/>
                  </figure>
                </div>
              </div>
            </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`

padding-top:13vh;
padding-bottom:13vh;

.is-horizontal {
  display: flex;
}

.is-horizontal .card-image {
  flex: 2;
}

.card-image{
  margin-left: 5vw;
}

.is-horizontal .card-image .image {
  height: 100%;
  width: 100%;
}

.is-horizontal .card-image .image img {
  height: 100%;
}

img{
  border-radius: 2rem;
}



.is-horizontal .card-content {
  text-align: left;
  padding-top: 6vh;
  border: 2px solid #37D6F4;
  justify-content: center;
  padding: 5vw;
  margin: auto;
  border-radius: 20px;
}

.is-horizontal .card-content h3{
  text-align: left;
  color: #37D6F4;
}

@media (min-width: 768px) {
  .is-horizontal .card-image .image img {
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
  }
}

@media (max-width: 768px) {
  .is-horizontal {
    flex-direction: column-reverse;
  }
  .card-image{
    margin-left: 3vw;
  }
}
`;