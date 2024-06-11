import { GameState, PlayerId } from "gbraver-burst-core";

import { CustomStateAnimation } from "../td-scenes/battle/custom-battle-event";

/**
 * @deprecated
 * 指定したプレイヤーがパイロットスキルを発動したかを判定する
 * @param state ゲームステート
 * @param playerId 判定対象のプレイヤー
 * @returns trueでパイロットスキルを発動した
 */
const isPilotSkillActivated = (state: GameState, playerId: PlayerId): boolean =>
  state.effect.name === "PilotSkillEffect" &&
  state.effect.invokerId === playerId;

/**
 * @deprecated
 * 現在のステートからプレイヤーがパイロットスキルを発動したかを判定する
 * @param props カスタムバトルイベントプロパティ
 * @returns trueでパイロットスキルを発動した
 */
export const isPlayerPilotSkillActivated = (props: CustomStateAnimation) =>
  isPilotSkillActivated(props.currentState, props.playerId);

/**
 * @deprecated
 * 現在のステートから敵がパイロットスキルを発動したかを判定する
 * @param props カスタムバトルイベントプロパティ
 * @returns trueでパイロットスキルを発動した
 */
export const isEnemyPilotSkillActivated = (props: CustomStateAnimation) =>
  isPilotSkillActivated(props.currentState, props.enemyId);
