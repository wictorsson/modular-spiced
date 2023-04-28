//Create audio, no rendering is happening from this file!
// Thread safe, (audio should not know about GUI)

import * as Tone from "tone";

// Initiate empty object to hold audio connections
const audioNodes = {};
var audioEnabled = false;
//Get beatarray from nodes, replace with intance value

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
      // console.log(val);
      beatArray = val;
    } else if (key === "bpm") {
      //   console.log("changin bpm");
      Tone.Transport.bpm.rampTo(val, 1);
    } else if (isNaN(val)) {
      audioNode[key] = val;
    } else {
      audioNode[key].value = val;
    }

    // return Tone.Offline(
    //   () => {
    //     // console.log("OUT");
    //     const lfo = new Tone.LFO({ min: 400, max: 4000, amplitude: 0 })
    //       .start()
    //       .toDestination();
    //   },
    //   0.5,
    //   1
    // );
    // const lfo = new Tone.LFO("4n", 400, 4000).connect(audioNode[key]).start();
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
    beatArray.fill(0);
    Tone.Transport.bpm.rampTo(120, 1);
  }
}

export function removeAudioEdge(sourceId, targetId) {
  const audioNodeSource = audioNodes[sourceId];
  const audioNodeTarget = audioNodes[targetId];
  //console.log(audioNodeSource);
  if (audioNodeSource !== "sequence") {
    audioNodeSource.disconnect(audioNodeTarget);
  } else {
    //Tone.Transport.stop();
    // Tone.Transport.cancel(0);
    //beatArray.fill(false);
  }
}

export function createAudioNode(id, type, data) {
  if (!audioEnabled) {
    Tone.start();
    audioEnabled = true;
    const out = Tone.getDestination();
    audioNodes["output_id"] = out;
    Tone.getDestination().volume.rampTo(-12, 1);
    // const gain = new Tone.Gain(100);
    // gain.toDestination();
  }
  switch (type) {
    case "osc":
      const osc = new Tone.Oscillator(440, data.type).start();

      audioNodes[id] = osc;
      break;
    case "gain":
      const gain = new Tone.Gain(1);
      audioNodes[id] = gain;
      break;
    case "filter":
      const filter = new Tone.Filter(1500, data.type);
      let lfo = new Tone.LFO("1n", 500, 4500);
      lfo.start();
      lfo.connect(filter.frequency);

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
        step = index % 16;
        // for (let i = 0; i < beatArray.length(); ++i) {
        // console.log(beatArray[step]);
        // }
        // use the callback time to schedule events
        if (beatArray[step] > 0) {
          console.log(beatArray[step]);
          osc2.triggerAttackRelease("C2", "8n", time, beatArray[step] / 100);
        }
        index++;
      }, "16n");
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
