import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../src/store";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  setFrequency: (e) => store.updateNode(id, { frequency: e.target.value }),
  setType: (e) => store.updateNode(id, { type: e.target.value }),
});

// id and data are passed down as props from the React Flow library! Gets the data from nodeTypes
export default function Osc({ id, data, xPos }) {
  //console.log(xPos);
  const { setFrequency, setType } = useStore(selector(id), shallow);

  return (
    <div>
      <div>
        <p>Osc</p>

        <label>
          <span>Frequency</span>
          <input
            className="nodrag"
            type="range"
            min="10"
            max="5000"
            value={data.frequency}
            onChange={setFrequency}
          />
          <span>{data.frequency}Hz</span>
        </label>

        {/* <label>
          <span>Waveform</span>
          <select className="nodrag" value={data.type} onChange={setType}>
            <option value="sine">sine</option>
            <option value="triangle">triangle</option>
            <option value="sawtooth">sawtooth</option>
            <option value="square">square</option>
          </select>
        </label> */}
      </div>

      <Handle type="source" position="bottom" />
    </div>
  );
}
