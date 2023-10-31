import { ref, toValue } from "vue";
import { defineStore } from "pinia";

export const useOmnis = defineStore("Omnis", () => {
  const data = ref({});

  /* OMNIS ON LOAD

   Omnis calls this method when the component is first loaded
  */
  function omnisOnLoad() {}

  /* OMNIS GET DATA

   Omnis has requested the data from this component.  It must be in an Omnis-row compatible
   format.

   DEV WARNING: All nested objects need to be formatted as JSON
  */
  function omnisGetData() {
    return toValue(data);
  }

  /* OMNIS SET DATA

   Omnis is sending data to this component via a $redraw().  This method accepts the new
   data, formats it appropriately, and then redraws the current visual state.

   DEV WARNING: Any nested objects will come in as JSON, e.g. JSON.parse
  */
  function omnisSetData(row) {
    data.value = row;
  }

  // Init Omnis hook
  const jOmnis = typeof window.jOmnis !== "undefined" ? window.jOmnis : {};

  // Initialize Callbacks
  jOmnis.callbackObject = { omnisOnLoad, omnisGetData, omnisSetData };

  /* EMIT EVENT

  Example code for how to emit a Control Event with jOmnis.

  Control events only have a single row, so it's considered best practice to come up with
  a standard key, like "eventName" below, to categorize the events dispatched to Omnis.  All
  other keys can then be used as arguments/data for that event.

 */
  function emitEvent(name, evt) {
    let omnisEvent = { event: name, payload: evt };
    if (typeof window.jOmnis !== "undefined") {
      jOmnis.sendControlEvent(omnisEvent);
    }
  }

  return { data, emitEvent };
});
