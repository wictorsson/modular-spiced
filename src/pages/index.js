import Head from "next/head";
//import { Inter } from "next/font/google";
import Environment from "../../components/Environment";
//const inter = Inter({ subsets: ["latin"] });

// TODO - MOVE HEADER TO LAYOUT
export default function Home() {
  return (
    <>
      <Head>
        <title>Modular</title>
      </Head>

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
    </>
  );
}
