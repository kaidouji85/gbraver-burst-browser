import { LoginDialog } from "../src/js/dom-dialogs/login";
import { domStub } from "./stub/dom-stub";

export default {
  title: "login-dialog",
};

/** ダイアログ表示 */
export const dialog = domStub((params) => {
  const dialog = new LoginDialog({
    ...params,
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
