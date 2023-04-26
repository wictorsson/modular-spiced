import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../../src/store";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  setFrequency: (e) => store.updateNode(id, { frequency: e.target.value }),
  setType: (e) => store.updateNode(id, { type: e.target.value }),
});

// id and data are passed down as props from the React Flow library! Gets the data from nodeTypes
export default function Osc({ id, data }) {
  //console.log(xPos);
  const { setFrequency, setType } = useStore(selector(id), shallow);
  const typeName = id + "_type";
  return (
    <div>
      <div className="nodeContainer">
        <h3>Oscillator</h3>

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
                value="sine"
                checked={data.type === "sine"}
                onChange={setType}
              />
              Sine
              <input
                type="radio"
                name={typeName}
                value="triangle"
                checked={data.type === "triangle"}
                onChange={setType}
              />
              Triangle
            </label>
            <label style={{ display: "block" }}>
              <input
                type="radio"
                name={typeName}
                value="sawtooth"
                checked={data.type === "sawtooth"}
                onChange={setType}
              />
              Saw
              <input
                type="radio"
                name={typeName}
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
    </div>
  );
}
