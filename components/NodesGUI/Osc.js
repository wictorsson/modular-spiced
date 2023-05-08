import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../../src/store";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  setFrequency: (e) => {
    const scewedParam = 20000 * Math.pow(e.target.value / 100, 4);
    const roundedScewParam = parseFloat(scewedParam.toFixed(0));
    store.updateNode(id, { frequency: roundedScewParam });
  },
  setType: (e) => store.updateNode(id, { type: e.target.value }),
});

// id and data are passed down as props from the React Flow library! Gets the data from nodeTypes
export default function Osc({ id, data }) {
  const { setFrequency, setType } = useStore(selector(id), shallow);
  const typeName = id + "_type";
  const linearValue = 100 * Math.pow(data.frequency / 20000, 1 / 4);
  const roundedLinearValue = parseFloat(linearValue.toFixed(0));
  return (
    <div>
      <div className="nodeContainer">
        <h3>Oscillator</h3>

        <span>Freq</span>

        <input
          id="slider"
          className="nodrag"
          type="range"
          min="0"
          max="100"
          value={roundedLinearValue}
          onChange={setFrequency}
        />
        <span>{data.frequency} Hz</span>
        <div className="waveformContainer">
          <div className="nodrag">
            <label style={{ display: "block" }}>
              <input
                type="radio"
                name={typeName}
                value="sine"
                checked={data.type === "sine"}
                onChange={setType}
              />
              Sine
              <input
                type="radio"
                name={typeName + "sine"}
                value="triangle"
                checked={data.type === "triangle"}
                onChange={setType}
              />
              Triangle
            </label>
            <label style={{ display: "block" }}>
              <input
                type="radio"
                name={typeName + "triangle"}
                value="sawtooth"
                checked={data.type === "sawtooth"}
                onChange={setType}
              />
              Saw
              <input
                type="radio"
                name={typeName + "square"}
                value="square"
                checked={data.type === "square"}
                onChange={setType}
              />
              Square
            </label>
          </div>
        </div>
      </div>

      <Handle type="source" position="top" />
      <Handle type="target" position="right" id="paramFrequency" />
    </div>
  );
}
