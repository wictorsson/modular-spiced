import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../../src/store";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  setFrequency: (e) => {
    //Add 0.0001 to avoid pop from filter turning off and on
    const scewedParam = 20000 * Math.pow(e.target.value / 100, 4) + 0.0001;

    store.updateNode(id, { frequency: scewedParam });
  },
  setType: (e) => store.updateNode(id, { type: e.target.value }),
  setResonance: (e) => store.updateNode(id, { Q: e.target.value }),
  removeNode: (e) => {
    store.onNodesChange([{ type: "remove", id: id, clickDelete: true }]);
  },
});

export default function Filter({ id, data }) {
  const { setFrequency, setType, setResonance, removeNode } = useStore(
    selector(id),
    shallow
  );

  const linearValue = 100 * Math.pow(data.frequency / 20000, 1 / 4);
  const roundedLinearValue = parseFloat(linearValue.toFixed(0));

  //Make unique type name to avoid conflicts when using multiple intances
  const typeName = id + "_type";
  return (
    <div>
      <div className="nodeContainer-fx">
        <h3>Filter</h3>
        <span>Freq</span> <div> {data.frequency.toFixed(0)} Hz</div>
        <input
          id="slider"
          className="nodrag"
          type="range"
          min="1"
          max="100"
          value={roundedLinearValue}
          onChange={setFrequency}
        />
        {/* const exponentialValue = Math.pow(baseValue, (linearValue - 1) / (baseMax - 1)) * exponentialMax; */}
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
          <div className="nodeContainer-fx">
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
        <button type="button" className="CloseButton" onClick={removeNode}>
          ╳
        </button>
      </div>

      <Handle type="source" position="top" />
      <Handle type="target" position="bottom" />
      <Handle type="target" position="right" id="paramFrequency" />
    </div>
  );
}
