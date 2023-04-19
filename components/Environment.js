import React, { useCallback, useState, useRef } from "react";

import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  updateEdge,
  onEdgeUpdateEnd,
} from "reactflow";
import "reactflow/dist/style.css";

import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./initial-elements";

const proOptions = { hideAttribution: true };
// WARNING TODO - use useEffect,
import Oscillator from "./Oscillator";

// USE this as sound source for user story 1
var soundSource;

// const rfStyle = {
//   backgroundColor: "grey",
// };

//NO need for init yet, maybe implement later???
// const onInit = (reactFlowInstance) =>
//   console.log("flow loaded:", reactFlowInstance);

const OverviewFlow = () => {
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // UPDATE handlers to be able to redrag the edge to new nodes and to delete by dropp
  const onEdgeUpdateStart = useCallback(() => {
    if (soundSource) {
      soundSource.stop();
    }
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      console.log("UPDATED CONNECTION");
      edgeUpdateSuccessful.current = true;
      // soundSource.volume.value = -60;
      if (soundSource) {
        soundSource.start();
      }
      setEdges((els) => updateEdge(oldEdge, newConnection, els));
    },
    [setEdges]
  );

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const onConnect = useCallback(
    (params) => {
      console.log("NEW CONNECTION");

      // TODO - Call path component and send params- in path component update connections
      soundSource = Oscillator(400);
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

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
        <Background color="grey" gap={50} variant={"dots"} />
      </ReactFlow>
    </div>
  );
};

export default OverviewFlow;
