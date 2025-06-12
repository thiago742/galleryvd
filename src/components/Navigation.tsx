import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
`;

const NavButton = styled.button`
  background: #ff69b4;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  &:hover {
    background: #e754a7;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

interface NavigationProps {
  onNavigate: (page: 'home' | 'gallery') => void;
  currentPage: 'home' | 'gallery';
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate, currentPage }) => {
  return (
    <NavContainer>
      {currentPage === 'gallery' && (
        <NavButton onClick={() => onNavigate('home')}>
          <span>🏠</span> Início
        </NavButton>
      )}
      {currentPage === 'home' && (
        <NavButton onClick={() => onNavigate('gallery')}>
          <span>📸</span> Galeria
        </NavButton>
      )}
    </NavContainer>
  );
};

export default Navigation; 