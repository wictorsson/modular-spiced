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
  const defaultDate =
    "Name-" +
    new Date()
      .toLocaleString("en-US", options)
      .replace(/ /g, "-")
      .replace(",", "");
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">
        Save as
        {/* {defaultData ? "Update place" : "Add place"} */}
      </button>
      <label> </label>
      <input id="name" name="name" type="text" defaultValue={defaultDate} />
      <label>
        Public
        <input
          name="publicPatch"
          type="checkbox"
          defaultChecked={false}
          onChange={(event) => {
            event.target.value = event.target.checked ? "true" : "false";
          }}
        />
      </label>
      {/* <input id="nodes" name="nodes" type="text" defaultValue={[{}, {}, {}]} />
      <input id="edges" name="edges" type="text" defaultValue={[{}, {}, {}]} /> */}
    </form>
  );
}
