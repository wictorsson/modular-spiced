import React from "react";
// import { useRouter } from "next/router.js";
import { useStore } from "../src/store";
import { shallow } from "zustand/shallow";

const selector = (store) => ({
  toggleSaveAs: store.toggleSaveAs,
});

export default function SaveForm({ onSubmit }) {
  const store = useStore(selector, shallow);
  //const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(event);
    store.toggleSaveAs();
  }

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC",
  };

  const now = new Date();
  const formattedDate = now.toLocaleString("en-US", options);
  const dateWithoutTime = formattedDate.split(", ")[0];
  const defaultTitle = "New Project " + dateWithoutTime;

  return (
    <form onSubmit={handleSubmit} className="SaveForm">
      <div>
        <label htmlFor="name" className="Textbox-label">
          Title (required)
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={defaultTitle}
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
      <button type="submit">Save as</button>
      <button
        type="button"
        className="CloseButton"
        onClick={() => store.toggleSaveAs()}
      >
        ❌
      </button>
    </form>
  );
}
