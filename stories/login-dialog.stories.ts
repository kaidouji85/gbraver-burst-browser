import { LoginDialog } from "../src/js/dom-dialogs/login/login-dialog";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";
export default {
  title: "login-dialog"
};
export const dialog: DOMStubStory = domStub(resources => {
  const dialog = new LoginDialog(resources, "ネット対戦をするにはログインしてください");
  dialog.loginNotifier().subscribe(() => {
    console.log("login");
  });
  dialog.closeDialogNotifier().subscribe(() => {
    console.log("close");
  });
  return dialog.getRootHTMLElement();
});