import React from "react";
import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../src/store";

const selector = (store) => ({
  isRunning: store.isRunning,
  toggleAudio: store.toggleAudio,
});

export default function AudioOut({ id, data }) {
  const { isRunning, toggleAudio } = useStore(selector, shallow);

  return (
    <div>
      <Handle type="target" position="bottom" />
      <div>Output</div>
      <button onClick={toggleAudio}>
        {isRunning ? <div>Unmuted</div> : <div>Muted</div>}
      </button>
    </div>
  );
}
