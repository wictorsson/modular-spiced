import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    font-family: system-ui;
    background-color: #202020;
    color: white;
    
  }
  .environment{
    margin: 20px;
    background-color: #2E2E2E;
    border-radius: 20px;
  }
  main{  
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 6rem;
    min-height: 100vh;}
`;
