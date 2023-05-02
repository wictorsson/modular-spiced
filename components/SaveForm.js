import React from "react";
import { useRouter } from "next/router.js";

export default function SaveForm({ onSubmit }) {
  const router = useRouter();
  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(event);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Patchname: </label>
      <input
        id="name"
        name="name"
        type="text"
        defaultValue={`${new Date().toLocaleString()}`}
      />
      {/* <input id="nodes" name="nodes" type="text" defaultValue={[{}, {}, {}]} />
      <input id="edges" name="edges" type="text" defaultValue={[{}, {}, {}]} /> */}
      <button type="submit">
        Save New
        {/* {defaultData ? "Update place" : "Add place"} */}
      </button>
    </form>
  );
}
