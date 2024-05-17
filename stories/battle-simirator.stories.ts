import { StoryFn } from "@storybook/html";
import {
  ArmdozerId,
  ArmdozerIds,
  Armdozers,
  EMPTY_PLAYER_STATE,
  PlayerId,
  PlayerState,
} from "gbraver-burst-core";

import { BattleSimulator } from "../src/js/dom-dialogs/battle-simulator";
import { domStub } from "./stub/dom-stub";

export default {
  title: "battle-simulator",
};

/** プレイヤー生成パラメータ */
type PlayerCreatorParams = {
  /** プレイヤーID */
  playerId: PlayerId;
  /** アームドーザID */
  armdozerId: ArmdozerId;
  /** バッテリー値 */
  battery: number;
};

/**
 * プレイヤーステートを生成するヘルパー関数
 * @param params パラメータ
 * @returns 生成結果
 */
const createPlayerState = (params: PlayerCreatorParams): PlayerState => {
  const { playerId, armdozerId, battery } = params;
  const armdozer = Armdozers.find((a) => a.id === armdozerId) ?? Armdozers[0];
  return {
    ...EMPTY_PLAYER_STATE,
    playerId,
    armdozer: {
      ...armdozer,
      hp: armdozer.maxHp,
      battery,
      enableBurst: true,
      effects: [],
    },
  };
};

/** プレイヤーのターン */
export const playerTurn: StoryFn = domStub((params) => {
  const player = createPlayerState({
    playerId: "player",
    armdozerId: ArmdozerIds.SHIN_BRAVER,
    battery: 5,
  });
  const enemy = createPlayerState({
    playerId: "enemy",
    armdozerId: ArmdozerIds.NEO_LANDOZER,
    battery: 5,
  });
  const simulator = new BattleSimulator({
    ...params,
    player,
    enemy,
    isPlayerAttacker: true,
  });
  return simulator.getRootHTMLElement();
});

/** 敵のターン */
export const enemyTurn: StoryFn = domStub((params) => {
  const player = createPlayerState({
    playerId: "player",
    armdozerId: ArmdozerIds.WING_DOZER,
    battery: 5,
  });
  const enemy = createPlayerState({
    playerId: "enemy",
    armdozerId: ArmdozerIds.LIGHTNING_DOZER,
    battery: 5,
  });
  const simulator = new BattleSimulator({
    ...params,
    player,
    enemy,
    isPlayerAttacker: false,
  });
  return simulator.getRootHTMLElement();
});
