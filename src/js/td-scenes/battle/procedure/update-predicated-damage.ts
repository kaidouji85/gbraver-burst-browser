import { getPredicatedDamage } from "../animation/game-state/get-predicated-damage";
import { BattleSceneProps } from "../props";

/**
 * ダメージ予想を更新する
 * @param props 戦闘シーンプロパティ
 * @param nowPlayerBattery 現在のプレイヤーのバッテリー
 */
export const updatePredicatedDamage = (
  props: BattleSceneProps,
  nowPlayerBattery: number,
): void => {
  const latestState = props.stateHistory.at(-1);
  if (!latestState) {
    return;
  }

  const { players } = latestState;
  const attacker = players.find(
    (p) => p.playerId === latestState.activePlayerId,
  );
  const defenderHUD = props.view.hud.players.find(
    (h) => h.playerId !== latestState.activePlayerId,
  );
  if (!attacker || !defenderHUD) {
    return;
  }

  const predicatedDamage = getPredicatedDamage({
    hudPlayers: props.view.hud.players,
    players,
    activePlayerId: latestState.activePlayerId,
    playerId: props.playerId,
    nowPlayerBattery,
  });
  defenderHUD.predicatedDamage.set(predicatedDamage);
};
