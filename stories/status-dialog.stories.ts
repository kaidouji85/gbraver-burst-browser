import {
  ArmdozerIds,
  Armdozers,
  createPlayerState,
  EMPTY_ARMDOZER,
  EMPTY_PILOT,
  PilotIds,
  Pilots,
} from "gbraver-burst-core";

import { StatusDialog } from "../src/js/dom-dialogs/status";
import { domStub } from "./stub/dom-stub";

export default {
  title: "status-dialog",
};

/** ステータスダイアログ */
export const statusDialog = domStub(() => {
  const armdozer =
    Armdozers.find((a) => a.id === ArmdozerIds.SHIN_BRAVER) ?? EMPTY_ARMDOZER;
  const pilot = Pilots.find((p) => p.id === PilotIds.SHINYA) ?? EMPTY_PILOT;
  const state = createPlayerState({ playerId: "test-player", armdozer, pilot });
  const dialog = new StatusDialog({ state });
  return dialog.getRootHTMLElement();
});
