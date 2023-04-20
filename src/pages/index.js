import Head from "next/head";
import { Inter } from "next/font/google";
import Environment from "../../components/Environment";
import * as Tone from "tone";
const inter = Inter({ subsets: ["latin"] });

// Start audio by user interaction, needed for mobile devices
// Send to audio master channel later
function initAudio() {
  audioStarted = true;
  Tone.start();
  // synth.triggerAttackRelease("C2", "8n");
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Modular</title>
      </Head>
      <button className="glow-on-hover" onClick={initAudio}>
        ENABLE APP
      </button>
      <div className="environment">
        <Environment />
      </div>
      <main>---SECTION---</main>
    </>
  );
}
