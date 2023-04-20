import Head from "next/head";
import { Inter } from "next/font/google";
import Environment from "../components/Environment";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Modular</title>
      </Head>
      <div className="environment">
        <Environment />
      </div>
      <main>---SECTION---</main>
    </>
  );
}
