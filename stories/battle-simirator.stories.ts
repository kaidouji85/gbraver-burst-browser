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
};

/**
 * プレイヤーステートを生成するヘルパー関数
 * @param params パラメータ
 * @returns 生成結果
 */
const createPlayerState = (params: PlayerCreatorParams): PlayerState => {
  const { playerId, armdozerId } = params;
  const armdozer = Armdozers.find((a) => a.id === armdozerId) ?? Armdozers[0];
  return {
    ...EMPTY_PLAYER_STATE,
    playerId,
    armdozer: {
      ...armdozer,
      hp: armdozer.maxHp,
      battery: armdozer.maxBattery,
      enableBurst: true,
      effects: [],
    },
  };
};

/** ダイアログ表示 */
export const dialog: StoryFn = domStub((params) => {
  const player = createPlayerState({
    playerId: "player",
    armdozerId: ArmdozerIds.SHIN_BRAVER,
  });
  const enemy = createPlayerState({
    playerId: "enemy",
    armdozerId: ArmdozerIds.NEO_LANDOZER,
  });
  const simulator = new BattleSimulator({
    ...params,
    player,
    enemy,
    isPlayerAttacker: true,
  });
  return simulator.getRootHTMLElement();
});
