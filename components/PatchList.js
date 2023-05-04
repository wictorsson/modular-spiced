import useSWR from "swr";
import { useStore } from "../src/store";
import { shallow } from "zustand/shallow";
import { useSession, signIn, signOut } from "next-auth/react";

const selector = (store) => ({
  readPatch: store.readPatch,
  setCurrentPatch: store.setCurrentPatch,
});

export default function PatchList() {
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

  return (
    <div className="PatchList">
      <div>
        My patches
        <b></b>
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
      <ul>
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
      </ul>
    </div>
  );
}
