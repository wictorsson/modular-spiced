import React, { useCallback, useState } from "react";
import * as Tone from "tone";

import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  updateEdge,
} from "reactflow";
import "reactflow/dist/style.css";

import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./initial-elements";

const proOptions = { hideAttribution: true };
import Oscillator from "./Oscillator";
// const rfStyle = {
//   backgroundColor: "grey",
// };

// const onInit = (reactFlowInstance) =>
//   console.log("flow loaded:", reactFlowInstance);

const OverviewFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [osc, setOsc] = useState();

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      console.log("UPDATED CONNECTION");
      setEdges((els) => updateEdge(oldEdge, newConnection, els));
    },
    [setEdges]
  );
  const onConnect = useCallback(
    (params) => {
      console.log("NEW CONNECTION");

      // Call path component and send params- in path component update connections
      Oscillator(400);
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
        onEdgeUpdate={onEdgeUpdate}
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
