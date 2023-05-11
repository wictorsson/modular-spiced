import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../../src/store";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  setTime: (e) => store.updateNode(id, { frequency: e.target.value }),
  setMin: (e) => store.updateNode(id, { min: e.target.value }),
  setMax: (e) => store.updateNode(id, { max: e.target.value }),
  setType: (e) => store.updateNode(id, { type: e.target.value }),
});

export default function LfoSynced({ id, data }) {
  const { setTime, setMin, setMax, setType } = useStore(selector(id), shallow);
  //Make unique type name to avoid conflicts when using multiple intances
  const typeName = id + "_type";
  const typeName2 = id + "_type2";

  return (
    <div>
      <div className="nodeContainer">
        <h3>LFO synced</h3>

        <div className="nodeContainer">
          <h3>Time</h3>

          <div>
            <input
              type="radio"
              id="2n"
              name={typeName}
              value="2n"
              onChange={setTime}
              checked={data.frequency === "2n"}
            />
            <label htmlFor="2n">2n</label>
          </div>
          <div>
            <input
              type="radio"
              id="4n"
              name={typeName}
              value="4n"
              onChange={setTime}
              checked={data.frequency === "4n"}
            />
            <label htmlFor="4n">4n</label>
          </div>
          <div>
            <input
              type="radio"
              id="8n"
              name={typeName}
              value="8n"
              onChange={setTime}
              checked={data.frequency === "8n"}
            />
            <label htmlFor="8n">8n</label>
          </div>
          <div>
            <input
              type="radio"
              id="8n."
              name={typeName}
              value="8n."
              onChange={setTime}
              checked={data.frequency === "8n."}
            />
            <label htmlFor="8n.">8n.</label>
          </div>
          <div>
            <input
              type="radio"
              id="16n"
              name={typeName}
              value="16n"
              onChange={setTime}
              checked={data.frequency === "16n"}
            />
            <label htmlFor="16n">16n</label>
          </div>
        </div>

        <span>Min</span>

        <input
          id="slider"
          className="nodrag"
          type="range"
          min="0.01"
          max="1"
          step="0.01"
          value={data.min}
          onChange={setMin}
        />

        <span>Max</span>

        <input
          id="slider"
          className="nodrag"
          type="range"
          min="0.01"
          max="1"
          step="0.01"
          value={data.max}
          onChange={setMax}
        />

        <div className="nodrag">
          <label style={{ display: "block" }}>
            <input
              type="radio"
              name={typeName2 + "sine"}
              value="sine"
              checked={data.type === "sine"}
              onChange={setType}
            />
            Sine
            <input
              type="radio"
              name={typeName2 + "sine"}
              value="triangle"
              checked={data.type === "triangle"}
              onChange={setType}
            />
            Triangle
          </label>
          <label style={{ display: "block" }}>
            <input
              type="radio"
              name={typeName2 + "triangle"}
              value="sawtooth"
              checked={data.type === "sawtooth"}
              onChange={setType}
            />
            Saw
            <input
              type="radio"
              name={typeName2 + "square"}
              value="square"
              checked={data.type === "square"}
              onChange={setType}
            />
            Square
          </label>
        </div>
      </div>

      <Handle type="source" position="top" id="paramHandle" />
      <Handle type="target" position="right" id="paramFrequency" />
      {/* <Handle type="target" position="bottom" /> */}
      {/* <Handle type="target" position="right" id="freqHandle" /> */}
    </div>
  );
}
