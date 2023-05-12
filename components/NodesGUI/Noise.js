import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../../src/store";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  setType: (e) => store.updateNode(id, { type: e.target.value }),
  removeNode: (e) => {
    store.onNodesChange([{ type: "remove", id: id, clickDelete: true }]);
  },
});

// id and data are passed down as props from the React Flow library! Gets the data from nodeTypes
export default function Osc({ id, data }) {
  //console.log(xPos);
  const { setType, removeNode } = useStore(selector(id), shallow);
  const typeName = id + "_type";
  return (
    <div>
      <div className="nodeContainer">
        <p> </p>
        <h3>Noise Oscillators</h3>
        <div className="nodeContainer">
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
        <button type="button" className="CloseButton" onClick={removeNode}>
          ╳
        </button>
      </div>

      <Handle type="source" position="top" />
    </div>
  );
}
