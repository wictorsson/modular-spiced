import useSWR from "swr";
import { useStore } from "../src/store";
import { shallow } from "zustand/shallow";
import { useSession } from "next-auth/react";

const selector = (store) => ({
  readPatch: store.readPatch,
  setCurrentPatch: store.setCurrentPatch,
  togglePatchList: store.togglePatchList,
});

export default function PatchList() {
  const { isPatchListClicked } = useStore();

  const { data: session } = useSession();
  const patches = useSWR("/api/patches", { fallbackData: [] });

  let data = patches.data;
  const store = useStore(selector, shallow);

  let userData;
  if (session) {
    userData = data.filter(
      (userPatch) => userPatch.user_email === session.user.email
    );
  }
  data = data.filter((patch) => patch.publicPatch === "true");

  //************************************/
  async function deletePatch(patchId) {
    await fetch(`/api/patches/${patchId}`, {
      method: "DELETE",
    });
    // Delete patch from the list of patches
    const newPatchList = data.filter((p) => p._id !== patchId);
    patches.mutate(newPatchList);
  }

  return (
    isPatchListClicked && (
      <div className="PatchList">
        <div>
          <h2>My projects</h2>
          {session ? (
            <ul>
              {userData.map((patch) => (
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
            </ul>
          ) : (
            ": Login required"
          )}
        </div>
        <div>
          <h2>Public projects</h2>
          <ul>
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
          </ul>
        </div>
      </div>
    )
  );
}
