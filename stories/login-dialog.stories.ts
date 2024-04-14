import { LoginDialog } from "../src/js/dom-dialogs/login";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";

export default {
  title: "login-dialog",
};
export const dialog: DOMStubStory = domStub((resources, se) => {
  const dialog = new LoginDialog({
    resources,
    se,
    caption: "ネット対戦をするにはログインしてください",
  });
  dialog.notifyLogin().subscribe(() => {
    console.log("login");
  });
  dialog.notifyClosed().subscribe(() => {
    console.log("close");
  });
  return dialog.getRootHTMLElement();
});
