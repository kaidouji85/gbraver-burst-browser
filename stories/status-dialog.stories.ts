import {
  ArmdozerId,
  ArmdozerIds,
  Armdozers,
  createPlayerState,
  EMPTY_ARMDOZER,
  EMPTY_PILOT,
  PilotId,
  PilotIds,
  Pilots,
  PlayerState,
} from "gbraver-burst-core";

import { StatusDialog } from "../src/js/dom-dialogs/status";
import { domStub } from "./stub/dom-stub";

export default {
  title: "status-dialog",
};

/**
 * ステータスダイアログのストーリーを生成する
 * @param options オプション
 * @returns ストーリー
 */
const story = (options: {
  /** アームドーザID */
  armdozerId: ArmdozerId;
  /** パイロットID */
  pilotId: PilotId;
  /**
   * ステート変更関数
   * @param origin オリジナル
   * @returns 変更したステート
   */
  fn?: (origin: PlayerState) => PlayerState;
}) =>
  domStub((stubOptions) => {
    const { armdozerId, pilotId, fn } = options;
    const armdozer =
      Armdozers.find((a) => a.id === armdozerId) ?? EMPTY_ARMDOZER;
    const pilot = Pilots.find((p) => p.id === pilotId) ?? EMPTY_PILOT;
    const origin = createPlayerState({
      playerId: "test-player",
      armdozer,
      pilot,
    });
    const state = fn?.(origin) ?? origin;
    const dialog = new StatusDialog({ ...stubOptions, state });
    return dialog.getRootHTMLElement();
  });

/** シンブレイバー + シンヤ */
export const shinBraverShinya = story({
  armdozerId: ArmdozerIds.SHIN_BRAVER,
  pilotId: PilotIds.SHINYA,
  fn: (origin) => ({
    ...origin,
    armdozer: { ...origin.armdozer, enableBurst: true },
    pilot: { ...origin.pilot, enableSkill: false },
  }),
});
