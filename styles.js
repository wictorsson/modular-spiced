import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    font-family: "Helvetica Neue", "Arial", sans-serif;

  }


  .testDiv{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 6rem;
  }
  body {

    background: rgb(20,23,27);
background: radial-gradient(circle, rgba(20,23,27,1) 35%, rgba(42,42,42,1) 100%);
    color: white;
    
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



  //***************** REACT FLOW **********************

  .environment{
    margin: 20px;
    background-color: #202020;
    border-radius: 12px;
    border-style: solid;
    border-color: #46494c;
    border-width: 1px;
  }

  .touchdevice-flow .react-flow__handle {
    width: 15px;
    height: 15px;
    border-radius: 8px;
    border-color: cyan;
    background-color: #202020;
  }
  
  .touchdevice-flow .react-flow__handle.connecting {
    width: 15px;
    height: 15px;
    border-radius: 8px;
    border-color: cyan;
    background-color: #212121;
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
    background: rgb(47,47,47);
    background: radial-gradient(circle, rgba(47,47,47,1) 38%, rgba(41,41,41,1) 100%);
    border-style: solid;
    border-color: grey;
    border-radius: 5px;
    border-width: 1px;
    color:white;
  }

  .nodeContainer input[type=range] {
    width: 70%; 
    margin: 0 auto;
  }

  .nodeContainerGain{
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 5px;
    align-items: center;
    justify-content: space-between;
    font-size: 10px;
    background: rgb(47,47,47);
    background: radial-gradient(circle, rgba(47,47,47,1) 38%, rgba(41,41,41,1) 100%);
    border-style: solid;
    border-color: grey;
    border-radius: 5px;
    border-width: 1px;
    color:white;
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

  .flowPanel{
    display: flex;
    margin:10px;
   
    flex-direction: column;
    gap: 10px;
    background-color: #333533;
    // border-style: solid;
    // border-color: grey;
     border-radius: 5px;
    color:white;
    padding 8px;
  }

  .flowPanel button {
    background-color: #46494c; 
    color: white; 
    border-style: solid;
    padding: 8px 10px; /* Add padding to the button */
    text-align: center; /* Center the text */
    border-width: 1px;
    //display: inline-block; /* Make the button inline */
    font-size: 12px; /* Change the font size */
    border-radius: 5px; /* Add border radius */
  }
  .flowPanel button:hover {
    background: #202020;
   //letter-spacing: 1px;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
    color: white;
    transition: all 0.4s ease 0s;
    }


`;
