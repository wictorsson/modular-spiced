import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../../src/store";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  setGain: (e) => {
    store.updateNode(id, { gain: e.target.value });
  },
  removeNode: (e) => {
    store.onNodesChange([{ type: "remove", id: id, clickDelete: true }]);
    // store.onEdgesChange([{ type: "remove", id: id, clickDelete: true }]);
  },
});

export default function Gain({ id, data }) {
  const { setGain, removeNode } = useStore(selector(id), shallow);

  return (
    <div>
      <div className="nodeContainer">
        <h3>Gain</h3>
        <input
          className="nodrag"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={data.gain}
          onChange={setGain}
        />
        {/* <span>{data.gain}dB</span> */}
        {/* <button onClick={() => store.createNode("gain")}>Gain</button> */}
        <button type="button" className="CloseButton" onClick={removeNode}>
          ╳
        </button>
      </div>

      <Handle type="target" position="bottom" />
      <Handle type="source" position="top" />
      {/* <Handle type="target" position="right" id="paramGain" /> */}
    </div>
  );
}
