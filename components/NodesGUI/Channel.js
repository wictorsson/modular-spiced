import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../../src/store";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  setVolume: (e) => {
    store.updateNode(id, { volume: e.target.value });
  },
  setPan: (e) => {
    store.updateNode(id, { pan: e.target.value });
  },
  setSolo: (e) => {
    store.updateNode(id, { solo: e.target.checked });
  },
  setMute: (e) => {
    store.updateNode(id, { mute: e.target.checked });
  },
  removeNode: (e) => {
    store.onNodesChange([{ type: "remove", id: id }]);
  },
  removeNode: (e) => {
    store.onNodesChange([{ type: "remove", id: id, clickDelete: true }]);
  },
});

export default function Channel({ id, data }) {
  const { setVolume, setPan, setSolo, setMute, removeNode } = useStore(
    selector(id),
    shallow
  );
  const typeName = id + "_type";
  return (
    <div>
      <div className="nodeContainer">
        <h3>Gain</h3>

        <input
          className="nodrag"
          type="range"
          min="-90"
          max="6"
          step="0.1"
          value={data.volume}
          onChange={setVolume}
        />
        <span>{data.volume} dB</span>

        <h3>Pan</h3>

        <input
          className="nodrag"
          type="range"
          min="-1"
          max="1"
          step="0.01"
          value={data.pan}
          onChange={setPan}
        />
        <span>{data.pan} </span>

        <input
          type="checkbox"
          id={typeName + "solo"}
          name={typeName + "solo"}
          checked={Boolean(data.solo)}
          onChange={setSolo}
        />
        <label htmlFor="checkbox">Solo</label>

        <input
          type="checkbox"
          id={typeName + "mute"}
          name={typeName + "mute"}
          checked={Boolean(data.mute)}
          onChange={setMute}
        />
        <label htmlFor="checkbox">Mute</label>
        <button type="button" className="CloseButton" onClick={removeNode}>
          ╳
        </button>
      </div>

      <Handle type="target" position="bottom" />
      <Handle type="source" position="top" />
      <Handle type="target" position="right" id="paramGain" />
    </div>
  );
}
