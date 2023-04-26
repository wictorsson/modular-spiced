//Create audio, no rendering is happening from this file!
// Thread safe, (audio should not know about GUI)

import * as Tone from "tone";

// Initiate empty object to hold audio connections
const audioNodes = {};
var audioEnabled = false;
// Connect audio components
export function addAudioEdge(sourceId, targetId) {
  // console.log(sourceId);
  // console.log(targetId);
  const audioNodeSource = audioNodes[sourceId];
  const audioNodeTarget = audioNodes[targetId];
  audioNodeSource.connect(audioNodeTarget);
}

// Update audio parameters
export function updateAudioNode(id, data) {
  const audioNode = audioNodes[id];

  Object.entries(data).forEach(([key, val]) => {
    // Check if parameter is a number or textstring
    console.log(val);
    if (isNaN(val)) {
      audioNode[key] = val;
    } else {
      audioNode[key].value = val;
    }
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

  console.log(audioNodeTarget);
  console.log(audioNodeSource);
  audioNodeSource.disconnect(audioNodeTarget);
}

export function createAudioNode(id, type, data) {
  if (!audioEnabled) {
    console.log("Enabled");
    Tone.start();
    audioEnabled = true;
    const out = Tone.getDestination();
    audioNodes["output_id"] = out;
  }
  switch (type) {
    case "osc":
      const osc = new Tone.Oscillator(440, data.type).start();
      audioNodes[id] = osc;

      break;
    case "gain":
      const gain = new Tone.Gain(0.5);
      audioNodes[id] = gain;
      break;
    case "filter":
      const filter = new Tone.Filter(1500, data.type);
      audioNodes[id] = filter;
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
    const out = Tone.getDestination();

    audioNodes["c"] = out;
  }
  // Change here to suspend if needed later
  console.log(Tone.context.state);
  return isRunning() ? Tone.start() : Tone.start();
}
