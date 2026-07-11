import {
  BattleResult,
  battleResult,
  correctedBattery,
  GameState,
  PlayerId,
  PlayerState,
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
export function getBattleResultForPredicatedDamage(options: {
  gameState: GameState;
  playerId: PlayerId;
  playerBattery: number;
}) {
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
}

/**
 * ダメージ予想を計算する
 * @param result 戦闘結果
 * @returns ダメージ予想
 */
export function calcPredicatedDamage(result: BattleResult): number {
  return result.name === "NormalHit" ||
    result.name === "CriticalHit" ||
    result.name === "Guard"
    ? result.damage
    : 0;
}

/**
 * @deprecated
 * ダメージ予想を計算する
 * @param options オプション
 * @param options.attacker 攻撃側のプレイヤーステート
 * @param options.defender 防御側のプレイヤーステート
 * @param options.playerId プレイヤーID
 * @param options.playerBattery プレイヤーが出すバッテリー
 * @returns ダメージ予想数字
 */
export function deprecated_calcPredicatedDamage(options: {
  attacker: PlayerState;
  defender: PlayerState;
  playerId: PlayerId;
  playerBattery: number;
}) {
  const { attacker, defender, playerId, playerBattery } = options;

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
  const result = battleResult(
    attacker,
    attackerCorrectedBattery,
    defender,
    defenderCorrectedBattery,
  );
  return result.name === "NormalHit" ||
    result.name === "CriticalHit" ||
    result.name === "Guard"
    ? result.damage
    : 0;
}

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
