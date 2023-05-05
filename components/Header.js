import { useSession, signIn, signOut } from "next-auth/react";
import { useStore } from "../src/store";
//import { shallow } from "zustand/shallow";

// const selector = (store) => ({
//   togglePatchList: store.togglePatchList,
// });

export default function Header() {
  const store = useStore();
  const { data: session } = useSession();
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
      <div>SAVE | SAVE AS</div>
    </div>
  );
}
