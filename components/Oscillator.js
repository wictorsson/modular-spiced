import React from "react";
import * as Tone from "tone";

export default function Oscillator({ freq }) {
  console.log("NEW OSC CREATED");
  return new Tone.Oscillator(freq, "sine").toDestination().start();
}
