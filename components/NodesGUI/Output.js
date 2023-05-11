import React from "react";
import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../src/store";

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
      <div className="nodeContainer">
        AUDIO OUT
        <div className="input-box">
          <h3>Tempo</h3>
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
