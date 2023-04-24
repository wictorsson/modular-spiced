import { applyNodeChanges, applyEdgeChanges } from "reactflow";
import { nanoid } from "nanoid";
import { create } from "zustand";

import {
  updateAudioNode,
  removeAudioNode,
  connect,
  disconnect,
  isRunning,
  toggleAudio,
} from "./Audio";

//Store is a hook! can include anything - primitives, objects, functions...
export const useStore = create((set, get) => ({
  nodes: [
    {
      type: "osc",
      id: "a",
      data: { frequency: 220, type: "square" },
      position: { x: 100, y: 200 },
    },

    {
      type: "gain",
      id: "b",
      data: { gain: -6 },
      position: { x: 150, y: 50 },
    },
    {
      type: "audioOut",
      id: "c",
      data: { label: "output" },
      position: { x: 150, y: -40 },
    },
    // { id: "c", data: { label: "output" }, position: { x: 50, y: 100 } },
  ],
  edges: [],

  //Parameters changed - updateNode(id, { type: "sine" }
  updateNode(id, data) {
    updateAudioNode(id, data);
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },

  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  addEdge(data) {
    connect(data.source, data.target);
    //Nano ID generates random six digit ID
    const id = nanoid(6);
    const edge = { id, ...data };

    set({ edges: [edge, ...get().edges] });
  },

  isRunning: isRunning(),

  toggleAudio() {
    toggleAudio().then(() => {
      set({ isRunning: isRunning() });
    });
  },
}));
