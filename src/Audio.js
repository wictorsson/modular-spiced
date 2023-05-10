//Create audio, no rendering is happening from this file!

import * as Tone from "tone";
import { getContext } from "tone";
// Initiate empty object to hold audio connections

let audioNodes = {};
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
  // const filter = new Tone.Filter(1200, "lowpass");

  // filter.frequency.value = 200;

  // console.log("filter", filter.frequency.value);

  // const gainNode = getContext().rawContext.createGain();
  // const lfo = new Tone.LFO(4, 200, 1200);

  // Tone.connect(lfo, gainNode);
  // Tone.connect(gainNode, filter.frequency);

  // Tone.disconnect(lfo, gainNode);
  // Tone.disconnect(gainNode, filter.frequency);

  // filter.frequency.value = 200;
  console.log("PARAMHANDLE", paramHandle);
  if (paramHandle) {
    // CHECK IF LFO

    const audioNodeSourceGain = audioNodes[sourceId + "gainNode"];
    Tone.connect(audioNodeSource, audioNodeSourceGain);
    if (paramHandle === "paramFrequency") {
      console.log("CHANGING THE RATE");
      audioNodeSource.set({
        min: 10,
        max: 20000,
      });
      Tone.connect(audioNodeSourceGain, audioNodeTarget.frequency);
    }
    if (paramHandle === "paramGain") {
      console.log("CHANGING THE RATE");
      audioNodeSource.set({
        min: -1,
        max: 1,
      });

      Tone.connect(audioNodeSourceGain, audioNodeTarget.volume);
    }
    audioNodeSource.start();
    // switch (paramHandle) {
    //   case "paramFrequency":
    //     const audioNodeSourceGain = audioNodes[sourceId + "gainNode"];
    //     Tone.connect(audioNodeSource, audioNodeSourceGain);
    //     Tone.connect(audioNodeSourceGain, audioNodeTarget.frequency);
    //     break;
    // }
  } else {
    audioNodeSource.connect(audioNodeTarget);
  }
}

// Update audio parameters
export function updateAudioNode(id, data) {
  const audioNode = audioNodes[id];
  console.log("AUDIONODE", audioNode);

  //TODO make switch
  Object.entries(data).forEach(([key, val]) => {
    console.log(val);
    console.log(key);
    console.log(key);

    if (key === "row1") {
      beatArray = val;
    } else if (key === "frequency") {
      audioNode[key].value = val;

      if (audioNode.name === "MembraneSynth") {
        kickFrequency = val;
      }
    } else if (key === "kickLength") {
      kickLength = val;
    } else if (key === "bpm") {
      //   console.log("changin bpm");
      Tone.Transport.bpm.rampTo(val, 1);
    }
    //DRY!
    else if (key === "min" || key === "max" || key === "distortion") {
      audioNode[key] = val;
    } else if (key === "delayTime") {
      const time = Tone.Time(val).toSeconds();
      console.log(val);
      // const audioNodeSource = audioNodes[id];
      // audioNodeSource.set({
      //   delayTime: val,
      // });

      audioNode[key].value = time;
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
  // check if LFO - GAIN!!!!
  console.log(audioNodes[id]);

  if (
    audioNodes[id] !== "MembraneSynth" &&
    Object.keys(audioNodes).length > 1
  ) {
    const audioNode = audioNodes[id];

    audioNode.disconnect();
    // IF LFO HERE ???

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
    audioNodeSource.stop();
    const audioNodeSourceGainNode = audioNodes[sourceId + "gainNode"];
    Tone.disconnect(audioNodeSource, audioNodeSourceGainNode);

    console.log("DISCONNECTING", targetId);
    audioNodeSource.set({
      min: -1,
      max: 1,
    });
    // Tone.disconnect(audioNodeSourceGainNode, audioNodeTarget.frequency);
    Tone.disconnect(audioNodeSourceGainNode);
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

  //*************** */

  // const filter = new Tone.Filter(1200, "lowpass");

  // filter.frequency.value = 200;

  // console.log("filter", filter.frequency.value);

  // const gainNode = getContext().rawContext.createGain();
  // const lfo = new Tone.LFO(4, 200, 1200);

  // Tone.connect(lfo, gainNode);
  // Tone.connect(gainNode, filter.frequency);

  // Tone.disconnect(lfo, gainNode);
  // Tone.disconnect(gainNode, filter.frequency);

  // filter.frequency.value = 200;

  // console.log("filter", filter.frequency.value);

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
            kickLength,
            time,
            beatArray[step] / 50
          );
        }
        index++;
      }, "16n");
      // transport must be started before it starts invoking events

      break;

    case "lfo":
      const lfo = new Tone.LFO(data.frequency, data.min, data.max);

      //const lfo = new Tone.LFO(data.frequency, data.min, data.max);
      let gainNode = getContext().rawContext.createGain();
      lfo.start();

      audioNodes[id] = lfo;
      audioNodes[id + "gainNode"] = gainNode;
      break;

    case "reverb":
      const reverb = new Tone.Freeverb();
      audioNodes[id] = reverb;
      break;

    case "distortion":
      const distortion = new Tone.Distortion(data.distortion);
      audioNodes[id] = distortion;
      break;

    case "delay":
      const delay = new Tone.Delay(0.1, data.feedback, data.wet);
      const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5);
      audioNodes[id] = feedbackDelay;
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
