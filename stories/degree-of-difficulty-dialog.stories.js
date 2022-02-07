// @flow

import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {DifficultyDialog} from "../src/js/game/dom-dialogs/difficulty/difficulty-dialog";

export default {
  title: 'difficulty',
};

export const dialog: DOMStubStory = domStub(resources => {
  const dialog = new DifficultyDialog(resources);
  dialog.selectionCompleteNotifier().subscribe(diffuculty => {
    console.log(diffuculty);
  });
  dialog.closeDialogNotifier().subscribe(() => {
    console.log('close dialog');
  });
  return dialog.getRootHTMLElement();
});
