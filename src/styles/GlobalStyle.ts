import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-size: 16px;
    @media (max-width: 480px) {
      font-size: 14px;
    }
  }

  body {
    font-family: 'Pacifico', cursive;
    background-color: #fff0f5;
    color: #333;
    overflow-x: hidden;
    position: relative;
    width: 100%;
    min-height: 100vh;
    min-height: 100dvh;
  }

  button {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`; 