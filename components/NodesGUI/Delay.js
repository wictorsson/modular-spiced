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
  removeNode: (e) => {
    store.onNodesChange([{ type: "remove", id: id, clickDelete: true }]);
  },
});

export default function Delay({ id, data }) {
  const { setTime, setFeedback, setWet, removeNode } = useStore(
    selector(id),
    shallow
  );
  const typeName = id + "_typeDelay";
  return (
    <div>
      <div className="nodeContainer-fx">
        <h3>Delay</h3>
        <div className="nodeContainer-fx">
          <h3>Time</h3>

          <div>
            <input
              type="radio"
              id="2n"
              name={typeName}
              value="2n"
              onChange={setTime}
              checked={data.delayTime === "2n"}
            />
            <label htmlFor="2n"></label>
          </div>
          <div>
            <input
              type="radio"
              id="4n"
              name={typeName}
              value="4n"
              onChange={setTime}
              checked={data.delayTime === "4n"}
            />
            <label htmlFor="4n"></label>
          </div>
          <div>
            <input
              type="radio"
              id="8n"
              name={typeName}
              value="8n"
              onChange={setTime}
              checked={data.delayTime === "8n"}
            />
            <label htmlFor="8n"></label>
          </div>
          <div>
            <input
              type="radio"
              id="8n."
              name={typeName}
              value="8n."
              onChange={setTime}
              checked={data.delayTime === "8n."}
            />
            <label htmlFor="8n."></label>
          </div>
          <div>
            <input
              type="radio"
              id="16n"
              name={typeName}
              value="16n"
              onChange={setTime}
              checked={data.delayTime === "16n"}
            />
            <label htmlFor="16n"></label>
          </div>
        </div>
        <br></br>
        <span>Feedback</span>
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
        <span>Wet</span>
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
        <button type="button" className="CloseButton" onClick={removeNode}>
          ╳
        </button>
      </div>

      <Handle type="target" position="bottom" />
      <Handle type="source" position="top" />
      {/* <Handle type="target" position="right" id="paramFrequency" /> */}
    </div>
  );
}
