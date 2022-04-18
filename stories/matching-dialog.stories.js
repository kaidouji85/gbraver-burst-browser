// @flow
import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {MatchingDialog} from "../src/js/game/dom-dialogs/matching/matching-dialog";

export default {
  title: 'matching-dialog',
};
export const dialog: DOMStubStory = domStub(resources => {
  const dialog = new MatchingDialog(resources);
  dialog.matchingCanceledNotifier().subscribe(() => {
    console.log('matching canceled');
  });
  return dialog.getRootHTMLElement();
});