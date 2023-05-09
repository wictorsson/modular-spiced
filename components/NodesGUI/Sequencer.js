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
  const { lampIndex } = useStore();

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
      <h3>Sequencer</h3>
      <h3>{lampIndex}</h3>
      <span>Kick Pitch</span>

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
      <span>Kick Length</span>

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
        {data.row1.map((lamp, index) => (
          <div
            key={index}
            className="lamp"
            style={{ backgroundColor: index === lampIndex ? "red" : "grey" }}
          />
        ))}
      </div>

      {/* <div className="sequenceNodeContainer">
          {data.row1.map((slider, index) => (
            <input
              key={index}
              orient="vertical"
              // id={`slider-${index}`}
              className="nodrag"
              type="range"
              min="0"
              max="100"
              //value={data.row1[index]}
              readOnly
              value={index === lampIndex ? "100" : "0"}
              //onChange={(e) => handleSliderChange(e, index)}
            />
          ))}{" "}
        </div> */}
      <div className="sequenceNodeContainer">
        {data.row1.map((slider, index) => (
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
