import Head from "next/head";
//import { Inter } from "next/font/google";
import Environment from "../../components/Environment";
import * as Tone from "tone";
//const inter = Inter({ subsets: ["latin"] });
import { useState } from "react";

export default function Home() {
  const [audioStarted, setAudioStarted] = useState(false);
  const initAudio = () => {
    setAudioStarted(true);
    Tone.start();
  };
  return (
    <>
      {/* <Head>
        <title>Modular</title>
      </Head> */}
      {/* <div className="body">Header Nav</div> */}
      {/* {!audioStarted && (
        <div className="welcome-screen">
          <button className="button" onClick={initAudio}>
            ENTER
          </button>
        </div>
      )} */}
      <Environment />
      {/* {audioStarted && (
        <div className="environment">
          <Environment audioStarted={audioStarted} />
        </div>
      )} */}
      {/* <main></main> */}
    </>
  );
}
