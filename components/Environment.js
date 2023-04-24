import React from "react";
import ReactFlow, { Background } from "reactflow";
import "reactflow/dist/style.css";
import { shallow } from "zustand/shallow";
import { useStore } from "../src/store";
import Osc from "../components/Osc";
import Amp from "./Gain";
import AudioOutToggle from "./Output";

// THE viewport of the app, the nodes will go into separate components
// Nodes are the draggable components, edges are the draggable virtual cables between nodes
//TODO - send node chain to audio chain. Remove soundSource here
const selector = (store) => ({
  onEdgesDelete: store.removeEdges,
  onNodesDelete: store.removeNodes,
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
});

//Create nodetype object, should be defined outside of app component
const nodeTypes = {
  osc: Osc,
  amp: Amp,
  audioOut: AudioOutToggle,
};

const proOptions = { hideAttribution: true };

// console.log("flow loaded:", reactFlowInstance);

function Environment() {
  const store = useStore(selector, shallow);

  return (
    <div style={{ height: 650 }}>
      <ReactFlow
        onEdgesDelete={store.onEdgesDelete}
        onNodesDelete={store.onNodesDelete}
        nodes={store.nodes}
        nodeTypes={nodeTypes}
        edges={store.edges}
        onNodesChange={store.onNodesChange}
        onEdgesChange={store.onEdgesChange}
        onConnect={store.addEdge}
        fitView
        proOptions={proOptions}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}

export default Environment;
