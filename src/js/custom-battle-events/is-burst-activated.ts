import { GameState, PlayerId } from "gbraver-burst-core";

import { CustomStateAnimationProps } from "../td-scenes/battle/custom-battle-event";

/**
 * @deprecated
 * 指定したプレイヤーがバーストを発動したかを判定する
 * @param state ゲームステート
 * @param playerId 判定対象のプレイヤー
 * @returns trueでバーストを発動した
 */
const isBurstActivated = (state: GameState, playerId: PlayerId): boolean =>
  state.effect.name === "BurstEffect" && state.effect.burstPlayer === playerId;

/**
 * @deprecated
 * 現在のステートからプレイヤーがバーストを発動したかを判定する
 * @param props カスタムバトルイベントプロパティ
 * @returns trueでバーストを発動した
 */
export const isPlayerBurstActivatedFromCurrentState = (
  props: CustomStateAnimationProps,
) => isBurstActivated(props.currentState, props.playerId);

/**
 * @deprecated
 * 現在のステートから敵がバーストを発動したかを判定する
 * @param props カスタムバトルイベントプロパティ
 * @returns trueでバーストを発動した
 */
export const isEnemyBurstActivatedFromCurrentState = (
  props: CustomStateAnimationProps,
) => isBurstActivated(props.currentState, props.enemyId);
