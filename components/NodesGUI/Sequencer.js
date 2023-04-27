import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../../src/store";
import { shallow } from "zustand/shallow";

// const selector = (id) => (store) => ({
//   setGain: (e) => store.updateNode(id, { gain: e.target.value }),
// });

export default function Sequencer({ id, data }) {
  //   const { setGain } = useStore(selector(id), shallow);

  return (
    <div>
      <div className="nodeContainer">
        <h3>Sequencer</h3>
        <div>
          <input type="checkbox"></input>
          <input type="checkbox"></input>
          <input type="checkbox"></input>
          <input type="checkbox"></input>
          <input type="checkbox"></input>
          <input type="checkbox"></input>
          <input type="checkbox"></input>
          <input type="checkbox"></input>
        </div>
        <div>
          <input type="checkbox"></input>
          <input type="checkbox"></input>
          <input type="checkbox"></input>
          <input type="checkbox"></input>
          <input type="checkbox"></input>
          <input type="checkbox"></input>
          <input type="checkbox"></input>
          <input type="checkbox"></input>
        </div>
        <div>
          <input type="checkbox"></input>
          <input type="checkbox"></input>
          <input type="checkbox"></input>
          <input type="checkbox"></input>
          <input type="checkbox"></input>
          <input type="checkbox"></input>
          <input type="checkbox"></input>
          <input type="checkbox"></input>
        </div>
      </div>

      {/* <Handle type="target" position="bottom" /> */}
      <Handle type="source" position="top" />
      <Handle type="source" position="top" />
      <Handle type="source" position="top" />
    </div>
  );
}
