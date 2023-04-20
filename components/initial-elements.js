import React from "react";
import { MarkerType } from "reactflow";

// Default nodes when starting the app, these will be allocated dynamically later
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
      width: 100,
      height: 50,
      background: "#FFFFFF119",
      color: "#333",
    },
    info: "THIS IS NODE1",
  },
  {
    id: "2",
    type: "output",
    data: {
      label: (
        <>
          <strong>SOUND SOURCE</strong>
        </>
      ),
    },
    position: { x: 250, y: 200 },
    style: {
      width: 100,
      height: 50,
      background: "#FFFFFF119",
      color: "#333",
    },
  },
  //   {
  //     id: "3",
  //     type: "output",
  //     data: {
  //       label: (
  //         <>
  //           <strong>SOURCE 2</strong>
  //         </>
  //       ),
  //     },
  //     position: { x: 450, y: 100 },
  //     style: {
  //       width: 100,
  //       height: 100,
  //       background: "#FFFFFF90",
  //       color: "#333",
  //       border: "1px solid cyan",
  //     },
  //   },
  ,
];

//TODO - IMPLEMENT custom edgdes here
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
];
