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

    background: rgb(41,35,26);
    background: radial-gradient(circle, rgba(41,35,26,1) 0%, rgba(17,17,17,1) 83%);
    color: white;
    
  }
  

  // .welcome-screen{

  //   display: flex;
  //   flex-direction: column;
  //   justify-content: space-between;
  //   align-items: center;
  //   padding: 6rem;
  //   // min-height: 100vh;}

  // }

  // .button {
  //   color: black;
  //   text-transform: uppercase;
  //   text-decoration: none;
  //   background: white;
   
  //   padding: 30px;
  //   border-radius: 5px;
  //   display: inline-block;
  //   border: none;
  //   transition: all 0.4s ease 0s;
  //   }

  //   .button:hover {
  //   background: #434343;
  //   letter-spacing: 1px;
  //   -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
  //   -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
  //   box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
  //   color: white;
  //   transition: all 0.4s ease 0s;
  //   }

  //   .header{
  //     margin: 50px;
  //   }



  //***************** REACT FLOW **********************

  .environment{
    margin: 20px;
    background-color: #181818;
    border-radius: 10px;
    border-style: solid;
    border-color: #46494c;
    border-width: 1px;
    box-shadow: 0 0 10px 0 #333;
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
    padding: 15px;
    gap: 5px;
    align-items: center;
    justify-content: space-between;
    font-size: 10px;
    background: rgb(70,41,41);
   // background: radial-gradient(circle, rgba(55,41,41,1) 0%, rgba(20,20,20,1) 100%);
    background: radial-gradient(rgba(55,41,41,1) 0%, rgba(20,20,20,1) 100%);
    box-shadow: 0 0 5px 0 #444;
    border-style: solid;
    border-color: grey;
    border-radius: 5px;
    border-width: 1px;
    color:white;
  }


  // .nodeContainerGain{
  //   display: flex;
  //   flex-direction: column;
  //   gap: 5px;
  //   padding: 15px;
  //   align-items: center;
  //   justify-content: space-between;
  //   font-size: 10px;
  //   background: rgb(70,41,41);
  //   background: radial-gradient(circle, rgba(55,41,41,1) 0%, rgba(20,20,20,1) 100%);
  //   border-style: solid;
  //   border-color: grey;
  //   border-radius: 5px;
  //   border-width: 1px;
  //   color:white;
  // }


  .waveformContainer{
    display: flex;
    margin:10px;
    flex-direction: space-between;
    gap: 10px;
    font-size: 8px;
  }

  .touchdevice-flow .react-flow__handle {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    //border-color: cyan;
    background-color: #202020;
  }
  
  .touchdevice-flow .react-flow__handle.connecting {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    //border-color: cyan;
    background-color: #212121;
     animation: bounce 500ms infinite;
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
    border-color: cyan;

  }

  .flowPanel{
    display: flex;
    margin:10px;
   
    flex-direction: column;
    gap: 10px;
    background-color: rgba(18, 18, 18, 0.5);
    // border-style: solid;
    // border-color: grey;
    border-radius: 5px;
    color:white;
    padding 8px;
  }

  .flowPanel button {
    background: rgb(70,41,41);
    background: radial-gradient(circle, rgba(65,41,41,1) 0%, rgba(10,10,10,1) 100%);
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
   

    // ******************* slider
    input[type="range"] {
      -webkit-appearance: none;
      margin: 10px;
     // width: 200px;
      height: 3px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 5px;
      background-image: linear-gradient(#ff4500, #ff4500);
      background-size: 70% 100%;
      //background-repeat: no-repeat;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 12px;
      width: 12px;
      border-radius: 30%;
      background: white;
      cursor: ew-resize;
      box-shadow: 0 0 2px 0 #555;
      transition: background .3s ease-in-out;
    }

    input[type=range]::-webkit-slider-runnable-track  {
      -webkit-appearance: none;
      box-shadow: none;
      border: none;
      background: transparent;
    }
    
`;
