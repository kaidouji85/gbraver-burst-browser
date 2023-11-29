import { PlayerState } from "gbraver-burst-core";

import { CustomBattleEventProps } from "../td-scenes/battle/custom-battle-event";

/** 分割されたプレイヤー */
type SeparatedPlayers = {
  /** プレイヤー */
  player: PlayerState;
  /** 敵 */
  enemy: PlayerState;
};

/**
 * プレイヤーを分割する
 * @param props カスタムバトルイベントプロパティ
 * @return 分割されたプレイヤー、分割できない場合null
 */
export function separatePlayers(
  props: Readonly<CustomBattleEventProps>,
): SeparatedPlayers | null {
  const lastState = props.stateHistory.at(-1);
  if (!lastState) {
    return null;
  }

  const player = lastState.players.find(
    (player) => player.playerId === props.playerId,
  );
  const enemy = lastState.players.find(
    (player) => player.playerId !== props.playerId,
  );
  if (!player || !enemy) {
    return null;
  }

  return { player, enemy };
}
