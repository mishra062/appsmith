import { shouldDisallowToast } from "./replayHelpers";

import myLocalStorage, { getLocalStorage } from "utils/localStorage";

describe("Checks ReplayDSL functionality", () => {
  var localStorage = {};
  localStorage.setItem = function(key, val) {
    this[key] = val + "";
  };
  localStorage.getItem = function(key) {
    return this[key];
  };
  Object.defineProperty(localStorage, "length", {
    get: function() {
      return Object.keys(this).length - 2;
    },
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("checks shouldDisallowToast", () => {
    localStorage.setItem("undoToastShown", false);
    localStorage.setItem("redoToastShown", false);

    const test1 = shouldDisallowToast(false);
    const test2 = shouldDisallowToast(true);

    expect(test1).toBe(false);
    expect(test2).toBe(false);

    localStorage.setItem("undoToastShown", true);
    localStorage.setItem("redoToastShown", true);

    const test1 = shouldDisallowToast(false);
    const test2 = shouldDisallowToast(true);

    expect(test1).toBe(true);
    expect(test2).toBe(true);
  });
});
