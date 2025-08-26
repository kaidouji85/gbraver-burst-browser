import { StatusDialog } from "../src/js/dom-dialogs/status";
import { domStub } from "./stub/dom-stub";

export default {
  title: "status-dialog",
};

/** ステータスダイアログ */
export const statusDialog = domStub(() => {
  const dialog = new StatusDialog();
  return dialog.getRootHTMLElement();
});
