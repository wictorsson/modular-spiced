//Create audio, no rendering is happening from this file!
// Thread safe, (audio should not know about GUI)

import * as Tone from "tone";

// Audionodes - empty object on init
const audioNodes = {};

// Connect audio components, in/out comes from the store
export function connect(sourceId, targetId) {
  const audioNodeSource = audioNodes[sourceId];
  const audioNodeTarget = audioNodes[targetId];
  audioNodeSource.connect(audioNodeTarget);
}

// Update audio parameters
export function updateAudioNode(id, data) {
  const audioNode = audioNodes[id];
  //Check in case of error - instanceof AudioParam
  for (const [key, val] of Object.entries(data)) {
    audioNode[key].value = val;
    console.log(audioNode[key].value);
  }
}

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
  }
  // Change here to suspend if needed later
  console.log(Tone.context.state);
  return isRunning() ? Tone.start() : Tone.start();
}
