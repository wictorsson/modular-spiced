//Create audio, no rendering is happening from this file!
// Thread safe, (audio should not know about GUI)

import * as Tone from "tone";

// Initiate empty object to hold audio connections
const audioNodes = {};
var audioEnabled = false;
//Get beatarray from nodes

let beatArray = [];
// Connect audio components
export function addAudioEdge(sourceId, targetId) {
  // console.log(targetId);
  const audioNodeSource = audioNodes[sourceId];
  const audioNodeTarget = audioNodes[targetId];
  audioNodeSource.connect(audioNodeTarget);
}

// Update audio parameters
export function updateAudioNode(id, data) {
  const audioNode = audioNodes[id];

  Object.entries(data).forEach(([key, val]) => {
    if (key === "row1") {
      //audioNode.data[key] = val;
      beatArray = val;
    } else if (isNaN(val)) {
      audioNode[key] = val;
    } else {
      audioNode[key].value = val;
    }
  });
}

export function removeAudioNode(id) {
  console.log(audioNodes[id]);
  if (audioNodes[id] !== "sequence") {
    const audioNode = audioNodes[id];
    audioNode.disconnect();
    // audioNode.stop?.();
    // Dispose - free garbage collection
    audioNode.dispose();
  } else {
    console.log("stopped");

    Tone.Transport.stop();
    Tone.Transport.cancel(0);
    beatArray.fill(false);
  }
}

export function removeAudioEdge(sourceId, targetId) {
  const audioNodeSource = audioNodes[sourceId];
  const audioNodeTarget = audioNodes[targetId];
  console.log(audioNodeSource);
  if (audioNodeSource !== "sequence") {
    audioNodeSource.disconnect(audioNodeTarget);

    Tone.Transport.stop();
    Tone.Transport.cancel(0);
    beatArray.fill(false);
  }
}

export function createAudioNode(id, type, data) {
  if (!audioEnabled) {
    Tone.start();
    const gain = new Tone.Gain(0.6);
    gain.toDestination();

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
    case "sequence":
      audioNodes[id] = "sequence";
      const osc2 = new Tone.MembraneSynth().toDestination();

      beatArray = data.row1;
      console.log(beatArray);
      let step = 0;
      let index = 0;
      Tone.Transport.scheduleRepeat((time) => {
        step = index % 8;
        // for (let i = 0; i < beatArray.length(); ++i) {
        console.log(beatArray[step]);
        // }
        // use the callback time to schedule events
        if (beatArray[step] === true) {
          //console.log("TRIGGER", beatArray[step]);
          osc2.triggerAttackRelease("C2", "8n", time);
        }
        index++;
      }, "4n");
      // transport must be started before it starts invoking events
      Tone.Transport.start();
      //audioNodes[id] = "sequence";
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
