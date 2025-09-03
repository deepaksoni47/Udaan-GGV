import styled from "styled-components";
import React,{useEffect} from "react";
import {motion, useAnimation} from 'framer-motion';
import {useInView} from 'react-intersection-observer';
const WaveLine = () => {
  const {ref, inView} = useInView();

  const animation = useAnimation();

  useEffect(() => {
    if(inView){
      animation.start({
        strokeOpacity:0.4, pathLength:1, pathOffset:0,
        transition:{ duration:2.5 , y:20}
      })
    }
    if(!inView){
      animation.start({
        strokeOpacity:0, pathLength:0, pathOffset:1,
      })
    }
  });
  return (
    <LineAnim ref = {ref}>
    <svg
      viewBox="0 0 1440 363"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M1440 27.4774C1352.73 19.8184 1122.41 49.0556 899.331 227.276C620.48 450.052 354.282 355.647 170.328 185.318C23.165 49.0556 -4.21721 8.32998 0.487081 5"
        stroke="#4a3dba"
        strokeOpacity="0"
        strokeWidth="10"
        animate={animation}
        // initial = {{strokeOpacity:0, pathLength:0, pathOffset:1}}
        // animate={{strokeOpacity:1, pathLength:1, pathOffset:0}}
        // transition={{duration:2, }}
      />
    </svg>
    </LineAnim>
  );
};

const LineAnim = styled.div`
  position: sticky;
  top:0;
  left:0;
  z-index:0;
`;
export default WaveLine;
