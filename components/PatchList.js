import useSWR from "swr";
import { useStore } from "../src/store";
import { shallow } from "zustand/shallow";
import { useSession } from "next-auth/react";

const selector = (store) => ({
  readPatch: store.readPatch,
  setCurrentPatch: store.setCurrentPatch,
  togglePatchList: store.togglePatchList,
  setCurrentPatchName: store.setCurrentPatchName,
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
      <div className="overlayContainer animated">
        <div className="PatchList">
          <button
            type="button"
            className="CloseButton"
            onClick={() => store.togglePatchList()}
          >
            ╳
          </button>
          <div className="patchListColumn">
            <h3>My projects</h3>
            {session ? (
              <ul>
                {userData.map((patch) => (
                  <li key={patch._id}>
                    <div className="deleteButtonContainer">
                      <button
                        className="patchDeleteButton"
                        onClick={() => deletePatch(patch._id)}
                      >
                        ╳
                      </button>{" "}
                      <button
                        onClick={() => {
                          store.setCurrentPatch(patch._id);
                          store.readPatch(patch);
                          store.togglePatchList();
                          store.setCurrentPatchName(patch.name);
                        }}
                      >
                        {patch.name}
                      </button>{" "}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              "Sign in required"
            )}
          </div>
          <div className="patchListColumn">
            <h3>Public projects</h3>
            <ul>
              {data.map((patch) => (
                <li key={patch._id}>
                  <button
                    onClick={() => {
                      store.setCurrentPatch(patch._id);
                      store.readPatch(patch);
                      store.togglePatchList();
                    }}
                  >
                    {patch.name}
                  </button>{" "}
                  {/* <button onClick={() => deletePatch(patch._id)}>❌╳</button>{" "} */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  );
}
