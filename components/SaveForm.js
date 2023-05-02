import styled from "styled-components";
import React from "react";

// const FormContainer = styled.form`
//   display: grid;
//   gap: 0.5rem;
// `;

// const Input = styled.input`
//   padding: 0.5rem;
//   font-size: inherit;
//   border: 3px solid black;
//   border-radius: 0.5rem;
// `;

// const Label = styled.label`
//   font-weight: bold;
// `;

export default function SaveForm({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(event);
  }
  return (
    <div onSubmit={handleSubmit}>
      <label>Patchname: </label>
      <input
        id="name"
        name="name"
        type="text"
        defaultValue={`${new Date().toLocaleString()}`}
      />
      <button type="submit">
        Save
        {/* {defaultData ? "Update place" : "Add place"} */}
      </button>
    </div>
  );
}
