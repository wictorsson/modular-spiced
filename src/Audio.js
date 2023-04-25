//Create audio, no rendering is happening from this file!
// Thread safe, (audio should not know about GUI)

import * as Tone from "tone";

// Initiate empty object to hold audio connections
const audioNodes = {};

// Connect audio components
export function addAudioEdge(sourceId, targetId) {
  const audioNodeSource = audioNodes[sourceId];
  const audioNodeTarget = audioNodes[targetId];
  audioNodeSource.connect(audioNodeTarget);
}

// Update audio parameters
export function updateAudioNode(id, data) {
  const audioNode = audioNodes[id];
  //Check in case of error - instanceof AudioParam...
  Object.entries(data).forEach(([key, val]) => {
    audioNode[key].value = val;
    console.log(audioNode[key].value);
  });
}

export function removeAudioNode(id) {
  const audioNode = audioNodes[id];
  audioNode.disconnect();
  // audioNode.stop?.();
  // Dispose - free garbage collection
  audioNode.dispose();
}

export function removeAudioEdge(sourceId, targetId) {
  const audioNodeSource = audioNodes[sourceId];
  const audioNodeTarget = audioNodes[targetId];
  audioNodeSource.disconnect(audioNodeTarget);
}

export function createAudioNode(id, type, data) {
  switch (type) {
    case "osc":
      console.log("Created osc");
      break;
    case "gain":
      console.log("Created osc");
      break;
  }
}

//****************************************************/
//TOGGLE AUDIO - MOVE TO START PAGE LATER

// Return because of async...
export function isRunning() {
  //Check tone funciton for running
  return Tone.context.state === "running";
}

// TEMP function to be able to use audiocontext in next.js. Create modules here
export function toggleAudio() {
  if (Tone.context.state === "suspended") {
    const osc = new Tone.Oscillator(440, "sine").start();
    const gain = new Tone.Gain(0.5);
    const out = Tone.getDestination();
    audioNodes["a"] = osc;
    audioNodes["b"] = gain;
    audioNodes["c"] = out;
    audioNodes["d"] = osc;
  }
  // Change here to suspend if needed later
  console.log(Tone.context.state);
  return isRunning() ? Tone.start() : Tone.start();
}
