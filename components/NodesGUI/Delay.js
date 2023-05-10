import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../../src/store";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  setTime: (e) => {
    store.updateNode(id, { delayTime: e.target.value });
  },
  setFeedback: (e) => {
    store.updateNode(id, { feedback: e.target.value });
  },
  setWet: (e) => {
    store.updateNode(id, { wet: e.target.value });
  },
});

export default function Delay({ id, data }) {
  const { setTime, setFeedback, setWet } = useStore(selector(id), shallow);

  return (
    <div>
      <div className="nodeContainer">
        {/* <h3>Time</h3>

        <input
          className="nodrag"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={data.delayTime}
          onChange={setTime}
        /> */}
        {/* <span>{data.gain}dB</span> */}
        <h3>Feedback</h3>

        <input
          className="nodrag"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={data.feedback}
          onChange={setFeedback}
        />
        {/* <span>{data.gain}dB</span> */}
        <h3>Wet</h3>

        <input
          className="nodrag"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={data.wet}
          onChange={setWet}
        />
        {/* <span>{data.gain}dB</span> */}
      </div>

      <Handle type="target" position="bottom" />
      <Handle type="source" position="top" />
      {/* <Handle type="target" position="right" id="paramFrequency" /> */}
    </div>
  );
}
