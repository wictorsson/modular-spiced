import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../../src/store";
import { shallow } from "zustand/shallow";
import { useState, useEffect } from "react";

const selector = (id) => (store) => ({
  setFrequency: (e) => {
    store.updateNode(id, { frequency: e.target.value });
  },
  setType: (e) => store.updateNode(id, { type: e.target.value }),
  setResonance: (e) => store.updateNode(id, { Q: e.target.value }),
});

export default function Filter({ id, data }) {
  const { setFrequency, setType, setResonance } = useStore(
    selector(id),
    shallow
  );

  // const [roundedResult, setRoundedResult] = useState(
  //   parseFloat((20000 * Math.pow(data.frequency / 100, 2)).toFixed(0))
  // );

  // useEffect(() => {
  //   // Update the rounded result whenever the frequency value changes
  //   setRoundedResult(
  //     parseFloat((20000 * Math.pow(data.frequency / 100, 2)).toFixed(0))
  //   );
  // }, [data.frequency]);
  const scewedParam = 20000 * Math.pow(data.frequency / 100, 4);
  const roundedScewParam = parseFloat(scewedParam.toFixed(0));
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
          min="0"
          max="100"
          value={data.frequency}
          onChange={setFrequency}
        />
        {/* const exponentialValue = Math.pow(baseValue, (linearValue - 1) / (baseMax - 1)) * exponentialMax; */}
        <div>Hz: {roundedScewParam}</div>
        <span>Res</span>

        <input
          id="slider"
          className="nodrag"
          type="range"
          min="0.1"
          max="20"
          value={data.Q}
          onChange={setResonance}
        />

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
      <Handle type="target" position="right" id="paramHandle" />
    </div>
  );
}
