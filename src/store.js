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
      data: { bpm: 120, label: "output" },
      position: { x: 350, y: 40 },
      deletable: false,
    },
  ],

  edges: [],
  lampIndex: 0, // initial value

  setLampIndex: (beatIndex) => set({ lampIndex: beatIndex }),
  isPatchListClicked: false,
  togglePatchList: () =>
    set((state) => ({ isPatchListClicked: !state.isPatchListClicked })),
  isSaveAsClicked: false,
  toggleSaveAs: () =>
    set((state) => ({ isSaveAsClicked: !state.isSaveAsClicked })),

  offSetPos: 0,
  setoffSetPos: () =>
    set((state) => ({ isSaveAsClicked: !state.isSaveAsClicked })),

  // TEMPLATE MODULES
  createNode(type) {
    const id = nanoid();

    let randomYpos = 400;
    const randomXpos =
      10 + get().offSetPos + Math.floor(Math.random() * 30) + 20;
    if (get().offSetPos > 600) {
      set({ offSetPos: 0 });
    }
    set({ offSetPos: get().offSetPos + 200 });
    let data, position;
    switch (type) {
      case "osc": {
        data = { frequency: 440, type: "sawtooth", inputConnected: false };
        position = { x: randomXpos, y: randomYpos };
        break;
      }
      case "gain": {
        randomYpos = 200;
        data = { gain: 1, inputConnected: false, TypeName: "decibels" };
        position = { x: randomXpos, y: randomYpos };
        break;
      }
      case "filter": {
        randomYpos = 300;
        data = { frequency: 400, type: "lowpass", rolloff: -48, Q: 1 };
        position = { x: randomXpos, y: randomYpos };
        break;
      }

      case "sequence": {
        data = {
          bpm: 120,
          row1: new Array(16).fill(0),
          frequency: 20,
          kickLength: 0.1,
        };
        position = { x: randomXpos, y: randomYpos };
        break;
      }
      case "lfo": {
        data = {
          frequency: 6,
          min: -1,
          max: 1,
          type: "sine",
        };
        position = { x: randomXpos, y: randomYpos };
        break;
      }
      case "lfosynced": {
        data = {
          frequency: "4n",
          min: -1,
          max: 1,
          type: "sine",
        };
        position = { x: randomXpos, y: randomYpos };
        break;
      }
      case "reverb": {
        data = { roomSize: 1000, dampening: 20000 };
        position = { x: randomXpos, y: randomYpos };
        break;
      }
      case "noise": {
        data = { type: "pink" };
        position = { x: randomXpos, y: randomYpos };
        break;
      }
      case "channel": {
        randomYpos = 200;
        data = { volume: 0, pan: 0, solo: false, mute: false };
        position = { x: randomXpos, y: randomYpos };
        break;
      }
      case "distortion": {
        data = { distortion: 0 };
        position = { x: randomXpos, y: randomYpos };
        break;
      }
      case "delay": {
        data = { delayTime: "4n", feeback: 0.5, wet: 0.5 };
        position = { x: randomXpos, y: randomYpos };
        break;
      }
    }
    // Prevent multiple sequences
    const sequenceNode = get().nodes.find((node) => node.type === "sequence");

    if (type !== "sequence") {
      set({ nodes: [...get().nodes, { type, id, data, position }] });

      // CReate node send function here to update bool
      createAudioNode(id, type, data, get().setLampIndex);
    } else {
      if (!sequenceNode) {
        set({ nodes: [...get().nodes, { type, id, data, position }] });

        // CReate node send function here to update bool
        createAudioNode(id, type, data, get().setLampIndex);
      }
    }
  },

  //Parameters changed -
  updateNode(id, data) {
    updateAudioNode(id, data);
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },

  onNodesChange(changes) {
    if (changes[0].clickDelete) {
      removeAudioNode(changes[0].id);
    }
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
      // Avoid removing twice the same connection!

      const targetNode = get().nodes.find((node) => node.id === edge.target);
      const sourceNode = get().nodes.find((node) => node.id === edge.source);

      if (edges.length < 2) {
        removeAudioEdge(edge.source, edge.target, edge.targetHandle);
      }

      if (targetNode) {
        targetNode.data.inputConnected = false;
      }

      // REMOVE????
      // if (sourceNode.type === "lfo") {
      //   const isLfoSet = !get().isLfoSet;
      //   set({ isLfoSet });
      // }
    });
  },

  addEdge(data) {
    const targetNode = get().nodes.find((node) => node.id === data.target);
    const sourceNode = get().nodes.find((node) => node.id === data.source);
    // Check if connection is parameter connection
    let twoParamHandles = false;

    if (data.sourceHandle && data.targetHandle)
      if (data.sourceHandle[0] === "p" && data.targetHandle[0] === "p") {
        twoParamHandles = true;
      }

    if (data.sourceHandle === data.targetHandle || twoParamHandles) {
      //Check if it is a parameter connection. Handle is set to null if non paprameter
      if (!targetNode.data.inputConnected || targetNode.type === "audioOut") {
        //

        addAudioEdge(data.source, data.target, data.targetHandle);

        //Nano ID generates random six digit ID

        const id = nanoid(6);
        // const edge = { id, ...data };
        const edge = { id, ...data, updateable: "source" }; // set updateable property to "target"
        const edges = [edge, ...get().edges];
        console.log(edge);
        set({ edges });
      }
    }
  },

  updateEdge: (oldEdge, newConnection) => {
    const { edges } = get();
    const newEdges = edges.map((edge) => {
      if (edge.id === oldEdge.id) {
        return {
          ...edge,
          ...newConnection,
        };
      }
      return edge;
    });
    set({ edges: newEdges });
  },

  // on connect function
  onConnect: (params) => {
    const { source, target } = params;
    const newEdge = {
      id: `${source}-${target}`,
      source,
      target,
    };
    set({ edges: [...get().edges, newEdge] });
    addAudioEdge(newEdge);
  },

  //********************** db **********************

  readPatch(patch) {
    // TODO - CLEAR ALL AUDIO
    //deleteAllSoundNodes();

    get().nodes.forEach((node) => {
      if (node.id !== "output_id") removeAudioNode(node.id);
    });
    // TODO also add toDestination module
    // Extract the `nodes` array from the `patch` object or default to an empty array
    const { nodes = [] } = patch;
    const { edges = [] } = patch;

    //Update the `nodes` state with the extracted array
    set({ nodes: [...nodes] });
    nodes.forEach(({ id, type, data }) => {
      createAudioNode(id, type, data, get().setLampIndex);
    });

    set({ edges: [...edges] });
    edges.forEach(({ source, target }) => {
      addAudioEdge(source, target);
    });
  },
  currentPatch: "untitled",
  setCurrentPatch: (patch) => set({ currentPatch: patch }),

  currentPatchName: "Untitled Project",
  setCurrentPatchName: (patch) => set({ currentPatchName: patch }),
  //****************************************************/
  // AUDIO TOGGLE temp

  isRunning: isRunning(),

  toggleAudio() {
    toggleAudio().then(() => {
      set({ isRunning: isRunning() });
    });
  },
}));
