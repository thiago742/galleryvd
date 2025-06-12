import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  min-height: 100dvh; /* Para dispositivos móveis modernos */
  background: linear-gradient(135deg, #ffe0ec, #fff0f5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  width: 100%;
  overflow-x: hidden;
`;

const Title = styled.h1`
  font-size: clamp(1.5rem, 5vw, 2rem);
  color: #d63384;
  margin-bottom: 1.5rem;
  font-family: 'Cursive', sans-serif;
  padding: 0 1rem;
  line-height: 1.4;
`;

const Heart = styled.span`
  font-size: clamp(2.5rem, 8vw, 3rem);
  margin-bottom: 1rem;
`;

const StartButton = styled.button`
  background-color: #ff69b4;
  color: white;
  border: none;
  padding: clamp(0.8rem, 3vw, 1.2rem) clamp(1.5rem, 5vw, 2.4rem);
  border-radius: 30px;
  font-size: clamp(1rem, 4vw, 1.1rem);
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.3s ease;
  width: min(90%, 300px);
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover, &:active {
    background-color: #e754a7;
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
`;

const Home: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <Container>
      <Heart>💌</Heart>
      <Title>
        Oi amor, fiz esse presente com muito carinho só pra você!
      </Title>
      <StartButton onClick={onStart}>Abrir nosso momento</StartButton>
    </Container>
  );
};

export default Home;
