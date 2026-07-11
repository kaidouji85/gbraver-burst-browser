import { deprecated_calcPredicatedDamage } from "../animation/game-state/predicated-damage";
import { CustomBattleEventProps } from "../custom-battle-event";

/**
 * ダメージ予想を更新する
 * @param props カスタムバトルイベントのプロパティ
 * @param playerBattery プレイヤーが出すバッテリー
 */
export const updatePredicatedDamage = (
  props: CustomBattleEventProps,
  playerBattery: number,
): void => {
  const latestState = props.stateHistory.at(-1);
  if (!latestState) {
    return;
  }

  const { players } = latestState;
  const attacker = players.find(
    (p) => p.playerId === latestState.activePlayerId,
  );
  const defender = players.find(
    (p) => p.playerId !== latestState.activePlayerId,
  );
  const defenderHUD = props.view.hud.players.find(
    (h) => h.playerId !== latestState.activePlayerId,
  );
  if (!attacker || !defender || !defenderHUD) {
    return;
  }

  const predicatedDamage = deprecated_calcPredicatedDamage({
    attacker,
    defender,
    playerId: props.playerId,
    playerBattery,
  });
  defenderHUD.predicatedDamage.set(predicatedDamage);
};
