//Create audio, no rendering is happening from this file!

import * as Tone from "tone";
import { getContext } from "tone";
// Initiate empty object to hold audio connections

let audioNodes = {};
let audioNodesLFO = [];
// Remove audio nodes later
var audioEnabled = false;
//Get beatarray from nodes, replace with intance value

// Make these in the store
let beatArray = [];
let kickFrequency;
let kickLength;

// Connect audio components
export function addAudioEdge(sourceId, targetId, paramHandle) {
  const audioNodeSource = audioNodes[sourceId];
  const audioNodeTarget = audioNodes[targetId];
  //******************* */
  const filter = new Tone.Filter(1200, "lowpass");

  filter.frequency.value = 200;

  console.log("filter", filter.frequency.value);

  const gainNode = getContext().rawContext.createGain();
  const lfo = new Tone.LFO(4, 200, 1200);

  Tone.connect(lfo, gainNode);
  Tone.connect(gainNode, filter.frequency);

  Tone.disconnect(lfo, gainNode);
  Tone.disconnect(gainNode, filter.frequency);

  filter.frequency.value = 200;

  console.log("filter", filter.frequency.value);
  if (paramHandle) {
    switch (paramHandle) {
      case "paramFrequency":
        // console.log(audioNodeTarget.frequency);
        // console.log("CONNECTING", audioNodeTarget.frequency);
        let gainNode = getContext().rawContext.createGain();
        audioNodes["gainNode"] = gainNode;
        //audioNodeSource.connect(gainNode, audioNodeTarget.frequency);
        Tone.connect(audioNodeSource, gainNode);
        Tone.connect(gainNode, audioNodeTarget.frequency);

        // Tone.disconnect(audioNodeSource, gainNode);
        // Tone.disconnect(gainNode, audioNodeTarget.frequency);

        // audioNodeSource.connect(audioNodeTarget.frequency);
        // audioNodeTarget.frequency.cancelScheduledValues(0, Tone.Time());

        // audioNodeSource.disconnect(audioNodeTarget.frequency);

        break;
    }
  } else {
    audioNodeSource.connect(audioNodeTarget);
  }
}

// Update audio parameters
export function updateAudioNode(id, data) {
  const audioNode = audioNodes[id];
  // console.log(audioNode);

  //TODO make switch
  Object.entries(data).forEach(([key, val]) => {
    console.log(val);
    console.log(key);
    // console.log(id);
    // console.log(key);
    if (key === "row1") {
      //audioNode.data[key] = val;

      beatArray = val;
    } else if (key === "frequency") {
      audioNode[key].value = val;

      kickFrequency = val;
    } else if (key === "kickLength") {
      //audioNode.data[key] = val;

      kickLength = val;
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
      // console.log(key);
      // console.log(val);

      audioNode[key].value = val;

      //console.log(audioNode[key].value);
      // console.log(audioNode[key]);
    }
  });
}

export function removeAudioNode(id) {
  console.log(audioNodes[id]);
  if (
    audioNodes[id] !== "MembraneSynth" &&
    Object.keys(audioNodes).length > 1
  ) {
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

  Tone.disconnect(audioNodeSource, audioNodes["gainNode"]);
  Tone.disconnect(audioNodes["gainNode"], audioNodeTarget.frequency);

  if (audioNodeSource.name === "LFO") {
    console.log("DISCONNECTING");
    // Tone.disconnect(audioNodeSource);
    // Tone.disconnect(audioNodeTarget.frequency);
    // audioNodeSource.disconnect(audioNodeTarget.frequency);
    audioNodeSource.stop();
    // audioNodesLFO.push(audioNodeSource);
    // Connect this LFO to the node, for start make osc only input one
  } else if (audioNodeSource !== "MembraneSynth") {
    audioNodeSource.disconnect(audioNodeTarget);
  }
}

export function createAudioNode(id, type, data, setLampIndex) {
  console.log("started");

  // var filter = new Tone.Filter(1200, "lowpass");
  // filter.frequency.value = 200;
  // console.log(filter.frequency.value); //OUTPUTS 200!
  // var lfo = new Tone.LFO(4, 200, 1200);
  // lfo.connect(filter.frequency);
  // filter.frequency.cancelScheduledValues();
  // lfo.disconnect(filter.frequency);
  // filter.frequency.value = 200;
  // console.log(filter.frequency.value); //OUTPUTS 0

  // const filter = new Tone.Filter(1200, "lowpass");

  // filter.frequency.value = 200;

  // console.log("filter", filter.frequency.value);

  // const lfo = new Tone.LFO(4, 200, 1200);

  // lfo.connect(filter.frequency);
  // lfo.disconnect(filter.frequency);

  // filter.frequency.value = 200;

  // console.log("filter", filter.frequency.value);

  const filter = new Tone.Filter(1200, "lowpass");

  filter.frequency.value = 200;

  console.log("filter", filter.frequency.value);

  const gainNode = getContext().rawContext.createGain();
  const lfo = new Tone.LFO(4, 200, 1200);

  Tone.connect(lfo, gainNode);
  Tone.connect(gainNode, filter.frequency);

  Tone.disconnect(lfo, gainNode);
  Tone.disconnect(gainNode, filter.frequency);

  filter.frequency.value = 200;

  console.log("filter", filter.frequency.value);

  if (!audioEnabled) {
    Tone.start();
    audioEnabled = true;
    const out = Tone.getDestination();
    audioNodes["output_id"] = out;
    Tone.getDestination().volume.rampTo(-12, 1);
    Tone.Transport.start("+0.1");
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
      // CREATE LFO TOGETHER THAT IS ALWAYS SET and modulate max and min always from slider
      const filter = new Tone.Filter(data.frequency, data.type);
      //filter.frequency.setValueAtTime(0.5, Tone.Time() + 10);
      audioNodes[id] = filter;
      break;
    case "sequence":
      const membSynth = new Tone.MembraneSynth().toDestination();

      audioNodes[id] = membSynth;

      //audioNodes[id] = "sequence";
      kickFrequency = data.frequency;
      kickLength = data.kickLength;
      beatArray = data.row1;

      let step = 0;
      let index = 0;
      Tone.Transport.scheduleRepeat((time) => {
        //console.log(audioNodes[id].frequency);
        step = index % 16;
        Tone.Draw.schedule(function () {
          setLampIndex(step);
          //this callback is invoked from a requestAnimationFrame
          //and will be invoked close to AudioContext time
        }, time);

        // use the callback time to schedule events
        if (beatArray[step] > 0) {
          membSynth.triggerAttackRelease(
            kickFrequency,
            data.kickLength,
            time,
            beatArray[step] / 50
          );
        }
        index++;
      }, "16n");
      // transport must be started before it starts invoking events

      break;

    case "lfo":
      // const filter = new Tone.Filter(1200, "lowpass");

      // filter.frequency.value = 200;

      // console.log("filter", filter.frequency.value);

      const lfo = new Tone.LFO(4, 200, 1200);

      //const lfo = new Tone.LFO(data.frequency, data.min, data.max);

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
