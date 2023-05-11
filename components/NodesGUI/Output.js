import React from "react";
import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../src/store";
import soundLogo from "../../public/soundwave.png";
import Image from "next/image";
// const selector = (store) => ({
//   isRunning: store.isRunning,
//   toggleAudio: store.toggleAudio,
// });

const selector = (id) => (store) => ({
  isRunning: store.isRunning,
  toggleAudio: store.toggleAudio,
  setBPM: (e) => store.updateNode("output_id", { bpm: e.target.value }),
});

export default function AudioOut({ id, data }) {
  //const { isRunning, toggleAudio } = useStore(selector, shallow);
  const { setBPM } = useStore(selector(id), shallow);

  return (
    <div>
      <Handle type="target" position="bottom" />
      <div className="nodeContainer-gain">
        <div className="imageLogo">
          <Image
            src={soundLogo}
            alt=""
            style={{ width: "110px", height: "15px", marginLeft: "10px" }}
          />
        </div>
        <span></span>
        <br></br>
        <h4>AUDIO OUT</h4>
        <div className="input-box">
          <span>Tempo</span>

          <input
            type="number"
            required
            min={30}
            max={250}
            value={data.bpm}
            onChange={setBPM}
          ></input>
        </div>
      </div>
      {/* <button onClick={toggleAudio}>
        {isRunning ? <div>✅</div> : <div>❌</div>}
      </button> */}
    </div>
  );
}
