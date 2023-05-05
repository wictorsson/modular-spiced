import { useSession, signIn, signOut } from "next-auth/react";
import useSWR from "swr";
import { shallow } from "zustand/shallow";
import { useStore } from "../src/store";
import SaveForm from "./SaveForm";
import useSWRMutation from "swr/mutation";

const selector = (store) => ({
  readPatch: store.readPatch,
  setCurrentPatch: store.setCurrentPatch,
});

export default function Footerfunction() {
  const { data: session } = useSession();

  const patches = useSWR("/api/patches", { fallbackData: [] });
  let data = patches.data;
  const store = useStore(selector, shallow);
  const { nodes, edges, currentPatch } = useStore();

  let userData;
  if (session) {
    userData = data.filter(
      (userPatch) => userPatch.user_email === session.user.email
    );
  }
  data = data.filter((patch) => patch.publicPatch === "true");

  //************************************/
  async function savePatch(patch) {
    let userEmail;
    let isPublic;
    if (session) {
      userEmail = session.user.email;
      isPublic = "false";
    } else {
      userEmail = "public123!@noemail.com";
      isPublic = "true";
    }

    const patchData = {
      nodes: nodes,
      edges: edges,
      user_email: userEmail,
      publicPatch: isPublic,
    };

    const formData = new FormData(patch.target);
    const formDataObject = Object.fromEntries(formData);
    // Merge formdata (patchname) with nodes and edges from Zustand store and email
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
    <div className="Footer">
      {/* <ul>
        Public patches
        {data.map((patch) => (
          <li key={patch._id}>
            <button
              onClick={() => {
                store.setCurrentPatch(patch._id);
                store.readPatch(patch);
              }}
            >
              {patch.name}
            </button>{" "}
            <button onClick={() => deletePatch(patch._id)}>❌</button>{" "}
          </li>
        ))}
      </ul> */}
      <button
        onClick={() => {
          handleEditPatch();
        }}
      >
        Save
      </button>
      <SaveForm onSubmit={savePatch} />{" "}
      {/* <div>
        My patches
        <b></b>
        {session ? (
          <ul>
            {userData.map((patch) => (
              <li key={patch._id}>
                <button
                  onClick={() => {
                    store.setCurrentPatch(patch._id);
                    // console.log("CURRENT PATCH", currentPatch);
                    store.readPatch(patch);
                  }}
                >
                  {patch.name}
                </button>{" "}
                <button onClick={() => deletePatch(patch._id)}>❌</button>{" "}
              </li>
            ))}
          </ul>
        ) : (
          ": Login required"
        )}
      </div> */}
    </div>
  );
}
