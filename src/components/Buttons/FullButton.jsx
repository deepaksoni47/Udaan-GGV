import React from "react";
import styled from "styled-components";

export default function FullButton({ title, action, mode }) {
  return (
    <Wrapper
      className="animate pointer radius8"
      onClick={action ? () => action() : null}
      mode={mode}
    >
      {title}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  border: none;
  width: 80%;
  padding: 15px;
  outline: none;
  font-weight: bold;
  background-color: ${(props) => (props.mode === "dark" ? "#fff" : "#37D6F4")};
  color: ${(props) => (props.mode === "dark" ? "#000" : "#fff")};
  @media(max-width:860px){
    margin-bottom: 15px;
    width:100%;
  }
  header+main+footer
  :hover {
    transform: translateY(-5px);
  }
`;

