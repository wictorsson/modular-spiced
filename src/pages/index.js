import Head from "next/head";
import useSWR from "swr";
import { shallow } from "zustand/shallow";
import { useStore } from "../store";
import Environment from "../../components/Environment";

// TODO - MOVE HEADER TO LAYOUT

const selector = (store) => ({
  readPatch: store.readPatch,
});

export default function Home() {
  const { data } = useSWR("/api/patches", { fallbackData: [] });
  const store = useStore(selector, shallow);

  //console.log(data);
  let patches = data.map((patch) => patch);
  console.log(patches);
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
        Load a patch from db
        {data.map((patch) => (
          <li key={patch._id}>
            <button onClick={() => store.readPatch(patch)}>{patch.name}</button>{" "}
          </li>
        ))}
      </ul>
    </>
  );
}
