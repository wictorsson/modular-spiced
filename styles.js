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
    // min-height: 100vh;}

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


  // REACT FLOW
  .touchdevice-flow .react-flow__handle {
    width: 15px;
    height: 15px;
    border-radius: 8px;
    border-color: cyan;
    background-color: #2F4F4F;
  }
  
  .touchdevice-flow .react-flow__handle.connecting {
    width: 15px;
    height: 15px;
    border-radius: 8px;
    border-color: cyan;
    background-color: #2F4F4F;
     animation: bounce 500ms infinite;
  }
  
  @keyframes bounce {
    0% {
      transform:  scale(1);
    }
    100% {
      transform: scale(1.5);
    }
  }

  .nodeContainer{
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    justify-content: space-between;
    font-size: 10px;
    background-color: white;
    border-style: solid;
    border-color: grey;
    border-radius: 10px;
  }

  .nodeContainer input[type=range] {
    width: 70%; 
    margin: 0 auto;
  }

  .nodeContainerGain{
    display: flex;
    flex-direction: column;
    padding 5px;
    
    //height: 150px;
    align-items: center;
    font-size: 10px;
    background-color: white;
    border-style: solid;
    border-color: grey;
    border-radius: 10px;

  }


  .nodeContainerGain input[type=range] {
   // transform: rotate(-90deg);
    // height: 70%; /* adjust height to fit the container */
    // width: 30px; /* adjust width to make it narrower */
  }

  .waveformContainer{
    display: flex;
    margin:10px;
    flex-direction: space-between;
    gap: 10px;
    font-size: 8px;
  }

  .react-flow__handle-top{
    top: auto;
    left: 45%;
    top: -8px;
    transform: translate(0, 0);
  }
  .react-flow__handle-bottom{
    top: auto;
    left: 45%;
    bottom: -8px;
    transform: translate(0, 0);

  }


`;
