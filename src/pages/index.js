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
    // Merge formdata (patchname) with nodes and edges from Zustand store
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

  async function deletePatch(patchId) {
    //TODO CREATE LOOP FIND BY ID
    await fetch(`/api/patches/${patchId}`, {
      method: "DELETE",
    });
    // Delete patch from the list of patches
    const newPatchList = data.filter((p) => p._id !== patchId);
    patches.mutate(newPatchList);
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
        Patches from db
        {data.map((patch) => (
          <li key={patch._id}>
            <button onClick={() => store.readPatch(patch)}>{patch.name}</button>{" "}
            <button onClick={() => deletePatch(patch._id)}>❌</button>{" "}
          </li>
        ))}
      </ul>
      <SaveForm onSubmit={savePatch} />
    </>
  );
}
