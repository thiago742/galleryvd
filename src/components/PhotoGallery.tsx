import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TimeCounter from './TimeCounter';

interface Photo {
  id: number;
  src: string;
  category: string;
  description?: string;
}

interface Category {
  id: string;
  name: string;
  emoji: string;
}

const categories: Category[] = [
  { id: 'arrumadinhos', name: 'Arrumadinhos', emoji: '👔' },
  { id: 'momentinhos', name: 'Momentinhos', emoji: '💕' },
  { id: 'pijaminhas', name: 'Pijaminhas', emoji: '🛏️' },
  { id: 'comidinhas', name: 'Comidinhas', emoji: '🍽️' },
];

// Função para gerar o array de fotos baseado nas categorias
const generatePhotos = (): Photo[] => {
  const photos: Photo[] = [];
  let id = 1;

  // Quantidade de fotos por categoria
  const photoCounts: { [key: string]: number } = {
    'arrumadinhos': 17,
    'momentinhos': 21,
    'pijaminhas': 15,
    'comidinhas': 23
  };

  categories.forEach(category => {
    // Descrições específicas para cada categoria
    const descriptions: { [key: string]: string } = {
      'arrumadinhos': 'Nosso momento especial',
      'momentinhos': 'Um momento único',
      'pijaminhas': 'Nossa noite especial',
      'comidinhas': 'Nossa refeição juntos'
    };

    // Adiciona as fotos da categoria
    for (let i = 1; i <= photoCounts[category.id]; i++) {
      photos.push({
        id: id++,
        src: `/images/${category.id}/${i}.jpg`,
        category: category.id,
        description: descriptions[category.id]
      });
    }
  });

  console.log('Fotos geradas:', photos);
  return photos;
};

const photos = generatePhotos();

const Container = styled.div`
  padding: 0;
  max-width: 100%;
  margin: 0;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  position: relative;
  background: #D25D5F;
`;

const MenuButton = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
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
`;

const MenuOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 900;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
`;

const CategoryButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? '#ff69b4' : 'rgba(255, 255, 255, 0.9)'};
  color: ${props => props.active ? '#fff' : '#333'};
  border: 2px solid #ff69b4;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.2rem;
  width: 100%;
  max-width: 300px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  &:hover {
    background: ${props => props.active ? '#ff69b4' : '#fff0f5'};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const CarouselTrack = styled.div<{ translateX: number }>`
  display: flex;
  height: 100%;
  transform: translateX(${props => props.translateX}px);
  transition: transform 0.3s ease-out;
`;

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
`;

const PhotoDescription = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem;
  font-size: 1.1rem;
  border-radius: 10px;
  text-align: center;
  backdrop-filter: blur(5px);
`;

const CategoryTitle = styled.h2`
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  color: #d63384;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  font-size: 1.5rem;

  &:hover {
    background: #ff69b4;
    color: white;
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  &.prev {
    left: 1rem;
  }

  &.next {
    right: 1rem;
  }
`;

const NavigationDots = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: none;
  justify-content: center;
  gap: 0.8rem;
  z-index: 100;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Dot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.active ? '#ff69b4' : '#ddd'};
  transition: all 0.3s ease;
`;

interface PhotoGalleryProps {
  menuInitiallyOpen?: boolean;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ menuInitiallyOpen = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('arrumadinhos');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(menuInitiallyOpen);
  const [showTimeCounter, setShowTimeCounter] = useState(false);
  const filteredPhotos = photos.filter(photo => photo.category === selectedCategory);
  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < filteredPhotos.length - 1 ? prev + 1 : prev));
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentIndex(0);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    setCurrentIndex(0);
    setIsMenuOpen(menuInitiallyOpen);
  }, [selectedCategory, menuInitiallyOpen]);

  return (
    <>
      {showTimeCounter ? (
        <TimeCounter onBack={() => setShowTimeCounter(false)} />
      ) : (
        <Container>
          <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </MenuButton>

          <MenuOverlay isOpen={isMenuOpen}>
            {categories.map(category => (
              <CategoryButton
                key={category.id}
                active={selectedCategory === category.id}
                onClick={() => handleCategorySelect(category.id)}
              >
                <span>{category.emoji}</span>
                {category.name}
              </CategoryButton>
            ))}
            <CategoryButton
              active={showTimeCounter}
              onClick={() => setShowTimeCounter(true)}
            >
              <span>⏰</span>
              Nosso Tempo
            </CategoryButton>
          </MenuOverlay>

          {currentCategory && (
            <>
              <CategoryTitle>
                <span>{currentCategory.emoji}</span>
                {currentCategory.name}
              </CategoryTitle>
              <NavigationDots>
                {filteredPhotos.map((_, index) => (
                  <Dot key={index} active={index === currentIndex} />
                ))}
              </NavigationDots>
            </>
          )}

          <CarouselContainer>
            <CarouselTrack translateX={-currentIndex * window.innerWidth}>
              {filteredPhotos.map((photo, index) => (
                <Slide key={photo.id}>
                  <Photo 
                    src={photo.src} 
                    alt={photo.description}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </Slide>
              ))}
            </CarouselTrack>

            {currentIndex > 0 && (
              <NavigationButton className="prev" onClick={handlePrev}>
                ←
              </NavigationButton>
            )}
            
            {currentIndex < filteredPhotos.length - 1 && (
              <NavigationButton className="next" onClick={handleNext}>
                →
              </NavigationButton>
            )}
          </CarouselContainer>
        </Container>
      )}
    </>
  );
};

export default PhotoGallery; 