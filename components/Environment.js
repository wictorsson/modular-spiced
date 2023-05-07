import React from "react";
import ReactFlow, { Background, Panel, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { shallow } from "zustand/shallow";
import { useStore } from "../src/store";
import Osc from "./NodesGUI/Osc";
import Filter from "./NodesGUI/Filter";
import Sequence from "./NodesGUI/Sequencer";
import Gain from "./NodesGUI/Gain";
import Lfo from "./NodesGUI/Lfo";
import Reverb from "./NodesGUI/Reverb";
import Noise from "./NodesGUI/Noise";
import AudioOutToggle from "./NodesGUI/Output";
import { useState } from "react";
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
  createNode: store.createNode,
});

//Create nodetype object, should be defined outside of app component
const nodeTypes = {
  osc: Osc,
  filter: Filter,
  gain: Gain,
  audioOut: AudioOutToggle,
  sequence: Sequence,
  lfo: Lfo,
  reverb: Reverb,
  noise: Noise,
};

const proOptions = { hideAttribution: true };

// console.log("flow loaded:", reactFlowInstance);

function Environment() {
  const store = useStore(selector, shallow);
  const [panelClass, setPanelClass] = useState("flowPanel");
  const [panelBool, setPanelBool] = useState(true);

  return (
    <div style={{ height: 680 }}>
      <ReactFlow
        onEdgesDelete={store.onEdgesDelete}
        onNodesDelete={store.onNodesDelete}
        nodes={store.nodes}
        nodeTypes={nodeTypes}
        edges={store.edges}
        onNodesChange={store.onNodesChange}
        onEdgesChange={store.onEdgesChange}
        onConnect={store.addEdge}
        //fitView
        proOptions={proOptions}
        className="touchdevice-flow"
      >
        <Panel position="left" className={panelClass}>
          {/* button load patch() */}

          <div className="flowPanel-panelModules">
            <button onClick={() => store.createNode("osc")}>Osc</button>
            <button onClick={() => store.createNode("noise")}>Noise</button>
            <hr></hr>
            <button onClick={() => store.createNode("gain")}>Gain</button>
            <button onClick={() => store.createNode("reverb")}>Reverb</button>
            <button onClick={() => store.createNode("filter")}>Filter</button>
            <hr></hr>
            <button onClick={() => store.createNode("lfo")}>(LFO)</button>
            <button onClick={() => store.createNode("sequence")}>
              (Sequencer)
            </button>
          </div>
          <button
            className="flowPanel-closeButton"
            onClick={() => {
              panelBool === true
                ? setPanelClass("flowPanel-after")
                : setPanelClass("flowPanel");
              setPanelBool(!panelBool);
            }}
          >
            ◀️
          </button>
        </Panel>

        <Background variant="dots" gap="80" color="cyan" />
        <Controls showZoom={false} showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

export default Environment;
