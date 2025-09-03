import React from "react";
import { Helmet } from "react-helmet";
import {Routes,Route} from 'react-router-dom';
// Screens
import Landing from "./screens/Landing.jsx";
import Teamlanding from "./screens/TeamLanding.jsx";
import MagazineLanding from "./screens/MagazineLanding.jsx";
import GalleryLanding from "./screens/GalleryLanding.jsx";
import "./App.css";
import TopNavbar from "./components/Nav/TopNavbar.jsx";


export default function App() {
  return (
    <div className="App">
    <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant:wght@700&display=swap" rel="stylesheet"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@700&family=Courgette&family=Exo+2:wght@500&family=Fredericka+the+Great&family=Lora:wght@500&family=Merriweather&family=Playfair+Display+SC:wght@700&family=Playfair+Display:wght@800&family=Poppins&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Alegreya:wght@500&family=Barlow+Condensed:wght@500&family=EB+Garamond:wght@400;500&family=Great+Vibes&family=Josefin+Slab:wght@600&family=Montserrat&family=Oswald&family=Playfair+Display+SC&family=Playfair+Display:wght@800&family=Trirong:wght@600&display=swap" rel="stylesheet"/>

        </Helmet>
    <TopNavbar/>
    <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/gallery" element={<GalleryLanding />}></Route>
        <Route path="/team" element={<Teamlanding />}></Route>
        <Route path="/magazines" element={<MagazineLanding />}></Route>
        <Route path="*" element={<Landing />}></Route>
    </Routes>
  </div>
  );
}

