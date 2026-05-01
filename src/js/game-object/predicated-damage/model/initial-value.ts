import {
  BattleSimulatorIconPosition,
  PredicatedDamageModel,
} from "./predicated-damage-model";

/**
 * モデルの初期値を生成する
 * @param battleSimulatorIconPosition バトルシミュレーターアイコンの位置
 * @returns 生成結果
 */
export function initialValue(
  battleSimulatorIconPosition: BattleSimulatorIconPosition,
): PredicatedDamageModel {
  return {
    damage: 2000,
    opacity: 0,
    shouldPushNotifierStop: true,
    battleSimulatorIconPosition,
    battleSimulatorIconScale: 1,
  };
}
