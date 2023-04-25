import { applyNodeChanges, applyEdgeChanges } from "reactflow";
import { nanoid } from "nanoid";
import { create } from "zustand";

import {
  updateAudioNode,
  removeAudioNode,
  addAudioEdge,
  removeAudioEdge,
  isRunning,
  toggleAudio,
  createAudioNode,
} from "./Audio";

//Store is a hook! can include anything - primitives, objects, functions...
export const useStore = create((set, get) => ({
  nodes: [
    // {
    //   type: "osc",
    //   id: "a",
    //   data: { frequency: 220, type: "square" },
    //   position: { x: 220, y: 200 },
    // },

    // {
    //   type: "gain",
    //   id: "b",
    //   data: { gain: -6, numberInputs: 1 },
    //   position: { x: 150, y: 50 },
    // },
    {
      type: "audioOut",
      id: "c",
      data: { label: "output" },
      position: { x: 0, y: 0 },
    },

    // { id: "c", data: { label: "output" }, position: { x: 50, y: 100 } },
  ],
  edges: [],

  // TEMPLATE MODULES
  createNode(type) {
    const id = nanoid();

    switch (type) {
      case "osc": {
        const data = { frequency: 440, type: "sawtooth" };
        const position = { x: 0, y: 0 };
        console.log(id);

        set({ nodes: [...get().nodes, { type, id, data, position }] });
        // Call audio node here
        createAudioNode(id, type, data);

        break;
      }
      case "gain": {
        const data = { gain: -6, numberInputs: 1 };
        const position = { x: 0, y: 100 };
        console.log("created gain node");
        // Call audio node here
        break;
      }
    }
  },

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

  // Takes an array of nodes
  removeNodes(nodes) {
    nodes.forEach((node) => {
      removeAudioNode(node.id);
    });
  },

  removeEdges(edges) {
    edges.forEach((edge) => {
      removeAudioEdge(edge.source, edge.target);
    });
  },

  addEdge(data) {
    const targetNode = get().nodes.find((node) => node.id === data.target);

    // TODO - Check handles instead!
    if ("numberInputs" in targetNode.data) {
      console.log(targetNode.data.numberInputs);
    }
    addAudioEdge(data.source, data.target);
    //Nano ID generates random six digit ID
    const id = nanoid(6);
    const edge = { id, ...data };

    set({ edges: [edge, ...get().edges] });
  },

  //****************************************************/
  // AUDIO TOGGLE

  isRunning: isRunning(),

  toggleAudio() {
    toggleAudio().then(() => {
      set({ isRunning: isRunning() });
    });
  },
}));
