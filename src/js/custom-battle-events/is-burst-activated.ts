import { GameState, PlayerId } from "gbraver-burst-core";

import { CustomStateAnimation } from "../td-scenes/battle/custom-battle-event";

/**
 * 指定したプレイヤーがバーストを発動したかを判定する
 * @param state ゲームステート
 * @param playerId 判定対象のプレイヤー
 * @returns trueでバーストを発動した
 */
const isBurstActivated = (state: GameState, playerId: PlayerId): boolean =>
  state.effect.name === "BurstEffect" && state.effect.burstPlayer === playerId;

/**
 * 現在のステートからプレイヤーがバーストを発動したかを判定する
 * @param props カスタムバトルイベントプロパティ
 * @returns trueでバーストを発動した
 */
export const isPlayerBurstActivated = (props: CustomStateAnimation) =>
  isBurstActivated(props.currentState, props.playerId);

/**
 * 現在のステートから敵がバーストを発動したかを判定する
 * @param props カスタムバトルイベントプロパティ
 * @returns trueでバーストを発動した
 */
export const isEnemyBurstActivated = (props: CustomStateAnimation) =>
  isBurstActivated(props.currentState, props.enemyId);
