import React, { useCallback, useState, useRef } from "react";

// THE viewport of the app, the nodes will go into separate components
// Nodes are the draggable components, edges are the draggable virtual cables between nodes
//TODO - send node chain to audio chain. Remove soundSource here
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  updateEdge,
  onEdgeUpdateEnd,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./initial-elements";

const proOptions = { hideAttribution: true };
// WARNING TODO - use useEffect,
import Osc from "./Oscillator";

// USE this as sound source for user story 1
var soundSource;

var oscStarted = false;

// const rfStyle = {
//   backgroundColor: "grey",
// };

//NO need for init yet, check if needed later when creating audio context
//const onInit = (reactFlowInstance) =>
// console.log("flow loaded:", reactFlowInstance);

// Listen and update the node connections
const OverviewFlow = ({ audioStarted }) => {
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  // UPDATE handlers to be able to redrag the edge to new nodes and to delete by dropp
  const onEdgeUpdateStart = useCallback(() => {
    if (soundSource) {
      soundSource.stop();
      oscStarted = false;
    }

    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgesChange = useCallback(
    (changes) => {
      if (changes[0].type === "remove") {
        if (soundSource) {
          soundSource.stop();
          oscStarted = false;
        }
      }
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      console.log("UPDATED CONNECTION");
      edgeUpdateSuccessful.current = true;
      // soundSource.volume.value = -60;
      if (soundSource && audioStarted) {
        soundSource.start();
      }
      setEdges((els) => updateEdge(oldEdge, newConnection, els));
    },
    [setEdges]
  );

  // Delete edge if not connected to another node
  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const onConnect = useCallback((params) => {
    console.log("NEW CONNECTION");
    const nodeType = initialNodes.find((node) => node.id === params.target);
    console.log(nodeType);
    console.log("audiostarted", audioStarted);
    // TODO - Call path component and send params- in path component update connections
    if (audioStarted && !oscStarted) {
      soundSource = Osc(440);
      oscStarted = true;
      console.log(soundSource.state);
      setEdges((eds) => addEdge(params, eds));
    }
  }, []);

  return (
    <div style={{ height: 650 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        onConnect={onConnect}
        // onInit={onInit}
        fitView
        proOptions={proOptions}
      >
        <Controls showInteractive={false} showZoom={false} />
        <Background color="cyan" gap={50} variant={"dots"} />
      </ReactFlow>
    </div>
  );
};

export default OverviewFlow;
