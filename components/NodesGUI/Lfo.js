import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../../src/store";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  setFrequency: (e) => store.updateNode(id, { frequency: e.target.value }),
  setMin: (e) => store.updateNode(id, { min: e.target.value }),
  setMax: (e) => store.updateNode(id, { max: e.target.value }),
});

export default function Lfo({ id, data }) {
  const { setFrequency, setMin, setMax } = useStore(selector(id), shallow);
  //Make unique type name to avoid conflicts when using multiple intances
  // const typeName = id + "_type";

  return (
    <div>
      <div className="nodeContainer">
        <h3>LFO</h3>

        <span>Freq</span>

        <input
          id="slider"
          className="nodrag"
          type="range"
          min="0.1"
          max="20"
          step="0.01"
          value={data.frequency}
          onChange={setFrequency}
        />

        <span>Min</span>

        <input
          id="slider"
          className="nodrag"
          type="range"
          min="0.01"
          max="1"
          step="0.01"
          value={data.min}
          onChange={setMin}
        />

        <span>Max</span>

        <input
          id="slider"
          className="nodrag"
          type="range"
          min="0.01"
          max="1"
          step="0.01"
          value={data.max}
          onChange={setMax}
        />

        {/* <div className="waveformContainer">
          <div className="nodrag">
            <label style={{ display: "block" }}>
              <input
                type="radio"
                name={typeName}
                value="lowpass"
                checked={data.type === "lowpass"}
                onChange={setType}
              />
              SINE
              <input
                type="radio"
                name={typeName}
                value="highpass"
                checked={data.type === "highpass"}
                onChange={setType}
              />
              SAW
            </label>
          </div>
        </div> */}
      </div>

      <Handle type="source" position="top" id="paramHandle" />
      <Handle type="target" position="right" id="paramFrequency" />
      {/* <Handle type="target" position="bottom" /> */}
      {/* <Handle type="target" position="right" id="freqHandle" /> */}
    </div>
  );
}

// if (data.connectedTo === "paramGain") {
//   return (
//     <div>
//       <div className="nodeContainer">
//         <h3>LFO</h3>

//         <span>Freq</span>

//         <input
//           id="slider"
//           className="nodrag"
//           type="range"
//           min="0.1"
//           max="20"
//           step="0.01"
//           value={data.frequency}
//           onChange={setFrequency}
//         />

//         <span>Min</span>

//         <input
//           id="slider"
//           className="nodrag"
//           type="range"
//           min="-1"
//           max="1"
//           step="0.01"
//           value={data.min}
//           onChange={setMin}
//         />

//         <span>Max</span>

//         <input
//           id="slider"
//           className="nodrag"
//           type="range"
//           min="-1"
//           max="1"
//           step="0.01"
//           value={data.max}
//           onChange={setMax}
//         />

//         {/* <div className="waveformContainer">
//       <div className="nodrag">
//         <label style={{ display: "block" }}>
//           <input
//             type="radio"
//             name={typeName}
//             value="lowpass"
//             checked={data.type === "lowpass"}
//             onChange={setType}
//           />
//           SINE
//           <input
//             type="radio"
//             name={typeName}
//             value="highpass"
//             checked={data.type === "highpass"}
//             onChange={setType}
//           />
//           SAW
//         </label>
//       </div>
//     </div> */}
//       </div>

//       <Handle type="source" position="top" id="paramHandle" />
//       <Handle type="target" position="right" id="paramGain" />
//       {/* <Handle type="target" position="bottom" /> */}
//       {/* <Handle type="target" position="right" id="freqHandle" /> */}
//     </div>
//   );
// }
// }
// import React from "react";
// import { Handle } from "reactflow";
// import { useStore } from "../../src/store";
// import { shallow } from "zustand/shallow";

// const selector = (id) => (store) => ({
//   setFrequency: (e) => store.updateNode(id, { frequency: e.target.value }),
//   setMin: (e) => store.updateNode(id, { min: e.target.value }),
//   setMax: (e) => store.updateNode(id, { max: e.target.value }),
// });

// export default function Lfo({ id, data }) {
//   const { setFrequency, setMin, setMax } = useStore(selector(id), shallow);

//   // if (data.connectedTo === "paramFrequency") {
//   //   var min = 10;
//   //   var max = 20000;
//   // } else if (data.connectedTo === "paramGain") {
//   //   var min = 0.1;
//   //   var max = 1;
//   // }

//   console.log("Connected to", data.connectedTo);
//   //Make unique type name to avoid conflicts when using multiple intances
//   // const typeName = id + "_type";
//   if (data.connectedTo === "paramFrequency") {
//     return (
//       <div>
//         <div className="nodeContainer">
//           <h3>LFO</h3>
//           <span>Freq</span>
//           <input
//             id="slider"
//             className="nodrag"
//             type="range"
//             min="10"
//             max="20000"
//             step="0.01"
//             value={data.frequency}
//             onChange={setFrequency}
//           />
//           <span>Min</span>
//           <input
//             id="slider"
//             className="nodrag"
//             type="range"
//             min="10"
//             max="20000"
//             value={data.min}
//             onChange={setMin}
//           />
//           <span>Max</span>
//           <input
//             id="slider"
//             className="nodrag"
//             type="range"
//             min="10"
//             max="20000"
//             value={data.max}
//             onChange={setMax}
//           />
//         </div>
//         <Handle type="source" position="top" id="paramHandle" />
//         <Handle type="target" position="right" id="paramFrequency" />
//         <p>Connected to: {data.connectedTo}</p>
//       </div>
//     );
//   } else if (data.connectedTo === "paramGain") {
//     return (
//       <div>
//         <div className="nodeContainer">
//           <h3>LFO</h3>
//           <span>Freq</span>
//           <input
//             id="slider"
//             className="nodrag"
//             type="range"
//             min="0.1"
//             max="20"
//             step="0.01"
//             value={data.frequency}
//             onChange={setFrequency}
//           />
//           <span>Min</span>
//           <input
//             id="slider"
//             className="nodrag"
//             type="range"
//             step="1"
//             min="-60"
//             max="6"
//             value={data.min}
//             onChange={setMin}
//           />
//           <span>Max</span>
//           <input
//             id="slider"
//             className="nodrag"
//             type="range"
//             step="1"
//             min="-60"
//             max="6"
//             value={data.max}
//             onChange={setMax}
//           />
//           <Handle type="source" position="top" id="paramHandle" />
//           <Handle type="target" position="right" id="paramGain" />
//         </div>
//         <p>Connected to: {data.connectedTo}</p>
//       </div>
//     );
//   } else {
//     return null;
//   }
// }
