import { GameState, PlayerId } from "gbraver-burst-core";

import { CustomStateAnimation } from "../td-scenes/battle/custom-battle-event";
import { separatePlayersFromCurrentState } from "./separate-players";

/**
 * 指定したプレイヤーがバーストを発動したかを判定する
 * @param state ゲームステート
 * @param playerId 判定対象のプレイヤー
 * @returns trueでバーストを発動した
 */
function isBurstActivated(state: GameState, playerId: PlayerId): boolean {
  return (
    state.effect.name === "BurstEffect" && state.effect.burstPlayer === playerId
  );
}

/**
 * 現在のステートからプレイヤーがバーストを発動したかを判定する
 * @param props カスタムバトルイベントプロパティ
 * @returns trueでバーストを発動した
 */
export function isPlayerBurstActivated(props: CustomStateAnimation): boolean {
  return isBurstActivated(props.currentState, props.playerId);
}

/**
 * 現在のステートから敵がバーストを発動したかを判定する
 * @param props カスタムバトルイベントプロパティ
 * @returns trueでバーストを発動した
 */
export function isEnemyBurstActivated(props: CustomStateAnimation): boolean {
  const enemy = separatePlayersFromCurrentState(props)?.enemy;
  return enemy ? isBurstActivated(props.currentState, enemy.playerId) : false;
}
