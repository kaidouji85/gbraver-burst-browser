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
    dialog.notifyClose().subscribe(() => {
      console.log("closed");
    });
    return dialog.getRootHTMLElement();
  });

/** シンブレイバー + シンヤ */
export const shinBraverShinya = story({
  armdozerId: ArmdozerIds.SHIN_BRAVER,
  pilotId: PilotIds.SHINYA,
  fn: (origin) => ({
    ...origin,
    armdozer: {
      ...origin.armdozer,
      enableBurst: false,
      effects: [
        {
          type: "TurnStartBatteryCorrect",
          correctBattery: 2,
          period: { type: "SpecialPeriod" },
        },
      ],
    },
    pilot: { ...origin.pilot, enableSkill: false },
  }),
});

/** ウィングドーザ + ツバサ */
export const wingDozerTsubasa = story({
  armdozerId: ArmdozerIds.WING_DOZER,
  pilotId: PilotIds.TSUBASA,
  fn: (origin) => ({
    ...origin,
    armdozer: {
      ...origin.armdozer,
      effects: [
        {
          type: "ContinuousActivePlayer",
          period: { type: "SpecialPeriod" },
        },
        {
          type: "BatteryCorrection",
          batteryCorrection: 2,
          period: { type: "TurnLimit", remainingTurn: 2 },
        },
        {
          type: "HalveCorrectPower",
          period: { type: "TurnLimit", remainingTurn: 2 },
        },
      ],
    },
  }),
});

/** ネオランドーザ + ガイ */
export const neoLandozerGai = story({
  armdozerId: ArmdozerIds.NEO_LANDOZER,
  pilotId: PilotIds.GAI,
  fn: (origin) => ({
    ...origin,
    armdozer: {
      ...origin.armdozer,
      effects: [
        {
          type: "CorrectPower",
          power: 1000,
          period: { type: "TurnLimit", remainingTurn: 2 },
        },
        {
          type: "CorrectPower",
          power: 600,
          period: { type: "TurnLimit", remainingTurn: 2 },
        },
      ],
    },
  }),
});

/** ライトニングドーザ + ライト */
export const lightningDozerRaito = story({
  armdozerId: ArmdozerIds.LIGHTNING_DOZER,
  pilotId: PilotIds.RAITO,
});

/** ジェネシスブレイバー + ユウヤ */
export const genesisBraverYuuya = story({
  armdozerId: ArmdozerIds.GENESIS_BRAVER,
  pilotId: PilotIds.YUUYA,
});

/** グランドーザ + ライト */
export const granDozerRaito = story({
  armdozerId: ArmdozerIds.GRAN_DOZER,
  pilotId: PilotIds.RAITO,
});
