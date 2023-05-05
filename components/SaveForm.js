import React from "react";
import { useRouter } from "next/router.js";
import { useStore } from "../src/store";
import { shallow } from "zustand/shallow";

const selector = (store) => ({
  toggleSaveAs: store.toggleSaveAs,
});

export default function SaveForm({ onSubmit }) {
  const store = useStore(selector, shallow);
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
      <button type="submit" onClick={() => store.toggleSaveAs()}>
        Save as
      </button>
      <button type="button" onClick={() => store.toggleSaveAs()}>
        ❌
      </button>
    </form>
  );
}
