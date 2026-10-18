import { BatteryDeclaration, GameStateX } from "gbraver-burst-core";

import { StateAnimationProps } from "../state-animation-props";

/**
 * アニメーションで利用する各種オブジェクトを抽出する
 * @param props アニメーションプロパティ
 * @param gameState ゲームステート
 * @returns 抽出結果、抽出できない場合はnullを返す
 */
export function extract(
  props: StateAnimationProps,
  gameState: GameStateX<BatteryDeclaration>,
) {
  const { view } = props;
  const { players, effect } = gameState;

  const attacker = players.find((v) => v.playerId === effect.attacker);
  const defender = players.find((v) => v.playerId !== effect.attacker);
  if (!attacker || !defender) {
    return null;
  }

  const attackerTD = view.td.players.find(
    (v) => v.playerId === attacker.playerId,
  );
  const attackerTDArmdozer = view.td.armdozers.find(
    (v) => v.playerId === attacker.playerId,
  );
  const attackerHUD = view.hud.players.find(
    (v) => v.playerId === attacker.playerId,
  );
  const defenderTD = view.td.players.find(
    (v) => v.playerId === defender.playerId,
  );
  const defenderHUD = view.hud.players.find(
    (v) => v.playerId === defender.playerId,
  );
  if (
    !attackerTD ||
    !attackerTDArmdozer ||
    !attackerHUD ||
    !defenderTD ||
    !defenderHUD
  ) {
    return null;
  }

  return {
    /** 攻撃側のステート */
    attacker,
    /** 攻撃側の3Dプレイヤー */
    attackerTD,
    /** 攻撃側の3Dアームドーザ */
    attackerTDArmdozer,
    /** 攻撃側のHUDプレイヤー */
    attackerHUD,

    /** 防御側のステート */
    defender,
    /** 防御側の3Dプレイヤー */
    defenderTD,
    /** 防御側のHUDプレイヤー */
    defenderHUD,
  };
}
