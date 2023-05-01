import Head from "next/head";
import useSWR from "swr";
//import { Inter } from "next/font/google";
import Environment from "../../components/Environment";
import styled from "styled-components";

//const inter = Inter({ subsets: ["latin"] });

// TODO - MOVE HEADER TO LAYOUT
export default function Home() {
  const { data } = useSWR("/api/patches", { fallbackData: [] });

  console.log(data);
  let names = data.map((item) => item.name);
  console.log(names);
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
      {
        <div className="environment">
          <Environment />
        </div>
      }

      <ul>
        {data.map((patch) => (
          <li key={patch._id}>From db - Patchname: {patch.name}</li>
        ))}
      </ul>
    </>
  );
}
