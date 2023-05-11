import Head from "next/head";
//Del
// import useSWR from "swr";
// import { shallow } from "zustand/shallow";
// import { useStore } from "../store";
// import { useSession } from "next-auth/react";
import Environment from "../../components/Environment";
// import SaveForm from "../../components/SaveForm";
// import useSWRMutation from "swr/mutation";
import Header from "../../components/Header";
import Footerfunction from "../../components/Footer";
import PatchList from "../../components/PatchList";
import SaveAsComponent from "../../components/SaveAsComponent";
// const selector = (store) => ({
//   readPatch: store.readPatch,
//   setCurrentPatch: store.setCurrentPatch,
// });

export default function Home() {
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
      <Header></Header>

      {
        <div className="environment">
          <Environment />
        </div>
      }
      <PatchList></PatchList>
      <SaveAsComponent></SaveAsComponent>
      <Footerfunction></Footerfunction>
    </>
  );
}
