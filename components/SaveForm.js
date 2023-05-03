import React from "react";
import { useRouter } from "next/router.js";

export default function SaveForm({ onSubmit }) {
  const router = useRouter();
  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(event);
  }

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  };
  const defaultDate = new Date()
    .toLocaleString("en-US", options)
    .replace(/ /g, "-")
    .replace(",", "");
  return (
    <form onSubmit={handleSubmit}>
      <label>Patchname: </label>
      <input id="name" name="name" type="text" defaultValue={defaultDate} />
      {/* <input id="nodes" name="nodes" type="text" defaultValue={[{}, {}, {}]} />
      <input id="edges" name="edges" type="text" defaultValue={[{}, {}, {}]} /> */}
      <button type="submit">
        Save New
        {/* {defaultData ? "Update place" : "Add place"} */}
      </button>
    </form>
  );
}
