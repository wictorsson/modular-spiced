//Create audio
//const context = new AudioContext();
import React, { useState, useEffect } from "react";
import * as Tone from "tone";
//import OscAudio from "./OscAudio";
const nodes = new Map();

let osc;

//const osc = context.createOscillator();
//const osc = new Tone.Oscillator(440, "sine").toDestination().start();
// osc.frequency.value = 220;
// osc.type = "square";
// osc.start();

// const amp = context.createGain();
// amp.gain.value = 0.5;

// const out = context.destination;

//nodes.set("a", osc);
// nodes.set("b", amp);
// nodes.set("c", out);

// Update audio parameters
export function updateAudioNode(id, data) {
  const node = nodes.get(id);
  //console.log(node);
  //If statement might not be needed for tone.js - check value...
  for (const [key, val] of Object.entries(data)) {
    // if (node[key] instanceof AudioParam) {
    //   node[key].value = val;
    // } else {
    //   node[key] = val;
    // }
    // console.log(node[key]);
    node[key].value = val;
    console.log(node[key].value);
  }
}

// Return because of async...
export function isRunning() {
  //Check tone funciton for running
  return Tone.context.state === "running";
}

// TEMP function to be able to use audiocontext in next.js
export function toggleAudio() {
  if (Tone.context.state === "suspended") {
    const osc = new Tone.Oscillator(440, "sine").toDestination().start();
    nodes.set("a", osc);
  }
  console.log(Tone.context.state);
  return isRunning() ? Tone.start() : Tone.start();
}
