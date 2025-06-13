import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TimeSection = styled.section`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #fff0f5 0%, #ffe4e1 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
`;

const CounterContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
  width: 90%;
`;

const CounterTitle = styled.h2`
  color: #d63384;
  margin: 0 0 1.5rem 0;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 1rem;
`;

const TimeUnit = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const TimeValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #d63384;
  margin-bottom: 0.5rem;
`;

const TimeLabel = styled.div`
  font-size: 1rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const HeartDecoration = styled.div`
  position: absolute;
  font-size: 2rem;
  color: rgba(214, 51, 132, 0.1);
  pointer-events: none;
  
  &:nth-child(1) { top: 10%; left: 10%; }
  &:nth-child(2) { top: 20%; right: 15%; }
  &:nth-child(3) { bottom: 15%; left: 15%; }
  &:nth-child(4) { bottom: 25%; right: 10%; }
`;

const BackButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  font-size: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #ff69b4;
    color: white;
  }
`;

interface TimeCounterProps {
  onBack: () => void;
}

const TimeCounter: React.FC<TimeCounterProps> = ({ onBack }) => {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const startDate = new Date('2023-10-18T00:00:00');
    
    const updateCounter = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeElapsed({ days, hours, minutes, seconds });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TimeSection>
      <BackButton onClick={onBack}>←</BackButton>
      <HeartDecoration>💕</HeartDecoration>
      <HeartDecoration>💕</HeartDecoration>
      <HeartDecoration>💕</HeartDecoration>
      <HeartDecoration>💕</HeartDecoration>
      
      <CounterContainer>
        <CounterTitle>
          Nosso Tempo Juntos 💕
        </CounterTitle>
        
        <TimeGrid>
          <TimeUnit>
            <TimeValue>{timeElapsed.days}</TimeValue>
            <TimeLabel>Dias</TimeLabel>
          </TimeUnit>
          
          <TimeUnit>
            <TimeValue>{timeElapsed.hours}</TimeValue>
            <TimeLabel>Horas</TimeLabel>
          </TimeUnit>
          
          <TimeUnit>
            <TimeValue>{timeElapsed.minutes}</TimeValue>
            <TimeLabel>Minutos</TimeLabel>
          </TimeUnit>
          
          <TimeUnit>
            <TimeValue>{timeElapsed.seconds}</TimeValue>
            <TimeLabel>Segundos</TimeLabel>
          </TimeUnit>
        </TimeGrid>
      </CounterContainer>
    </TimeSection>
  );
};

export default TimeCounter; 