import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../../src/store";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  setKickFrequency: (e) => {
    store.updateNode(id, { frequency: e.target.value });
  },
  setKickLength: (e) => {
    store.updateNode(id, { kickLength: e.target.value });
  },
  setBeatArray: (e, updatedRowArray) => {
    store.updateNode(id, { row1: updatedRowArray });
  },
  setBPM: (e) => store.updateNode(id, { bpm: e.target.value }),
});

export default function Sequencer({ id, data }) {
  const { setBeatArray, setBPM, setKickFrequency, setKickLength } = useStore(
    selector(id),
    shallow
  );

  //Set in component, it is now global!
  const { lampIndex } = useStore();
  //console.log(lampIndex);
  const handleSliderChange = (e, index) => {
    // Add new array here and update with zustand
    let updatedRowArray = [...data.row1];

    updatedRowArray[index] = e.target.value;

    setBeatArray(index, updatedRowArray);
  };

  return (
    <div className="nodeContainer">
      {/* <button onClick={toggleButton}>
          {isButtonClicked ? "Clicked" : "Not clicked"}
        </button> */}
      <h3>Kick Seq</h3>

      <span>Pitch</span>

      <input
        id="slider"
        className="nodrag"
        type="range"
        min="0"
        max="100"
        value={data.frequency}
        onChange={setKickFrequency}
      />
      <span>{data.kickFrequency} </span>
      <span>Decay</span>

      <input
        id="slider"
        className="nodrag"
        type="range"
        min="0.1"
        max="0.5"
        step="0.001"
        value={data.kickLength}
        onChange={setKickLength}
      />

      <h3>{lampIndex}</h3>
      <div className="sequenceNodeContainer">
        {data.row1.map((lamp, index) => (
          <div
            key={index}
            className="lamp"
            style={{ backgroundColor: index === lampIndex ? "red" : "grey" }}
          />
        ))}
      </div>
      <div className="sequenceNodeContainer">
        {data.row1.map((slider, index) => (
          <React.Fragment key={index}>
            <input
              orient="vertical"
              className="nodrag"
              type="range"
              min="0"
              max="100"
              value={data.row1[index]}
              onChange={(e) => handleSliderChange(e, index)}
            />
            {(index + 1) % 4 === 0 && index !== data.row1.length - 1 && (
              <div className="verticalLine">|</div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* <Handle type="target" position="bottom" /> */}
      <Handle type="source" position="top" />
    </div>
  );
}
