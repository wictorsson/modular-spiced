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
  const defaultDate = "Project_name";
  return (
    <form onSubmit={handleSubmit} className="SaveForm">
      <button type="submit">
        Save as
        {/* {defaultData ? "Update place" : "Add place"} */}
      </button>

      <div>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={defaultDate}
          className="Textbox"
        />
      </div>
      <div className="Form-Radiobuttons">
        <label>
          <input
            type="radio"
            name="publicPatch"
            value="false"
            defaultChecked
            onChange={(event) => {
              event.target.value = event.target.checked ? "false" : "";
            }}
          />
          Private
        </label>
        <label>
          <input
            type="radio"
            name="publicPatch"
            value="true"
            onChange={(event) => {
              event.target.value = event.target.checked ? "true" : "";
            }}
          />
          Public
        </label>
      </div>

      {/* <input id="nodes" name="nodes" type="text" defaultValue={[{}, {}, {}]} />
      <input id="edges" name="edges" type="text" defaultValue={[{}, {}, {}]} /> */}
    </form>
  );
}

{
  /* <label>
Public
<input
  name="publicPatch"
  type="checkbox"
  defaultChecked={false}
  onChange={(event) => {
    event.target.value = event.target.checked ? "true" : "false";
  }}
/>
</label> */
}
