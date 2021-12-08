// @flow

import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {DegreeOfDifficultyDialog} from "../src/js/game/dom-dialogs/degree-of-difficulty/degree-of-difficulty-dialog";

export default {
  title: 'degree-of-difficulty',
};

export const dialog: DOMStubStory = domStub(() => {
  const dialog = new DegreeOfDifficultyDialog();
  return dialog.getRootHTMLElement();
});
