import React from "react";
import { MarkerType } from "reactflow";

export const nodes = [
  {
    id: "1",
    type: "input",
    data: {
      label: (
        <>
          <strong>AUDIO OUT</strong>
        </>
      ),
    },
    position: { x: 250, y: 0 },
    style: {
      width: 200,
      height: 40,
      background: "#FFFFFF119",
      color: "#333",
    },
  },
  {
    id: "2",
    type: "output",
    data: {
      label: (
        <>
          <strong>SOURCE</strong>
        </>
      ),
    },
    position: { x: 250, y: 100 },
    style: {
      width: 100,
      height: 100,
      background: "#FFFFFF90",
      color: "#333",
      border: "1px solid cyan",
    },
  },
  {
    id: "3",
    type: "output",
    data: {
      label: (
        <>
          <strong>SOURCE 2</strong>
        </>
      ),
    },
    position: { x: 450, y: 100 },
    style: {
      width: 100,
      height: 100,
      background: "#FFFFFF90",
      color: "#333",
      border: "1px solid cyan",
    },
  },
  //   {
  //     id: "4",
  //     position: { x: 250, y: 200 },
  //     data: {
  //       label: "Another default node",
  //     },
  //   },
  //   {
  //     id: "5",
  //     data: {
  //       label: "Node id: 5",
  //     },
  //     position: { x: 250, y: 325 },
  //   },
  //   {
  //     id: "6",
  //     type: "output",
  //     data: {
  //       label: (
  //         <>
  //           An <strong>output node</strong>
  //         </>
  //       ),
  //     },
  //     position: { x: 100, y: 480 },
  //   },
  //   {
  //     id: "7",
  //     type: "output",
  //     data: { label: "Another output node" },
  //     position: { x: 400, y: 450 },
  //   },
  ,
];

export const edges = [
  //   {
  //     id: "e1-2",
  //     source: "1",
  //     target: "2",
  //   },
  //   { id: "e1-3", source: "1", target: "3" },
  //   {
  //     id: "e3-4",
  //     source: "3",
  //     target: "4",
  //     animated: true,
  //     label: "animated edge",
  //   },
  //   {
  //     id: "e4-5",
  //     source: "4",
  //     target: "5",
  //     label: "edge with arrow head",
  //     markerEnd: {
  //       type: MarkerType.ArrowClosed,
  //     },
  //   },
  //   {
  //     id: "e5-6",
  //     source: "5",
  //     target: "6",
  //     type: "smoothstep",
  //     label: "smooth step edge",
  //   },
  //   {
  //     id: "e5-7",
  //     source: "5",
  //     target: "7",
  //     type: "step",
  //     style: { stroke: "#f6ab6c" },
  //     label: "a step edge",
  //     animated: true,
  //     labelStyle: { fill: "#f6ab6c", fontWeight: 700 },
  //   },
];
