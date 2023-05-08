//Create audio, no rendering is happening from this file!

import * as Tone from "tone";

// Initiate empty object to hold audio connections

let audioNodes = {};
var audioEnabled = false;
//Get beatarray from nodes, replace with intance value

let beatArray = [];
// Connect audio components
export function addAudioEdge(sourceId, targetId, targetHandle) {
  const audioNodeSource = audioNodes[sourceId];
  const audioNodeTarget = audioNodes[targetId];
  console.log(targetHandle);

  if (targetHandle) {
    switch (targetHandle) {
      case "paramFrequency":
        console.log(audioNodeTarget.frequency);
        console.log("CONNECTING", audioNodeTarget.frequency);
        audioNodeSource.connect(audioNodeTarget.frequency);

        break;
    }
  } else {
    audioNodeSource.connect(audioNodeTarget);
  }
}

// Update audio parameters
export function updateAudioNode(id, data) {
  const audioNode = audioNodes[id];

  //TODO make switch
  Object.entries(data).forEach(([key, val]) => {
    // console.log(id);
    // console.log(val);
    if (key === "row1") {
      //audioNode.data[key] = val;

      beatArray = val;
    } else if (key === "bpm") {
      //   console.log("changin bpm");
      Tone.Transport.bpm.rampTo(val, 1);
    }
    //DRY!
    else if (key === "min" || key === "max") {
      audioNode[key] = val;
    } else if (isNaN(val) || typeof val === "boolean") {
      audioNode[key] = val;
    } else {
      console.log(key);
      console.log(val);

      audioNode[key].value = val;

      console.log(audioNode[key].value);
    }
  });
}

export function removeAudioNode(id) {
  //console.log(audioNodes[id]);
  if (audioNodes[id] !== "sequence" && Object.keys(audioNodes).length > 1) {
    const audioNode = audioNodes[id];

    audioNode.disconnect();
    // audioNode.stop?.();
    // Dispose - free garbage collection
    audioNode.dispose();
    console.log(Tone.context.state);
  } else {
    Tone.Transport.stop();
    Tone.Transport.cancel(0);
    beatArray.fill(0);
    Tone.Transport.bpm.rampTo(120, 1);
  }
}

export function removeAudioEdge(sourceId, targetId) {
  const audioNodeSource = audioNodes[sourceId];
  let audioNodeTarget = audioNodes[targetId];
  if (audioNodeSource.name === "LFO") {
    console.log("DISCONNECTING");

    console.log(audioNodeTarget.frequency);
    audioNodeTarget.frequency.cancelScheduledValues();
    audioNodeSource.stop();
    //audioNodeSource.disconnect(audioNodeTarget.frequency);
    //audioNodeSource.stop();
    //audioNodeTarget.frequency.setValueAtTime(440, 0);
  } else if (audioNodeSource !== "sequence") {
    audioNodeSource.disconnect(audioNodeTarget);
  }
}

export function createAudioNode(id, type, data, setLampIndex) {
  if (!audioEnabled) {
    Tone.start();
    audioEnabled = true;
    const out = Tone.getDestination();
    audioNodes["output_id"] = out;
    Tone.getDestination().volume.rampTo(-12, 1);
  }

  switch (type) {
    case "osc":
      const osc = new Tone.Oscillator(data.frequency, data.type).start();
      audioNodes[id] = osc;
      break;
    case "gain":
      const gain = new Tone.Gain(data.gain);
      audioNodes[id] = gain;
      break;
    case "filter":
      const filter = new Tone.Filter(data.frequency, data.type);

      audioNodes[id] = filter;
      break;
    case "sequence":
      audioNodes[id] = "sequence";
      const osc2 = new Tone.MembraneSynth().toDestination();

      beatArray = data.row1;

      let step = 0;
      let index = 0;
      Tone.Transport.scheduleRepeat((time) => {
        step = index % 16;
        Tone.Draw.schedule(function () {
          setLampIndex(step);
          //this callback is invoked from a requestAnimationFrame
          //and will be invoked close to AudioContext time
        }, time);

        // use the callback time to schedule events
        if (beatArray[step] > 0) {
          console.log(beatArray[step]);
          osc2.triggerAttackRelease("C0", "4n", time, beatArray[step] / 50);
        }
        index++;
      }, "16n");
      // transport must be started before it starts invoking events
      Tone.Transport.start("+0.1");

      //audioNodes[id] = "sequence";
      break;

    case "lfo":
      // console.log("CREATED LFO");
      const lfo = new Tone.LFO(data.frequency, data.min, data.max);
      lfo.start();
      audioNodes[id] = lfo;
      break;

    case "reverb":
      const reverb = new Tone.Freeverb();
      audioNodes[id] = reverb;
      break;

    case "noise":
      const noise = new Tone.Noise(data.type).start();
      audioNodes[id] = noise;

      break;

    case "channel":
      const channel = new Tone.Channel(
        data.volume,
        data.pan,
        data.solo,
        data.mute
      );
      audioNodes[id] = channel;
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
