import {
  BattleResult,
  battleResult,
  correctedBattery,
  GameState,
  PlayerId,
} from "gbraver-burst-core";

import { CustomBattleEventProps } from "../custom-battle-event";

/**
 * ダメージ予想のための戦闘結果を取得する
 * @param options オプション
 * @param options.gameState ゲーム状態
 * @param options.playerId プレイヤーID
 * @param options.playerBattery プレイヤーが出すバッテリー
 * @returns
 */
export const getBattleResultForPredicatedDamage = (options: {
  gameState: GameState;
  playerId: PlayerId;
  playerBattery: number;
}): BattleResult => {
  const { gameState, playerId, playerBattery } = options;
  const { players, activePlayerId } = gameState;

  const attacker = players.find((p) => p.playerId === activePlayerId);
  const defender = players.find((p) => p.playerId !== activePlayerId);
  if (!attacker || !defender) {
    throw new Error("Attacker or defender not found");
  }

  const attackerBattery =
    attacker.playerId === playerId ? playerBattery : attacker.armdozer.battery;
  const attackerCorrectedBattery = correctedBattery(
    { type: "BATTERY_COMMAND", battery: attackerBattery },
    attacker.armdozer.effects,
  );
  const defenderBattery =
    defender.playerId === playerId ? playerBattery : defender.armdozer.battery;
  const defenderCorrectedBattery = correctedBattery(
    { type: "BATTERY_COMMAND", battery: defenderBattery },
    defender.armdozer.effects,
  );
  return battleResult(
    attacker,
    attackerCorrectedBattery,
    defender,
    defenderCorrectedBattery,
  );
};

/**
 * ダメージ予想を計算する
 * @param result 戦闘結果
 * @returns ダメージ予想
 */
export const calcPredicatedDamage = (result: BattleResult): number =>
  result.name === "NormalHit" ||
  result.name === "CriticalHit" ||
  result.name === "Guard"
    ? result.damage
    : 0;

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

  const defenderHUD = props.view.hud.players.find(
    (h) => h.playerId !== latestState.activePlayerId,
  );
  if (!defenderHUD) {
    return;
  }

  const battleResult = getBattleResultForPredicatedDamage({
    gameState: latestState,
    playerId: props.playerId,
    playerBattery,
  });
  const predicatedDamage = calcPredicatedDamage(battleResult);
  defenderHUD.predicatedDamage.set(predicatedDamage);
};
