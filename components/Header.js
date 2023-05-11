import { useSession, signIn, signOut } from "next-auth/react";
import { useStore } from "../src/store";
import { shallow } from "zustand/shallow";
import useSWR from "swr";

import useSWRMutation from "swr/mutation";

const selector = (store) => ({
  togglePatchList: store.togglePatchList,
  toggleSaveAs: store.toggleSaveAs,
});

export default function Header() {
  const patches = useSWR("/api/patches", { fallbackData: [] });
  let data = patches.data;
  const store = useStore(selector, shallow);
  const {
    nodes,
    edges,
    currentPatch,
    currentPatchName,
    isPatchListClicked,
    isSaveAsClicked,
  } = useStore();
  const { data: session } = useSession();
  let userData;

  if (session) {
    userData = data.filter(
      (userPatch) => userPatch.user_email === session.user.email
    );
  }
  userData = data.find((patch) => patch.name === currentPatchName);

  let currentPatchObject = currentPatch;
  if (userData) {
    currentPatchObject = userData._id;
  }
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
    `/api/patches/${currentPatchObject}`,
    editPatch
  );

  async function handleEditPatch() {
    const patchData = {
      nodes: nodes,
      edges: edges,
      // publicPatch: "true",
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
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <>
          <br />
          <button onClick={() => signIn()}>Sign In</button>
          {/* to save and browse
            projects */}
        </>
      )}

      {/* <div>Unsaved Project</div> */}
      <button
        onClick={() => {
          if (isSaveAsClicked) {
            store.toggleSaveAs();
          }
          store.togglePatchList();
        }}
      >
        Projects
      </button>
      <div>{currentPatchName}</div>

      <div className="SaveSection">
        <button
          onClick={() => {
            {
              if (isPatchListClicked) {
                store.togglePatchList();
              }
              currentPatchName === "Untitled Project"
                ? store.toggleSaveAs()
                : handleEditPatch();
            }
          }}
        >
          Save
        </button>

        <button
          onClick={() => {
            if (isPatchListClicked) {
              store.togglePatchList();
            }
            store.toggleSaveAs();
          }}
        >
          Save As
        </button>
      </div>
    </div>
  );
}
