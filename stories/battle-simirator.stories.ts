import { StoryFn } from "@storybook/html";
import {
  ArmdozerEffect,
  ArmdozerId,
  ArmdozerIds,
  Armdozers,
  BatteryCorrection,
  EMPTY_PLAYER_STATE,
  PlayerId,
  PlayerState,
} from "gbraver-burst-core";

import { BattleSimulator } from "../src/js/dom-dialogs/battle-simulator";
import { domStub } from "./stub/dom-stub";

export default {
  title: "battle-simulator",
};

/**
 * バッテリー補正を生成する
 * @param value 補正値
 * @returns 生成結果
 */
const batteryCorrection = (value: number): BatteryCorrection => ({
  type: "BatteryCorrection",
  batteryCorrection: value,
  period: {
    type: "TurnLimit",
    remainingTurn: 1,
  },
});

/** プレイヤー生成パラメータ */
type PlayerCreatorParams = {
  /** プレイヤーID */
  playerId: PlayerId;
  /** アームドーザID */
  armdozerId: ArmdozerId;
  /** バッテリー値 */
  battery: number;
  /** アームドーザエフェクト */
  effects?: ArmdozerEffect[];
};

/**
 * プレイヤーステートを生成するヘルパー関数
 * @param params パラメータ
 * @returns 生成結果
 */
const createPlayerState = (params: PlayerCreatorParams): PlayerState => {
  const { playerId, armdozerId, battery, effects } = params;
  const armdozer = Armdozers.find((a) => a.id === armdozerId) ?? Armdozers[0];
  return {
    ...EMPTY_PLAYER_STATE,
    playerId,
    armdozer: {
      ...armdozer,
      hp: armdozer.maxHp,
      battery,
      enableBurst: true,
      effects: effects ?? [],
    },
  };
};

/** バトルシミュレータストーリーのパラメータ */
type BattleSimulatorStoryParams = {
  /** プレイヤー */
  player: PlayerState;
  /** 敵 */
  enemy: PlayerState;
  /** プレイヤーが攻撃側か否か */
  isPlayerAttacker: boolean;
};

/**
 * バトルシミュレータストーリー
 * @param storyParams パラメータ
 * @returns ストーリー関数
 */
const battleSimulatorStory = (storyParams: BattleSimulatorStoryParams) =>
  domStub((stubParams) => {
    const simulator = new BattleSimulator({
      ...storyParams,
      ...stubParams,
    });
    simulator.notifyClose().subscribe(() => {
      console.log("close");
    });
    return simulator.getRootHTMLElement();
  });

/** プレイヤーのターン */
export const playerTurn: StoryFn = battleSimulatorStory({
  player: createPlayerState({
    playerId: "player",
    armdozerId: ArmdozerIds.SHIN_BRAVER,
    battery: 5,
  }),
  enemy: createPlayerState({
    playerId: "enemy",
    armdozerId: ArmdozerIds.NEO_LANDOZER,
    battery: 5,
  }),
  isPlayerAttacker: true,
});

/** 敵のターン */
export const enemyTurn: StoryFn = battleSimulatorStory({
  player: createPlayerState({
    playerId: "player",
    armdozerId: ArmdozerIds.WING_DOZER,
    battery: 5,
  }),
  enemy: createPlayerState({
    playerId: "enemy",
    armdozerId: ArmdozerIds.LIGHTNING_DOZER,
    battery: 5,
  }),
  isPlayerAttacker: false,
});

/** プレイヤーのバッテリー補正 */
export const playerBatteryCorrect: StoryFn = battleSimulatorStory({
  player: createPlayerState({
    playerId: "player",
    armdozerId: ArmdozerIds.GENESIS_BRAVER,
    battery: 4,
    effects: [batteryCorrection(1)],
  }),
  enemy: createPlayerState({
    playerId: "enemy",
    armdozerId: ArmdozerIds.WING_DOZER,
    battery: 5,
  }),
  isPlayerAttacker: true,
});

/** 敵のバッテリー補正 */
export const enemyBatteryCorrect: StoryFn = battleSimulatorStory({
  player: createPlayerState({
    playerId: "player",
    armdozerId: ArmdozerIds.NEO_LANDOZER,
    battery: 5,
  }),
  enemy: createPlayerState({
    playerId: "enemy",
    armdozerId: ArmdozerIds.LIGHTNING_DOZER,
    battery: 5,
    effects: [batteryCorrection(1)],
  }),
  isPlayerAttacker: true,
});
