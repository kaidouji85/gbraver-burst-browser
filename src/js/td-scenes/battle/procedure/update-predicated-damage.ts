import { calcPredicatedDamage } from "../animation/game-state/calc-predicated-damage";
import { CustomBattleEventProps } from "../custom-battle-event";

/**
 * ダメージ予想を更新する
 * @param props カスタムバトルイベントのプロパティ
 * @param nowPlayerBattery 現在のプレイヤーのバッテリー
 */
export const updatePredicatedDamage = (
  props: CustomBattleEventProps,
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
  const defender = players.find(
    (p) => p.playerId !== latestState.activePlayerId,
  );
  const defenderHUD = props.view.hud.players.find(
    (h) => h.playerId !== latestState.activePlayerId,
  );
  if (!attacker || !defender || !defenderHUD) {
    return;
  }

  const predicatedDamage = calcPredicatedDamage({
    attacker,
    defender,
    playerId: props.playerId,
    nowPlayerBattery,
  });
  defenderHUD.predicatedDamage.set(predicatedDamage);
};
