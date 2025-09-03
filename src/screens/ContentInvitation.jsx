import React from "react";
import styled from "styled-components";

const ContentInviteSection = styled.section`
  padding: 80px 20px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;

  @media (max-width: 768px) {
    padding: 60px 15px;
    min-height: 40vh;
  }
`;

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  text-align: center;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #272c60;
  margin-bottom: 20px;
  text-align: center;
  font-family: "Arial", "Helvetica", sans-serif;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Divider = styled.div`
  width: 75px;
  height: 4px;
  background-color: #272c60;
  margin: 0 auto 40px auto;
  border-radius: 2px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555555;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-family: "Arial", "Helvetica", sans-serif;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 35px;
    padding: 0 10px;
  }
`;

const SubmitButton = styled.a`
  display: inline-block;
  background-color: #272c60;
  color: white;
  padding: 15px 35px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-family: "Arial", "Helvetica", sans-serif;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(39, 44, 96, 0.2);

  &:hover {
    background-color: #1e2354;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(39, 44, 96, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(39, 44, 96, 0.2);
  }

  @media (max-width: 768px) {
    padding: 12px 28px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 10px 24px;
    font-size: 0.95rem;
    width: 80%;
    text-align: center;
  }
`;

const ContentInvite = () => {
  return (
    <ContentInviteSection>
      <Container>
        <Title>Content Invitation</Title>
        <Divider />
        <Description>
          We invite talented writers, poets, artists, and creative minds to
          contribute to Udaan magazine. Share your stories, insights, and
          artistic expressions with our community. Your voice matters, and we're
          excited to showcase diverse perspectives and creative works.
        </Description>
        <SubmitButton
          href="https://forms.gle/your-form-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Submit Content
        </SubmitButton>
      </Container>
    </ContentInviteSection>
  );
};

export default ContentInvite;
