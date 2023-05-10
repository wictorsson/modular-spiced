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

  if (paramHandle) {
    // CHECK IF LFO

    const audioNodeSourceGain = audioNodes[sourceId + "gainNode"];
    const audioNodeSourceGain2 = audioNodes[sourceId + "gainNode2"];
    const audioNodeSource2 = audioNodes[sourceId + "lfo2"];
    Tone.connect(audioNodeSource, audioNodeSourceGain);
    Tone.connect(audioNodeSource2, audioNodeSourceGain2);
    if (paramHandle === "paramFrequency") {
      Tone.connect(audioNodeSourceGain, audioNodeTarget.frequency);
    }
    if (paramHandle === "paramGain") {
      Tone.connect(audioNodeSourceGain2, audioNodeTarget.volume);
    }
    //Start lfo
    audioNodeSource.start();
    audioNodeSource2.start();
  } else {
    audioNodeSource.connect(audioNodeTarget);
  }
}

// Update audio parameters
export function updateAudioNode(id, data) {
  const audioNode = audioNodes[id];
  const audioNode2 = audioNodes[id + "lfo2"];
  //console.log("AUDIONODE", audioNode);

  //TODO make switch
  Object.entries(data).forEach(([key, val]) => {
    console.log(val);
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
      Tone.Transport.bpm.rampTo(val, 1);
    } else if (key === "min" || key === "max") {
      audioNode[key] = (val + 1) * 20000;

      audioNode2[key] = val * 2 - 1;
    } else if (key === "delayTime") {
      const time = Tone.Time(val).toSeconds();

      audioNode[key].value = time;
    } else if (isNaN(val) || typeof val === "boolean" || key === "distortion") {
      audioNode[key] = val;
    } else {
      audioNode[key].value = val;
    }
  });
}

export function removeAudioNode(id) {
  // check if LFO - GAIN!!!!
  console.log(audioNodes[id]);

  if (Object.keys(audioNodes).length > 1) {
    const audioNode = audioNodes[id];

    audioNode.disconnect();
    // IF LFO HERE ???

    // audioNode.stop?.();
    // Dispose - free garbage collection
    audioNode.dispose();
    //beatArray = [];
    console.log(audioNodes[id]);
    if (audioNodes[id].name === "MembraneSynth") {
      Tone.Transport.clear(audioNodes[id + "repeat"]);
      beatArray.fill(0);
    }
  } else {
    // Tone.Transport.clear(audioNodes[id + "repeat"]);
    // Tone.Transport.stop();
    // Tone.Transport.cancel(0);
    // Tone.Transport.bpm.rampTo(120, 1);
  }
}

export function removeAudioEdge(sourceId, targetId, targetHandle) {
  const audioNodeSource = audioNodes[sourceId];
  const audioNodeTarget = audioNodes[targetId];

  if (audioNodeSource.name === "LFO") {
    if (targetHandle === "paramFrequency") {
      audioNodeSource.stop();
      const audioNodeSourceGainNode = audioNodes[sourceId + "gainNode"];
      Tone.disconnect(audioNodeSource, audioNodeSourceGainNode);
      Tone.disconnect(audioNodeSourceGainNode);
    } else if (targetHandle === "paramGain") {
      const audioNodeSource2 = audioNodes[sourceId + "lfo2"];
      audioNodeSource2.stop();
      const audioNodeSourceGainNode2 = audioNodes[sourceId + "gainNode2"];
      Tone.disconnect(audioNodeSource2, audioNodeSourceGainNode2);
      Tone.disconnect(audioNodeSourceGainNode2);
    }
  } else {
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
      const membSynth = new Tone.MembraneSynth(100, "1n");

      audioNodes[id] = membSynth;

      //audioNodes[id] = "sequence";
      kickFrequency = data.frequency;
      kickLength = data.kickLength;
      beatArray = data.row1;

      let step = 0;
      let index = 0;

      membSynth.set({
        envelope: {
          attack: 0.001,
          attackCurve: "exponential",
          decay: 0.4,
          release: 1.2,
          sustain: 0.01,
        },
        octaves: 10,
        pitchDecay: 0.08,
      });

      let scheduledEvent = Tone.Transport.scheduleRepeat((time) => {
        //console.log(audioNodes[id].frequency);
        step = index % 16;
        Tone.Draw.schedule(function () {
          setLampIndex(step);
          //this callback is invoked from a requestAnimationFrame
          //and will be invoked close to AudioContext time
        }, time);

        // use the callback time to schedule events
        if (beatArray[step] > 0) {
          audioNodes[id].triggerAttackRelease(
            kickFrequency,
            kickLength,
            time,
            beatArray[step] / 50
          );
        }
        index++;
      }, "16n");
      audioNodes[id + "repeat"] = scheduledEvent;

      // transport must be started before it starts invoking events

      break;

    case "lfo":
      const lfo = new Tone.LFO(data.frequency, 10, 20000);
      const lfo2 = new Tone.LFO(data.frequency, data.min, data.max);

      //LFO workaround , pipe through a gainNode
      let gainNode = getContext().rawContext.createGain();
      lfo.start();

      let gainNode2 = getContext().rawContext.createGain();
      lfo2.start();

      audioNodes[id] = lfo;
      audioNodes[id + "gainNode"] = gainNode;

      audioNodes[id + "lfo2"] = lfo2;
      audioNodes[id + "gainNode2"] = gainNode2;
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

//*********

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
//console.log("PARAMHANDLE", paramHandle);
