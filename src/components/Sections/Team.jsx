import React from 'react'
import styled from 'styled-components'

export default function Model4(props) {
  return (
    <Wrapper>
    <div class="main">
      <div class="item" id="teamnav">
        <h1 class="main-title">{props.board}</h1>
      </div>
      <div class="item right-section">
        <h2 class="secondary-title">Who we are</h2>
        <p class="description">{props.boardContent}</p>
      </div>
    </div>
    <div class="team-members">

      <div class="team member-1">
        <img id="img-1" src={props.M1} alt=""/>
        <span class="position">{props.head}</span>
        <p class="name">{props.headName}</p>
      </div>

      <div class="team member-2">
        <img id="img-2" src={props.M2} alt=""/>
        <span class="position">{props.member}</span>
        <p class="name">{props.member1Name}</p>
      </div>

      <div class="team member-3">
      <img id="img-2" src={props.M3} alt=""/>
        <span class="position">{props.member}</span>
        <p class="name">{props.member2Name}</p>
      </div>

      <div class="team member-4">
      <img id="img-2" src={props.M4} alt=""/>
        <span class="position">{props.member}</span>
        <p class="name">{props.member3Name}</p>
      </div>

      <div class="team member-5">
      <img id="img-2" src={props.M5} alt=""/>
        <span class="position">{props.member}</span>
        <p class="name">{props.member4Name}</p>
      </div>

      <div class="team member-6">
      <img id="img-2" src={props.M6} alt=""/>
        <span class="position">{props.member}</span>
        <p class="name">{props.member5Name}</p>
      </div>

      <div class="team member-7">
      <img id="img-2" src={props.M7} alt=""/>
        <span class="position">{props.member}</span>
        <p class="name">{props.member6Name}</p>
      </div>

      <div class="team member-8">
      <img id="img-2" src={props.M8} alt=""/>
        <span class="position">{props.member}</span>
        <p class="name">{props.member7Name}</p>
      </div>

      <div class="team member-9">
      <img id="img-2" src={props.M9} alt=""/>
        <span class="position">{props.member}</span>
        <p class="name">{props.member8Name}</p>
      </div>
    </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
.main{
    width: 980px;
    max-width: 70%;
    margin: 100px auto;
    display:flex;
    gap: 5px;
   
}  
  
.item{
    
    flex-basis: 50%;
}

.right-section{
    padding-left: 30px;
    padding-right: 50px;
}
.team-members{
    max-width:70%;
    width: 980px;
    margin:0 auto;
    display:flex;
    flex-wrap: wrap;
    JUSTIFY-CONTENT:SPACE-BETWEEN;
    gap: 50px;
}

.team{
       
    flex-grow: 1;
    
}
.member-1{
    margin-bottom:95px;
}
.member-2{
    margin-top: 95px;
}
.member-3{
    margin-bottom:95px;
}
.member-4{
    margin-bottom:95px;
}
.member-5{
    margin-top:95px;
}
.member-6{
    margin-bottom: 95px;
}
.member-7{
    margin-bottom: 95px;
}
.member-8{
    margin-top: 95px;
}
.member-9{
    margin-bottom: 95px;
}

.main-title{
    font-family: 'PT Serif', serif;
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
    letter-spacing: -0.045em;
    margin-top: 12px;
}

.secondary-title{
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    text-transform: uppercase;
}

.description{
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 27px;
}

img{
    width: 250px;
    max-width: 100%;  
}

.name{
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
}

.position{
    font-family: 'PT Serif', serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;
    vertical-align: top;
    writing-mode: vertical-rl;
}

.footer-text{
    margin-top: 10%;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #4f4f4fa8;
}

.username{
    font-weight:bold;
}
  
  @media screen and (min-width : 300px) and (max-width : 600px) {
    .main{
        margin-top: 80px;
        margin-bottom:50px;
        max-width:100%;
        display: block;
    }
    .main-title{
        padding-left: 4%;
        margin-bottom: 40px;
    }
    .right-section{
        padding-left: 4%;
    }
    .description{
        font-size:16px;
    }
    img{
        width: 80%;
    }
    .name{
        font-size:12px;
        margin:0;
    }
    .position{
        font-size:10px;
    }
    .team-members{
        gap:unset;
        max-width:98%;
        padding: 5%
    }
    .team{
        flex-basis:50%;
    }
    .member-1{
        margin-bottom:0px;
        padding-right:3%;
    }
    .member-2{
        margin-top: 55px;
        padding-left:3%;
    }
    .member-3{
        margin-bottom:0px;
        padding-right:3%;
    }
    .member-4{
        margin-top:55px;
        margin-bottom:0;
        padding-left:3%;
    }
    .member-5{
        margin-top:0px;
        padding-right:3%;
    }
    .member-6{
        margin-top: 55px;
        padding-left:3%;
    }
    .footer-text{
        font-size:12px;
        margin-top: 100px;
    }
  }

  @media screen and (min-width : 600px) and (max-width : 1024px) {
    .main{
        margin-top: 80px;
        margin-bottom:50px;
        max-width:90%;
        display: block;
    }
    .main-title{
        padding-left: 4%;
        margin-bottom: 40px;
    }
    .right-section{
        padding-left: 4%;
        max-width: 90%;
    }
    .name{
        font-size:14px;
        margin:0;
    }
    .position{
        font-size:12px;
    }
    img{
        width:70%;
    }
    .team-members{
        gap:unset;
        max-width:98%;
        padding: 7%
    }
    .team{
        flex-basis:50%;
    }
    .member-1{
        margin-bottom:0px;
        padding-right:4%;
    }
    .member-2{
        margin-top: 75px;
        padding-left:4%;
    }
    .member-3{
        margin-bottom:0px;
        padding-right:4%;
    }
    .member-4{
        margin-top:75px;
        margin-bottom:0;
        padding-left:4%;
    }
    .member-5{
        margin-top:0px;
        padding-right:4%;
    }
    .member-6{
        margin-top: 75px;
        padding-left:4%;
    }
    .footer-text{
        font-size:12px;
        margin-top: 100px;
    }
  }

  @media screen and (min-width : 1026px) and (max-width : 1350px){
    .main{
        margin-top: 80px;
        margin-bottom:50px;
        max-width:80%;
        }
    .main-title{
        padding-left: 4%;
        margin-bottom: 40px;
    }
    .right-section{
        padding-left: 4%;
    }
    .name{
        font-size:14px;
        margin:0;
    }
    .position{
        font-size:12px;
    }
    img{
        width:80%;
    }
    .team-members{
        gap:unset;
        max-width:98%;
        padding: 3%;
    }
    .team{
        flex-basis: 33.333%;
    }
  }`;
