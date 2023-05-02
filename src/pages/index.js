import Head from "next/head";
import useSWR from "swr";
import { shallow } from "zustand/shallow";
import { useStore } from "../store";
import Environment from "../../components/Environment";
import SaveForm from "../../components/SaveForm";

const selector = (store) => ({
  readPatch: store.readPatch,
});

export default function Home() {
  const patches = useSWR("/api/patches", { fallbackData: [] });
  const data = patches.data;
  const store = useStore(selector, shallow);

  const { nodes, edges } = useStore();
  async function savePatch(patch) {
    const patchData = {
      nodes: nodes,
      edges: edges,
    };

    const formData = new FormData(patch.target);
    const formDataObject = Object.fromEntries(formData);
    // Merge formdata with nodes and edges from Zustand store
    Object.assign(patchData, formDataObject);
    const response = await fetch("/api/patches", {
      method: "POST",
      body: JSON.stringify(patchData),
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patchData),
    });

    if (response.ok) {
      await response.json();

      patches.mutate();
      // router.push("/");
      // event.target.reset();
    } else {
      console.log("ERROR");
      console.error(`Error: ${response.status}`);
    }
  }

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
      <SaveForm onSubmit={savePatch} />
    </>
  );
}
