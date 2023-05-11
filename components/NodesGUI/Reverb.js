import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../../src/store";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  setroomSize: (e) => store.updateNode(id, { roomSize: e.target.value }),
  removeNode: (e) => {
    store.onNodesChange([{ type: "remove", id: id, clickDelete: true }]);
  },
});

export default function Reverb({ id, data }) {
  const { setroomSize,removeNode } = useStore(selector(id), shallow);

  return (
    <div>
      <div className="nodeContainer">
        <h3>Reverb</h3>

        <span>Size</span>
        <input
          className="nodrag"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={data.roomSize}
          onChange={setroomSize}
        />
         <button type="button" className="CloseButton" onClick={removeNode}>
          ╳
        </button>
      </div>

      <Handle type="target" position="bottom" />
      <Handle type="source" position="top" />
    </div>
  );
}
