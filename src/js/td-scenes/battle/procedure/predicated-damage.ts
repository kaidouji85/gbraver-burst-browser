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
/**
 * デスアラートの種類
 * Player: プレイヤーが死亡する場合
 * Enemy: 敵が死亡する場合
 * None: どちらも死亡しない場合
 */
type DeathAlertType = "Player" | "Enemy" | "None";

/**
 * デスアラートの種類を計算する
 * @param options 計算に必要なオプション
 * @param options.defender 防御側のプレイヤー状態
 * @param options.playerId プレイヤーID
 * @param options.predicatedDamage ダメージ予想
 * @returns デスアラートの種類
 */
const calcDeathAlertType = (options: {
  defender: PlayerState;
  playerId: PlayerId;
  predicatedDamage: number;
}) => {
  const { defender, playerId, predicatedDamage } = options;
  const isPlayer = defender.playerId === playerId;
  const isDeath = defender.armdozer.hp - predicatedDamage <= 0;
  if (isDeath) {
    return isPlayer ? "Player" : "Enemy";
  }
  return "None";
};

/** ダメージ予想に必要なデータ */
type PredicatedDamageData = {
  /** 戦闘結果 */
  battleResult: BattleResult;
  /** ダメージ予想 */
  predicatedDamage: number;
  /** デスアラートの種類 */
  deathAlert: DeathAlertType;
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
  const deathAlert = calcDeathAlertType({
    defender,
    playerId,
    predicatedDamage,
  });
  return {
    battleResult: battleResultForPredicatedDamage,
    predicatedDamage,
    deathAlert,
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
