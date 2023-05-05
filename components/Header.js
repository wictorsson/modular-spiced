import { useSession, signIn, signOut } from "next-auth/react";
import { useStore } from "../src/store";
import { shallow } from "zustand/shallow";
import useSWR from "swr";

import useSWRMutation from "swr/mutation";

const selector = (store) => ({
  readPatch: store.readPatch,
  setCurrentPatch: store.setCurrentPatch,
  togglePatchList: store.togglePatchList,
  toggleSaveAs: store.toggleSaveAs,
});

export default function Header() {
  const patches = useSWR("/api/patches", { fallbackData: [] });
  let data = patches.data;
  const store = useStore(selector, shallow);
  const { nodes, edges, currentPatch } = useStore();
  const { data: session } = useSession();
  let userData;
  if (session) {
    userData = data.filter(
      (userPatch) => userPatch.user_email === session.user.email
    );
  }
  data = data.filter((patch) => patch.publicPatch === "true");
  //const store = useStore();

  //************************************/
  async function editPatch(url, { arg }) {
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(arg),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  const { trigger, isMutating } = useSWRMutation(
    `/api/patches/${currentPatch}`,
    editPatch
  );

  async function handleEditPatch() {
    //const nameObject = { name: "02/05/2023, 14:40:10" };

    const patchData = {
      nodes: nodes,
      edges: edges,
      publicPatch: "true",
    };
    Object.assign(patchData);

    await trigger(patchData);
    patches.mutate();
    //push("/");
  }

  return (
    <div className="Header">
      {session ? (
        <>
          {/* Signed in | {session.user.name} <br /> */}
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <br />
          <button onClick={() => signIn()}>Sign in</button>
          {/* to save and browse
            projects */}
        </>
      )}

      {/* <div>Unsaved Project</div> */}
      <button onClick={() => store.togglePatchList()}>Projects</button>
      {/* <div>SAVE | SAVE AS</div> */}
      <div className="SaveSection">
        <button
          onClick={() => {
            handleEditPatch();
          }}
        >
          Save
        </button>
        <button onClick={() => store.toggleSaveAs()}>Save As</button>
      </div>
    </div>
  );
}
