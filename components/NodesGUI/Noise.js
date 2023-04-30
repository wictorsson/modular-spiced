import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../../src/store";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  setType: (e) => store.updateNode(id, { type: e.target.value }),
});

// id and data are passed down as props from the React Flow library! Gets the data from nodeTypes
export default function Osc({ id, data }) {
  //console.log(xPos);
  const { setType } = useStore(selector(id), shallow);
  const typeName = id + "_type";
  return (
    <div>
      <div className="nodeContainer">
        <h3>Noise Osc</h3>

        {/* <span>{data.frequency}Hz</span> */}
        <div className="waveformContainer">
          <div className="nodrag">
            <label style={{ display: "block" }}>
              <input
                type="radio"
                name={typeName}
                value="pink"
                checked={data.type === "pink"}
                onChange={setType}
              />
              Pink
              <input
                type="radio"
                name={typeName}
                value="white"
                checked={data.type === "white"}
                onChange={setType}
              />
              White
            </label>
            <label style={{ display: "block" }}>
              <input
                type="radio"
                name={typeName}
                value="brown"
                checked={data.type === "brown"}
                onChange={setType}
              />
              Brown
            </label>
          </div>
        </div>
      </div>

      <Handle type="source" position="top" />
    </div>
  );
}
