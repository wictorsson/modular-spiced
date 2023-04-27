import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../../src/store";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  setBeatArray: (e, updatedRowArray) => {
    store.updateNode(id, { row1: updatedRowArray });
  },
});

export default function Sequencer({ id, data }) {
  const { setBeatArray } = useStore(selector(id), shallow);

  const handleCheckboxChange = (e, index) => {
    // Add new array here and update with zustand
    let updatedRowArray = [...data.row1];
    updatedRowArray[index] = e.target.checked;
    setBeatArray(index, updatedRowArray);
  };

  return (
    <div>
      <div className="nodeContainer">
        <h3>Sequencer</h3>
        <div>
          {data.row1.map((isChecked, index) => (
            <input
              key={index}
              type="checkbox"
              checked={isChecked}
              onChange={(e) => handleCheckboxChange(e, index)}
            />
          ))}
        </div>
      </div>

      {/* <Handle type="target" position="bottom" /> */}
      <Handle type="source" position="top" />
      <Handle type="source" position="top" />
      <Handle type="source" position="top" />
    </div>
  );
}
