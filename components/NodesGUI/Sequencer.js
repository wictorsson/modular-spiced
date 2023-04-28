import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../../src/store";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  setBeatArray: (e, updatedRowArray) => {
    store.updateNode(id, { row1: updatedRowArray });
  },
  setBPM: (e) => store.updateNode(id, { bpm: e.target.value }),
});

export default function Sequencer({ id, data }) {
  const { setBeatArray, setBPM } = useStore(selector(id), shallow);

  const handleSliderChange = (e, index) => {
    // Add new array here and update with zustand
    let updatedRowArray = [...data.row1];

    updatedRowArray[index] = e.target.value;

    setBeatArray(index, updatedRowArray);
  };

  return (
    <div>
      <div className="nodeContainer">
        <h3>Sequencer</h3>
        <div>
          <p>BPM</p>
          <input
            type="number"
            required
            min={30}
            max={250}
            value={data.bpm}
            onChange={setBPM}
          ></input>
        </div>
        <div className="sequenceNodeContainer">
          {data.row1.map((isChecked, index) => (
            <input
              key={index}
              orient="vertical"
              // id={`slider-${index}`}
              className="nodrag"
              type="range"
              min="0"
              max="100"
              value={data.row1[index]}
              onChange={(e) => handleSliderChange(e, index)}
            />
          ))}{" "}
        </div>
      </div>
      {/* <Handle type="target" position="bottom" /> */}
      <Handle type="source" position="top" />
    </div>
  );
}

{
  /* <div>
{data.row1.map((isChecked, index) => (
  <input
    key={index}
    type="checkbox"
    checked={isChecked}
    onChange={(e) => handleCheckboxChange(e, index)}
  />
))}
</div> */
}
