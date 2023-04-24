import * as Tone from "tone";

import React from "react";

export default function OscAudio() {
  //const osc = new Tone.Oscillator(440, "sine").toDestination().start();
  const osc = new Tone.Oscillator();
  return osc;
}
