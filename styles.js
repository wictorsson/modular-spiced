import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    font-family: "Roboto","Noto",sans-serif;
    //font-family: "proxima-nova", "Arial", sans-serif;
  
  }


  .testDiv{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 6rem;
  }

.imageLogo{
  position: absolute;
  left: -3px;
  top: 0 px;
  height: 20px;
  width:20px;
 
}
  .Header{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4%;
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
    height: 50px; 
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
 
      background: rgb(191,191,191);
     // background: radial-gradient(circle, rgba(40, 35, 26, 1) 0%, rgba(19, 19, 19, 1) 83%);
      margin: 0; /* Add this line */
      color:white;
  }

  .main {
    background: rgb(41,35,26);
    background: radial-gradient(circle, rgba(41,35,26,1) 0%, rgba(17,17,17,1) 83%);
  }


  .overlayContainer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .overlayContainer.animated {
    animation-name: fadeIn;
    animation-duration: 0.3s;
    animation-fill-mode: forwards; /* keep the last keyframe state after animation ends */
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  .PatchList {
    position: absolute;
    background: radial-gradient(circle, rgba(51,55,56,1) 0%, rgba(17,17,17,1) 83%);
    transform: translate(-50%, -50%);
    width: 600px;
    height: 400px;
    max-height: calc(80vh - 150px);
    overflow-y: auto;
    z-index: 2;
    display: flex;
    justify-content: center;
    padding: 3rem;
    text-align: center;
    border-style: solid;
    border-color: #46494c;
    border-width: 1px;
    border-radius: 10px;
    position: absolute;
    gap: 40px;
    top: 35%;
    left: 50%;
  }
  
  .PatchList button {
    background: rgb(70,41,41,0);
     color: lightgrey; 
     border-style: solid;
     padding: 8px 10px; /* Add padding to the button */
     text-align: center; /* Center the text */
     border-width: 1px;
     font-size: 10px; /* Change the font size */
     border-radius: 4px; /* Add border radius */
     height: 40px;
     width: 120px;
     border-color: #46494c;
  }

  
  .PatchList button:hover {
    color: white; 
    background: #202020;
   //letter-spacing: 1px;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
    color: white;
    transition: all 0.4s ease 0s;
    }



  .patchListColumn{
    width: 200px;
   
    //background: grey;
    display: flex;
    flex-direction: column;
   // align-items: flex-start;
    justify-content: flex-start;
    position: relative;
  }


  .PatchList ul{
   
    position: absolute;
    top: 50px;
    right: 30px;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .deleteButtonContainer{
    display: flex;
    flex-direction: row;
  }

  .patchDeleteButton{
    width: 35px !important;

  }


    .CloseButton {
      background: rgb(70,41,41,0);
       color: lightgrey; 
       border-style: solid;
       padding: 8px 10px; /* Add padding to the button */
       text-align: center; /* Center the text */
       border-width: 1px;
       font-size: 8px; /* Change the font size */
       border-radius: 2px; /* Add border radius */
       width: 35px !important;
       height: 35px !important;
       border-color: #46494c;
       position: absolute; 
       left: 15px;
       top: 15px;
       margin: -10px;
    }
  
    
    .CloseButton:hover {
      color: white; 
      background: #202020;
     //letter-spacing: 1px;
      -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
      -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
      box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
      color: white;
      transition: all 0.4s ease 0s;
      }
  

  


 
  
 .SaveForm{
  display: flex;
  flex-direction: column;
  align-content: center;
  gap: 35px;
  justify-content: center;
 }

 .Form-Radiobuttons{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 12px;
}

 .Textbox{
  border: 10px;
  width: 100%;
  height: 100%;
  background: rgba(161,161,161,0.1);
  padding: 1.6rem;
  padding-top: 1.9rem;
  color:black;
  border-radius: 5px;
  border-color: white;
  width: 100%; 
  color: white;
  font-size: 1.0rem; /* increase font size */
  line-height: 1.5; /* increase line height */
}


 .Textbox-label{
  font-size: 0.7rem;
  position: absolute;
  padding: 5px;
  color: white;
 }

 .Form-SaveButton{
  background: rgb(70,41,41,0);
  color: lightgrey; 
  border-style: solid;
  padding: 8px 10px; /* Add padding to the button */
  text-align: center; /* Center the text */
  border-width: 1px;
  font-size: 12px; /* Change the font size */
  border-radius: 4px; /* Add border radius */
  height: 40px;
  //width: 120px;
  border-color: #46494c;
  
 }

 .Form-SaveButton:hover {
  color: white; 
  background: #202020;
 //letter-spacing: 1px;
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
  box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
  color: white;
  transition: all 0.4s ease 0s;
  }

 
 .SaveAsPopup {
  position: absolute;
  background: radial-gradient(circle, rgba(51,55,56,1) 0%, rgba(17,17,17,1) 83%);
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  max-height: calc(80vh - 150px);
  overflow-y: auto;
  z-index: 2;
  display: flex;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  border-style: solid;
  border-color: #46494c;
  border-width: 1px;
  border-radius: 10px;
  position: absolute;
  gap: 150px;
  top: 35%;
  left: 50%;
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
    top: 60px; 
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

  .nodeContainer-fx{
    display: flex;
    flex-direction: column;
    padding: 15px;
    gap: 5px;
    align-items: center;
    justify-content: space-between;
    font-size: 10px;
  
    background: rgb(70,41,41);
   // background: radial-gradient(circle, rgba(55,41,41,1) 0%, rgba(20,20,20,1) 100%);
    background: radial-gradient(rgba(41,51,41,1) 0%, rgba(15,15,15,1) 100%);
    box-shadow: 0 0 5px 0 #444;
    border-style: solid;
    border-color: grey;
    border-radius: 5px;
    border-width: 1px;
    color:white;

  }

  .nodeContainer-gain{
    display: flex;
    flex-direction: column;
    padding: 15px;
    gap: 5px;
    align-items: center;
    justify-content: space-between;
    font-size: 10px;
  
    background: rgb(70,41,41);
   // background: radial-gradient(circle, rgba(55,41,41,1) 0%, rgba(20,20,20,1) 100%);
    background: radial-gradient(rgba(35,35,50,1) 0%, rgba(10,10,15,1) 100%);
    box-shadow: 0 0 5px 0 #444;
    border-style: solid;
    border-color: grey;
    border-radius: 5px;
    border-width: 1px;
    color:white;

  }

  .input-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 8x 0;
    padding: 10px;
  }
  
  .input-box p {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .input-box input {
    width: 100%;
    max-width: 300px;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s ease;
  }
  
  .input-box input:focus {
    outline: none;
    border-color: #0066cc;
  }
  
  .outputNodeContainer {
    display: flex;
    flex-direction: row;
    width: 400px;
    //align-items: center;
    //justify-content: space-between;
    padding: 20px;
    margin: 5px;
    background: radial-gradient(rgba(55, 41, 41, 1) 0%, rgba(20, 20, 20, 1) 100%);
    box-shadow: 0 0 5px 0 #444;
    border-style: solid;
    border-color: grey;
    border-radius: 5px;
    border-width: 1px;
    color: white;
  }


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
    top: 95px;
    left: 95%;
    //bottom: 12px;
   
    transform: translate(0, 0);
    border-color: yellow;

  }



  //***************** FLOW PANEL *********************


  .flowPanel {
    display: flex;
    width: 100px;
    flex-direction: row;
    background-color: rgba(18, 18, 18, 1);
    border-color: grey;
    color: white;
    transition: margin-left 0.5s ease-in-out; /* add transition property */
  }
  
  .flowPanel-hidden {
    display: flex;
    margin-left: -100px;
    width: 100px;
    flex-direction: row;
    background-color: rgba(18, 18, 18, 1);
    border-style: solid;
    border-color: grey;
    border-width: 1px;
    border-radius: 5px;
    color: white;
    transition: margin-left 0.5s ease-in-out; /* add transition property */
  }
  

  .flowPanel button {
    background: rgb(70,41,41,0);
     color: lightgrey; 
     border-style: solid;
     padding: 8px 10px; /* Add padding to the button */
     text-align: center; /* Center the text */
     border-width: 1px;
     font-size: 10px; /* Change the font size */
     border-radius: 2px; /* Add border radius */
     height: 30px;
     width: 100px;
     border-color: #46494c;
  }

  
  .flowPanel button:hover {
    color: white; 
    background: #202020;
   //letter-spacing: 1px;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
    color: white;
    transition: all 0.4s ease 0s;
    }


    .flowPanel-hidden button{
      background: rgb(70,41,41,0);
       color: lightgrey; 
       border-style: solid;
       padding: 8px 10px; /* Add padding to the button */
       text-align: center; /* Center the text */
       border-width: 1px;
       font-size: 10px; /* Change the font size */
       border-radius: 2px; /* Add border radius */
       height: 30px;
       width: 100px;
       border-color: #46494c;
    }

    .flowPanel-closeButton {
      height: 330px !important;
      width: 35px !important;
 
    }



    .SaveSection{
      display: flex;
 
      gap: 15px;
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
      width: 400px;
      //align-items: center;
      //justify-content: space-between;
      padding: 20px;
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
      width: 40px;
      transform: rotate(-90deg);
      margin: 10px -9px; /* Adjusted margin */
      //margin-right: 5px;
    }


    .lamp {
      width: 20px;
      height: 20px;
      border-radius: 4px;
      margin-right: 5px;
    }
    

    .Header button {
      background: rgb(70,41,41,0);
     //background: radial-gradient(circle, rgba(65,41,41,1) 0%, rgba(10,10,10,1) 100%);
      color: lightgrey; 
      border-style: solid;
      padding: 8px 10px; /* Add padding to the button */
      text-align: center; /* Center the text */
      border-width: 1px;
      //display: inline-block; /* Make the button inline */
      font-size: 12px; /* Change the font size */
      border-radius: 2px; /* Add border radius */
      height: 50px;
      border-color: #46494c;
    }
   .Header button:hover {
    color: white; 
      background: #202020;
     //letter-spacing: 1px;
      -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
      -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
      box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
      color: white;
      transition: all 0.4s ease 0s;
      }

      .SaveSection{
        display: flex;
   
        gap: 15px;
      }



`;
