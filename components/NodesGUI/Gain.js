import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../../src/store";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  setGain: (e) => store.updateNode(id, { gain: e.target.value }),
});

export default function Gain({ id, data }) {
  const { setGain } = useStore(selector(id), shallow);

  return (
    <div>
      <div>
        <p>Amp</p>

        <label>
          <span>Gain</span>
          <input
            className="nodrag"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={data.gain}
            onChange={setGain}
          />
          <span>{data.gain}dB</span>
        </label>
      </div>

      <Handle type="target" position="bottom" />
      <Handle type="source" position="top" />
    </div>
  );
}
