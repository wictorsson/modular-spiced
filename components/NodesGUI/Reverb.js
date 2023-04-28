import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../../src/store";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  setroomSize: (e) => store.updateNode(id, { roomSize: e.target.value }),
});

export default function Reverb({ id, data }) {
  const { setroomSize } = useStore(selector(id), shallow);

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
      </div>

      <Handle type="target" position="bottom" />
      <Handle type="source" position="top" />
    </div>
  );
}
