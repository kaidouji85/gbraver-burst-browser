import { GameState, PlayerId } from "gbraver-burst-core";

import { CustomStateAnimation } from "../td-scenes/battle/custom-battle-event";
import { separatePlayersFromCurrentState } from "./separate-players";

/**
 * 指定したプレイヤーがパイロットスキルを発動したかを判定する
 * @param state ゲームステート
 * @param playerId 判定対象のプレイヤー
 * @return trueでパイロットスキルを発動した
 */
export function isPilotSkillActivated(
  state: GameState,
  playerId: PlayerId,
): boolean {
  return (
    state.effect.name === "PilotSkillEffect" &&
    state.effect.invokerId === playerId
  );
}

/**
 * 現在のステートからプレイヤーがパイロットスキルを発動したかを判定する
 * @param props カスタムバトルイベントプロパティ
 * @return trueでパイロットスキルを発動した
 */
export function isPlayerPilotSkillActivated(
  props: CustomStateAnimation,
): boolean {
  return isPilotSkillActivated(props.currentState, props.playerId);
}

/**
 * 現在のステートから敵がパイロットスキルを発動したかを判定する
 * @param props カスタムバトルイベントプロパティ
 * @return trueでパイロットスキルを発動した
 */
export function isEnemyPilotSkillActivated(
  props: CustomStateAnimation,
): boolean {
  const enemy = separatePlayersFromCurrentState(props)?.enemy;
  return enemy
    ? isPilotSkillActivated(props.currentState, enemy.playerId)
    : false;
}
