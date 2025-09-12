import { PlayerState } from "gbraver-burst-core";

import { BattleSceneProps } from "../props";

/** バトルシミュレータのゲーム状態パラメータ */
type BattleSimulatorGameState = {
  /** プレイヤーのステート */
  readonly player: PlayerState;
  /** 敵のステート */
  enemy: PlayerState;
  /** プレイヤーの初期選択バッテリー */
  readonly initialPlayerBattery: number;
  /** プレイヤーが攻撃側か否か、trueで攻撃側 */
  readonly isPlayerAttacker: boolean;
};

/**
 * バトルシミュレータのゲーム状態パラメータを取得する
 * @param props 戦闘シーンプロパティ
 * @returns ゲーム状態パラメータ、取得できない場合はnull
 */
export function getBattleSimulatorGameState(
  props: Readonly<BattleSceneProps>,
): BattleSimulatorGameState | null {
  const { view, playerId, stateHistory } = props;
  const lastState = stateHistory.at(-1);
  if (!lastState) {
    return null;
  }

  const player = lastState.players.find((p) => p.playerId === playerId);
  const enemy = lastState.players.find((p) => p.playerId !== playerId);
  if (!player || !enemy) {
    return null;
  }

  const isPlayerAttacker = lastState.activePlayerId === playerId;
  const initialPlayerBattery =
    view.hud.gameObjects.batterySelector.getBattery();

  return {
    player,
    enemy,
    initialPlayerBattery,
    isPlayerAttacker,
  };
}
