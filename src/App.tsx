import React, { useState } from 'react';
import Home from './components/Home';
import PhotoGallery from './components/PhotoGallery';
import { GlobalStyle } from './styles/GlobalStyle';

function App() {
  const [started, setStarted] = useState(false);
  const [menuInitiallyOpen, setMenuInitiallyOpen] = useState(false);

  return (
    <>
      <GlobalStyle />
      {!started ? (
        <Home onStart={() => setStarted(true)} />
      ) : (
        <PhotoGallery menuInitiallyOpen={menuInitiallyOpen} />
      )}
    </>
  );
}

export default App;
