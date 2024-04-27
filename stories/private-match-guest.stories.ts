import { PrivateMatchGuestDialog } from "../src/js/dom-dialogs/private-match-guest";
import { domStub, DOMStubStory } from "./stub/dom-stub";

export default {
  title: "private-match-guest",
};

export const dialog: DOMStubStory = domStub((params) => {
  const dialog = new PrivateMatchGuestDialog(params);
  dialog.notifyDialogClosed().subscribe(() => {
    console.log("dialog closed.");
  });
  dialog.notifyPrivateMatchStart().subscribe((roomID) => {
    console.log(`enter private match room ${roomID}`);
  });
  return dialog.getRootHTMLElement();
});
