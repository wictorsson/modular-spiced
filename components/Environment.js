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
import LfoSynced from "./NodesGUI/LfoSynced";
import Reverb from "./NodesGUI/Reverb";
import Distortion from "./NodesGUI/Distortion";
import Delay from "./NodesGUI/Delay";
import Noise from "./NodesGUI/Noise";
import Channel from "./NodesGUI/Channel";
import AudioOutToggle from "./NodesGUI/Output";
import Membsynth from "./NodesGUI/Membsynth";
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
  updateEdge: store.updateEdge,
});

//Create nodetype object, should be defined outside of app component
const nodeTypes = {
  osc: Osc,
  filter: Filter,
  gain: Gain,
  audioOut: AudioOutToggle,
  sequence: Sequence,
  lfo: Lfo,
  lfosynced: LfoSynced,
  reverb: Reverb,
  noise: Noise,
  membsynth: Membsynth,
  channel: Channel,
  distortion: Distortion,
  delay: Delay,
};

const proOptions = { hideAttribution: true };

// console.log("flow loaded:", reactFlowInstance);

function Environment() {
  const store = useStore(selector, shallow);
  const [panelClass, setPanelClass] = useState("flowPanel");
  const [panelBool, setPanelBool] = useState(true);
  const [closeIcon, setCloseIcon] = useState("╳");

  // const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
  //   store.updateEdge(oldEdge, newConnection); // call the updateEdge action from the store
  // }, []);

  return (
    <div style={{ height: 660 }}>
      <ReactFlow
        onEdgesDelete={store.onEdgesDelete}
        onNodesDelete={store.onNodesDelete}
        nodes={store.nodes}
        nodeTypes={nodeTypes}
        edges={store.edges}
        onNodesChange={store.onNodesChange}
        onEdgesChange={store.onEdgesChange}
        onConnect={store.addEdge}
        onEdgeUpdate={store.onEdgeUpdate}
        //fitView
        proOptions={proOptions}
        className="touchdevice-flow"
      >
        <Panel position="left" className={panelClass}>
          {/* button load patch() */}

          <div className="flowPanel-panelModules">
            <button onClick={() => store.createNode("channel")}>Channel</button>

            <button onClick={() => store.createNode("osc")}>Osc</button>
            <button onClick={() => store.createNode("noise")}>Noise</button>
            <button onClick={() => store.createNode("sequence")}>
              Kick Seq
            </button>
            {/* <hr></hr> */}

            <button onClick={() => store.createNode("lfo")}>LFO</button>
            <button onClick={() => store.createNode("lfosynced")}>
              LFO sync
            </button>
            <button onClick={() => store.createNode("filter")}>Filter</button>
            <button onClick={() => store.createNode("gain")}>Gain</button>
            <button onClick={() => store.createNode("delay")}>Delay</button>
            <button onClick={() => store.createNode("reverb")}>Reverb</button>
            <button onClick={() => store.createNode("distortion")}>
              Distortion
            </button>

            {/* <hr></hr> */}

            {/* <button onClick={() => store.createNode("membsynth")}>
              Kick Synth
            </button> */}
          </div>
          <button
            className="flowPanel-closeButton"
            onClick={() => {
              panelBool
                ? setPanelClass("flowPanel-hidden")
                : setPanelClass("flowPanel");
              setPanelBool(!panelBool);
              setCloseIcon(closeIcon === "╳" ? "↱" : "╳");
            }}
          >
            {closeIcon}
          </button>
        </Panel>

        <Background variant="dots" gap="80" color="cyan" />
        <Controls showZoom={false} showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

export default Environment;
