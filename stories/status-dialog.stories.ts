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
   * 敵かどうか、trueで敵である
   * @default false
   */
  isEnemy?: boolean;
  /**
   * パイロットを非表示にするかどうか、trueで非表示にする
   * @default false
   */
  isPilotHidden?: boolean;

  /**
   * ステート変更関数
   * @param origin オリジナル
   * @returns 変更したステート
   */
  fn?: (origin: PlayerState) => PlayerState;
}) =>
  domStub((stubOptions) => {
    const { armdozerId, pilotId, fn } = options;
    const isEnemy = options.isEnemy ?? false;
    const isPilotHidden = options.isPilotHidden ?? false;
    const armdozer =
      Armdozers.find((a) => a.id === armdozerId) ?? EMPTY_ARMDOZER;
    const pilot = Pilots.find((p) => p.id === pilotId) ?? EMPTY_PILOT;
    const origin = createPlayerState({
      playerId: "test-player",
      armdozer,
      pilot,
    });
    const state = fn?.(origin) ?? origin;
    const dialog = new StatusDialog({
      ...stubOptions,
      state,
      isEnemy,
      isPilotHidden,
    });
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

/** シンブレイバー + シンヤ（敵） */
export const shinBraverShinyaEnemy = story({
  armdozerId: ArmdozerIds.SHIN_BRAVER,
  pilotId: PilotIds.SHINYA,
  isEnemy: true,
});

/** シンブレイバー + シンヤ（敵、パイロット非表示） */
export const shinBraverShinyaWhenPilotHidden = story({
  armdozerId: ArmdozerIds.SHIN_BRAVER,
  pilotId: PilotIds.SHINYA,
  isEnemy: true,
  isPilotHidden: true,
});

/** ウィングドーザ + ツバサ */
export const wingDozerTsubasa = story({
  armdozerId: ArmdozerIds.WING_DOZER,
  pilotId: PilotIds.TSUBASA,
  fn: (origin) => ({
    ...origin,
    armdozer: {
      ...origin.armdozer,
      enableBurst: false,
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
    pilot: { ...origin.pilot, enableSkill: false },
  }),
});

/** ウィングドーザ + ツバサ（敵） */
export const wingDozerTsubasaEnemy = story({
  armdozerId: ArmdozerIds.WING_DOZER,
  pilotId: PilotIds.TSUBASA,
  isEnemy: true,
});

/** ウィングドーザ + ツバサ（敵、パイロット非表示） */
export const wingDozerTsubasaWhenPilotHidden = story({
  armdozerId: ArmdozerIds.WING_DOZER,
  pilotId: PilotIds.TSUBASA,
  isEnemy: true,
  isPilotHidden: true,
});

/** ネオランドーザ + ガイ */
export const neoLandozerGai = story({
  armdozerId: ArmdozerIds.NEO_LANDOZER,
  pilotId: PilotIds.GAI,
  fn: (origin) => ({
    ...origin,
    armdozer: {
      ...origin.armdozer,
      enableBurst: false,
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
    pilot: { ...origin.pilot, enableSkill: false },
  }),
});

/** ネオランドーザ + ガイ（敵） */
export const neoLandozerGaiEnemy = story({
  armdozerId: ArmdozerIds.NEO_LANDOZER,
  pilotId: PilotIds.GAI,
  isEnemy: true,
});

/** ネオランドーザ + ガイ（敵、パイロット非表示） */
export const neoLandozerGaiWhenPilotHidden = story({
  armdozerId: ArmdozerIds.NEO_LANDOZER,
  pilotId: PilotIds.GAI,
  isEnemy: true,
  isPilotHidden: true,
});

/** ライトニングドーザ + ライト */
export const lightningDozerRaito = story({
  armdozerId: ArmdozerIds.LIGHTNING_DOZER,
  pilotId: PilotIds.RAITO,
  fn: (origin) => ({
    ...origin,
    armdozer: {
      ...origin.armdozer,
      enableBurst: false,
      effects: [
        {
          type: "TryReflect",
          damage: 2000,
          effect: "Lightning",
          period: { type: "TurnLimit", remainingTurn: 2 },
        },
        {
          type: "DamageHalved",
          period: { type: "TurnLimit", remainingTurn: 1 },
        },
      ],
    },
    pilot: { ...origin.pilot, enableSkill: false },
  }),
});

/** ライトニングドーザ + ライト（敵） */
export const lightningDozerRaitoEnemy = story({
  armdozerId: ArmdozerIds.LIGHTNING_DOZER,
  pilotId: PilotIds.RAITO,
  isEnemy: true,
});

/** ライトニングドーザ + ライト（敵、パイロット非表示） */
export const lightningDozerRaitoWhenPilotHidden = story({
  armdozerId: ArmdozerIds.LIGHTNING_DOZER,
  pilotId: PilotIds.RAITO,
  isEnemy: true,
  isPilotHidden: true,
});

/** ジェネシスブレイバー + ユウヤ */
export const genesisBraverYuuya = story({
  armdozerId: ArmdozerIds.GENESIS_BRAVER,
  pilotId: PilotIds.YUUYA,
  fn: (origin) => ({
    ...origin,
    armdozer: {
      ...origin.armdozer,
      enableBurst: false,
      effects: [
        {
          type: "BatteryRecoverSkip",
          period: { type: "SpecialPeriod" },
        },
      ],
    },
    pilot: { ...origin.pilot, enableSkill: false },
  }),
});

/** ジェネシスブレイバー + ユウヤ（敵） */
export const genesisBraverYuuyaEnemy = story({
  armdozerId: ArmdozerIds.GENESIS_BRAVER,
  pilotId: PilotIds.YUUYA,
  isEnemy: true,
});

/** ジェネシスブレイバー + ユウヤ（敵、パイロット非表示） */
export const genesisBraverYuuyaWhenPilotHidden = story({
  armdozerId: ArmdozerIds.GENESIS_BRAVER,
  pilotId: PilotIds.YUUYA,
  isEnemy: true,
  isPilotHidden: true,
});

/** グランドーザ + ライト */
export const granDozerRaito = story({
  armdozerId: ArmdozerIds.GRAN_DOZER,
  pilotId: PilotIds.RAITO,
  fn: (origin) => ({
    ...origin,
    armdozer: {
      ...origin.armdozer,
      enableBurst: false,
      effects: [
        {
          type: "DamageHalved",
          period: { type: "TurnLimit", remainingTurn: 1 },
        },
      ],
    },
    pilot: { ...origin.pilot, enableSkill: false },
  }),
});

/** グランドーザ + ライト（敵） */
export const granDozerRaitoEnemy = story({
  armdozerId: ArmdozerIds.GRAN_DOZER,
  pilotId: PilotIds.RAITO,
  isEnemy: true,
});

/** グランドーザ + ライト（敵、パイロット非表示） */
export const granDozerRaitoWhenPilotHidden = story({
  armdozerId: ArmdozerIds.GRAN_DOZER,
  pilotId: PilotIds.RAITO,
  isEnemy: true,
  isPilotHidden: true,
});
