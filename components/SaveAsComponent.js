import useSWR from "swr";
import { useStore } from "../src/store";
import { shallow } from "zustand/shallow";
import { useSession } from "next-auth/react";
import SaveForm from "./SaveForm";

const selector = (store) => ({
  readPatch: store.readPatch,
  setCurrentPatch: store.setCurrentPatch,
  //   togglePatchList: store.togglePatchList,
});

export default function PatchList() {
  const { isSaveAsClicked } = useStore();

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
  return (
    isSaveAsClicked && (
      <div className="SaveAsPopup">
        <SaveForm onSubmit={savePatch} />
      </div>
    )
  );
}
