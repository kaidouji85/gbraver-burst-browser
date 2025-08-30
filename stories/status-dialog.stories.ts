import { ArmdozerIds, Armdozers, PilotIds, Pilots } from "gbraver-burst-core";

import { StatusDialog } from "../src/js/dom-dialogs/status";
import { domStub } from "./stub/dom-stub";

export default {
  title: "status-dialog",
};

/** ステータスダイアログ */
export const statusDialog = domStub(() => {
  const armdozer = Armdozers.find((a) => a.id === ArmdozerIds.SHIN_BRAVER);
  const pilot = Pilots.find((p) => p.id === PilotIds.SHINYA);
  
  const dialog = new StatusDialog({
    armdozer,
    pilot,
  });
  return dialog.getRootHTMLElement();
});
