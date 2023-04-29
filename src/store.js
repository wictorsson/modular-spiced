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
    {
      type: "audioOut",
      id: "output_id",
      data: { label: "output" },
      position: { x: 350, y: 40 },
      deletable: false,
    },
  ],
  edges: [],
  lampIndex: 0, // initial value
  isButtonClicked: false,
  toggleButton: () =>
    set((state) => ({ isButtonClicked: !state.isButtonClicked })),

  // TEMPLATE MODULES
  createNode(type) {
    const id = nanoid();
    // Position new nodes randomly so they dont hide each other
    const randomYpos = Math.floor(Math.random() * 250) + 200;
    const randomXpos = Math.floor(Math.random() * 400) + 30;
    let data, position;
    switch (type) {
      case "osc": {
        data = { frequency: 440, type: "sawtooth", inputConnected: false };
        position = { x: randomXpos, y: randomYpos };
        break;
      }
      case "gain": {
        data = { gain: 1, inputConnected: false };
        position = { x: randomXpos, y: randomYpos };
        break;
      }
      case "filter": {
        data = { frequency: 1200, type: "lowpass", rolloff: -48, Q: 1 };
        position = { x: randomXpos, y: randomYpos };
        break;
      }

      case "sequence": {
        data = { bpm: 120, row1: new Array(16).fill(0) };
        position = { x: randomXpos, y: randomYpos };
        break;
      }
      case "lfo": {
        data = { frequency: "4n", min: 10, max: 20000 };
        position = { x: randomXpos, y: randomYpos };
        break;
      }
      case "reverb": {
        data = { roomSize: 1000, dampening: 20000 };
        position = { x: randomXpos, y: randomYpos };
        break;
      }
    }
    // Prevent multiple sequences
    const sequenceNode = get().nodes.find((node) => node.type === "sequence");
    if (!sequenceNode || type !== "sequence") {
      set({ nodes: [...get().nodes, { type, id, data, position }] });
      // CReate node send function here to update bool
      createAudioNode(id, type, data, get().toggleButton);
    }
  },

  //Parameters changed - updateNode(id, { type: "sine" }
  updateNode(id, data) {
    //  console.log(data);

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
      //const sourceNode = get().nodes.find((node) => node.id === edge.source);
      // Needed to not remove twice the same connection!

      if (edges.length < 2) {
        removeAudioEdge(edge.source, edge.target);
      }
      const targetNode = get().nodes.find((node) => node.id === edge.target);
      targetNode.data.inputConnected = false;
    });
  },

  addEdge(data) {
    const targetNode = get().nodes.find((node) => node.id === data.target);
    const sourceNode = get().nodes.find((node) => node.id === data.source);

    console.log(data);
    if (data.sourceHandle === data.targetHandle) {
      if (!targetNode.data.inputConnected || targetNode.type === "audioOut") {
        if (sourceNode.type !== "sequence") {
          addAudioEdge(data.source, data.target);
        }
        //Nano ID generates random six digit ID
        const id = nanoid(6);
        const edge = { id, ...data };

        set({ edges: [edge, ...get().edges] });
      }
    }
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
