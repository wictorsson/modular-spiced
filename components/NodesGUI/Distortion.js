import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../../src/store";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  setDistortion: (e) => {
    store.updateNode(id, { distortion: e.target.value });
  },
  removeNode: (e) => {
    store.onNodesChange([{ type: "remove", id: id, clickDelete: true }]);
  },
});

export default function Distortion({ id, data }) {
  const { setDistortion,removeNode } = useStore(selector(id), shallow);

  return (
    <div>
      <div className="nodeContainer">
        <h3>Dist</h3>

        <input
          className="nodrag"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={data.gain}
          onChange={setDistortion}
        />
        {/* <span>{data.gain}dB</span> */}
        <button type="button" className="CloseButton" onClick={removeNode}>
          ╳
        </button>
      </div>

      <Handle type="target" position="bottom" />
      <Handle type="source" position="top" />
      {/* <Handle type="target" position="right" id="paramDistortion" /> */}
    </div>
  );
}
