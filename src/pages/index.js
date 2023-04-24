import Head from "next/head";
//import { Inter } from "next/font/google";
import Environment from "../../components/Environment";
import * as Tone from "tone";
//const inter = Inter({ subsets: ["latin"] });
import { useState } from "react";

// MOVE HEADER TO LAYOUT
export default function Home() {
  return (
    <>
      <Head>
        <title>Modular</title>
      </Head>

      {/* <div className="welcome-screen">Header Nav</div> */}
      {/* {!audioStarted && (
        <div className="welcome-screen">
          <button className="button" onClick={initAudio}>
            ENTER
          </button>
        </div>
      )} */}
      <div className="environment">
        <Environment />
      </div>
      {/* {audioStarted && (
        <div className="environment">
          <Environment audioStarted={audioStarted} />
        </div>
      )} */}
      {/* <main></main> */}
    </>
  );
}
