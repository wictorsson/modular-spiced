import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .body {
   // font-family: system-ui;
    background-color: #202020;
    color: white;
    
  }
  .environment{
    margin: 20px;
    background-color: #2E2E2E;
    border-radius: 20px;
  }

  .welcome-screen{

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 6rem;
    min-height: 100vh;}

  }

  .button {
    color: black;
    text-transform: uppercase;
    text-decoration: none;
    background: white;
   
    padding: 30px;
    border-radius: 5px;
    display: inline-block;
    border: none;
    transition: all 0.4s ease 0s;
    }

    .button:hover {
    background: #434343;
    letter-spacing: 1px;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
    color: white;
    transition: all 0.4s ease 0s;
    }

    .header{
      margin: 50px;
    }

  // main{  
    
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: space-between;
  //   align-items: center;
  //   padding: 6rem;
  //   min-height: 100vh;}
`;
