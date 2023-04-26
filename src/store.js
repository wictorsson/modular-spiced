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

    {
      type: "audioOut",
      id: "output_id",
      data: { label: "output" },
      position: { x: 350, y: 40 },
      deletable: false,
    },
  ],
  edges: [],

  // TEMPLATE MODULES
  createNode(type) {
    const id = nanoid();
    // Position new nodes randomly so they dont hide each other
    const randomYpos = Math.floor(Math.random() * 250) + 200;
    const randomXpos = Math.floor(Math.random() * 200) + 50;
    let data, position;
    switch (type) {
      case "osc": {
        data = { frequency: 440, type: "sawtooth" };
        position = { x: randomXpos, y: randomYpos };
        break;
      }
      case "gain": {
        data = { gain: -6, inputConnected: false };
        position = { x: randomXpos, y: randomYpos };
        break;
      }
      case "filter": {
        data = { frequency: 1200, type: "lowpass" };
        position = { x: randomXpos, y: randomYpos };
        break;
      }
    }
    set({ nodes: [...get().nodes, { type, id, data, position }] });
    createAudioNode(id, type, data);
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
    //console.log({ edges });
    //const targetNode = get().nodes.find((node) => node.id === data.target);
    edges.forEach((edge) => {
      removeAudioEdge(edge.source, edge.target);
      // console.log(edge.target);
      const targetNode = get().nodes.find((node) => node.id === edge.target);
      targetNode.data.inputConnected = false;
    });
  },

  addEdge(data) {
    const targetNode = get().nodes.find((node) => node.id === data.target);

    console.log(targetNode.type);
    if (!targetNode.data.inputConnected || targetNode.type === "audioOut") {
      targetNode.data.inputConnected = true;
      addAudioEdge(data.source, data.target);
      //Nano ID generates random six digit ID
      const id = nanoid(6);
      const edge = { id, ...data };
      console.log(targetNode.data.inputConnected);
      set({ edges: [edge, ...get().edges] });
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
