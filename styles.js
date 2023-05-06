import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    font-family: "proxima-nova", "Arial", sans-serif;
  
  }


  .testDiv{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 6rem;
  }


.Header{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 130px;
  padding: 1rem;
  position: fixed;
  color: grey;
 
  width: 100%;
  text-align: center;
  z-index: 1;
  background-color: #181818;
  background: radial-gradient(
    circle,
    rgba(34, 30, 26, 1) 0%,
    rgba(19, 19, 19, 1) 83%
  );
  border-style: solid;
  border-color: #46494c;
  border-width: 1px;
  top: 0px;
  
}



// .Login{
//   // justify-content: center;
//   // align-items: center;
// }




.Footer{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: fixed;
  color: grey;
  gap: 10px;
  width: 100%;
  text-align: center;
  z-index: 1;
  background-color: #181818;
  background: radial-gradient(
    circle,
    rgba(34, 30, 26, 1) 0%,
    rgba(19, 19, 19, 1) 83%
  );
  border-style: solid;
  border-color: #46494c;
  border-width: 1px;
  bottom: 0px;
}
  body {
   // background: rgb(109, 109, 109);
      // background: rgb(41, 35, 26);
      // background: rgba(19, 19, 19, 1);
      background: rgb(31,31,31);
     // background: radial-gradient(circle, rgba(40, 35, 26, 1) 0%, rgba(19, 19, 19, 1) 83%);
      margin: 0; /* Add this line */
      color:white;
  }

  .main {
    background: rgb(41,35,26);
    background: radial-gradient(circle, rgba(41,35,26,1) 0%, rgba(17,17,17,1) 83%);
  }

  .PatchList {
    background: rgb(41,35,26);
    background: radial-gradient(circle, rgba(51,55,56,1) 0%, rgba(17,17,17,1) 83%);
    height: 80%;
    color: white;
    display: flex;
    justify-content: center;
    padding: 1rem;
    margin-left: 0px;
    text-align: center;
    border-style: solid;
    border-color: #46494c;
    border-width: 1px;
    border-radius: 10px;
    position: fixed;

    gap: 120px;
    top: 85px;
    left: 25%;
    right: 25%;
    z-index: 9999;
    max-height: calc(80vh - 150px); /* set max height to 100% of viewport height minus 200px */
    overflow-y: scroll; /* add vertical scrollbar */
    opacity: 0.9;
  }

  .PatchList ul{
    list-style: none;
  
  }

  .CloseButton{
    position: absolute; 
    left: 15px;
    top: 15px;
  }
  
//  .SaveSection{
//   display: flex;
//   justify-content: space-between;

//  }
  
 .SaveForm{
  display: flex;
  flex-direction: column;

  gap: 25px;
  justify-content: center;

 }

 .Form-Radiobuttons{
  display: flex;
  flex-direction: column;
 }

 .Textbox{
  border-radius: 8px;
  background: rgb(41,35,26);
  padding: 0.8rem;
 }
 
 .SaveAsPopup {
  background: rgb(41,35,26);
  background: radial-gradient(circle, rgba(51,55,56,1) 0%, rgba(17,17,17,1) 83%);
  height: 10%;
  color: white;
  display: flex;
  flex-direction: column;
 
  text-align: left;
  justify-content: center;
  border-style: solid;
  border-color: #46494c;
  border-width: 1px;
  border-radius: 10px;
  position: fixed;
  padding: 10%;
  gap: 20px;
  top: 85px;
  left: 35%;
  right: 35%;
  opacity: 0.9;
  z-index: 1;
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

  .environment {
    z-index: 0;
    margin: 20px;
    // margin-top: 4rem;
    background-color: #181818;
    border-radius: 5px;
    border-style: solid;
    border-color: #46494c;
    border-width: 1px;
    box-shadow: 0 0 10px 0 #333;
    position: relative; 
    top: 80px; 
  }
  


  
  @keyframes bounce {
    0% {
      transform:  scale(1);
    }
    100% {
      transform: scale(1.5);
    }
  }
  //***************** CONTAINERS *********************
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

  .react-flow__handle-right{
    //top: auto;
    top: 50%;
    left: 95%;
    //bottom: 12px;
   
    transform: translate(0, 0);
    border-color: cyan;

  }

  button {
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
  button:hover {
    background: #202020;
   //letter-spacing: 1px;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
    color: white;
    transition: all 0.4s ease 0s;
    }

  //***************** FLOW PANEL *********************

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
   

    // ******************* slider ****************************
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

    .sequenceSlider{
      
      display: flex;
      height: 150px;
  
    }

    .sequenceNodeContainer {
      display: flex;
      flex-direction: row;
      
      //align-items: center;
      //justify-content: space-between;
      padding: 10px;
      margin: 5px;
      background: radial-gradient(rgba(55, 41, 41, 1) 0%, rgba(20, 20, 20, 1) 100%);
      box-shadow: 0 0 5px 0 #444;
      border-style: solid;
      border-color: grey;
      border-radius: 5px;
      border-width: 1px;
      color: white;
    }
    
    .sequenceNodeContainer input[type="range"] {
      width: 30px;
       //height: 2px;
     
      // -webkit-appearance: none;
      // background-color: transparent;
       transform: rotate(-90deg);
   
      // margin: 5px;
    }

    .sequenceSlider input[type="range"]::-webkit-slider-thumb {
      // -webkit-appearance: none;

    }

    .sequenceSlider input[type=range]::-webkit-slider-runnable-track  {
      // -webkit-appearance: none;
  
    }
    
`;
