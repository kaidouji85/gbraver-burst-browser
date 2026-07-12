import {
  BattleResult,
  battleResult,
  correctedBattery,
  GameState,
  PlayerId,
} from "gbraver-burst-core";

import { CustomBattleEventProps } from "../custom-battle-event";

/**
 * ダメージ予想を計算する
 * @param result 戦闘結果
 * @returns ダメージ予想
 */
const calcPredicatedDamage = (result: BattleResult): number =>
  result.name === "NormalHit" ||
  result.name === "CriticalHit" ||
  result.name === "Guard"
    ? result.damage
    : 0;

/** ダメージ予想に必要なデータ */
type PredicatedDamageData = {
  /** 戦闘結果 */
  battleResult: BattleResult;
  /** ダメージ予想 */
  predicatedDamage: number;
};

/**
 * ダメージ予想のための戦闘結果を取得する
 * @param options オプション
 * @param options.gameState ゲーム状態
 * @param options.playerId プレイヤーID
 * @param options.playerBattery プレイヤーが出すバッテリー
 * @returns 戦闘結果、データ不整合の場合はnull
 */
export const createPredicatedDamageData = (options: {
  gameState: GameState;
  playerId: PlayerId;
  playerBattery: number;
}): PredicatedDamageData | null => {
  const { gameState, playerId, playerBattery } = options;
  const { players, activePlayerId } = gameState;

  const attacker = players.find((p) => p.playerId === activePlayerId);
  const defender = players.find((p) => p.playerId !== activePlayerId);
  if (!attacker || !defender) {
    return null;
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
  const battleResultForPredicatedDamage = battleResult(
    attacker,
    attackerCorrectedBattery,
    defender,
    defenderCorrectedBattery,
  );
  const predicatedDamage = calcPredicatedDamage(
    battleResultForPredicatedDamage,
  );
  return {
    battleResult: battleResultForPredicatedDamage,
    predicatedDamage,
  };
};

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

  const predicatedDamageData = createPredicatedDamageData({
    gameState: latestState,
    playerId: props.playerId,
    playerBattery,
  });
  if (!predicatedDamageData) {
    return;
  }

  const { predicatedDamage } = predicatedDamageData;
  defenderHUD.predicatedDamage.set(predicatedDamage);
};
