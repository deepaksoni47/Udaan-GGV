import React from "react";


function MagazineCard(props) {
  return (
    <a href={props.link} target="_blank">
    <div className="member"
          > 
            <img width={280} height={400} src={props.img} alt=""/>
             
            <div className="description" >
                <h2>Season</h2>
                <h1>{props.No}</h1>
            </div>
          </div>

     </a>
  );
}


export default MagazineCard;