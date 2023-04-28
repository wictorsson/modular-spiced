import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../../src/store";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  setFrequency: (e) => store.updateNode(id, { frequency: e.target.value }),
  setType: (e) => store.updateNode(id, { type: e.target.value }),
});

export default function Filter({ id, data }) {
  const { setFrequency, setType } = useStore(selector(id), shallow);
  //Make unique type name to avoid conflicts when using multiple intances
  const typeName = id + "_type";
  return (
    <div>
      <div className="nodeContainer">
        <h3>Filter</h3>

        <span>Freq</span>

        <input
          id="slider"
          className="nodrag"
          type="range"
          min="10"
          max="2500"
          value={data.frequency}
          onChange={setFrequency}
        />
        {/* <span>{data.frequency}Hz</span> */}
        <div className="waveformContainer">
          <div className="nodrag">
            <label style={{ display: "block" }}>
              <input
                type="radio"
                name={typeName}
                value="lowpass"
                checked={data.type === "lowpass"}
                onChange={setType}
              />
              LPF
              <input
                type="radio"
                name={typeName}
                value="highpass"
                checked={data.type === "highpass"}
                onChange={setType}
              />
              HPF
            </label>
          </div>
        </div>
      </div>

      <Handle type="source" position="top" />
      <Handle type="target" position="bottom" />
      <Handle type="target" position="right" id="freqHandle" />
    </div>
  );
}
