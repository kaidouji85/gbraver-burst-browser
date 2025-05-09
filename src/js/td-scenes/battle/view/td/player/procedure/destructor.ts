import { TDPlayerProps } from "../props";

/**
 * デストラクタ相当の処理
 * @param props レイヤープロパティ
 */
export function destructor(props: TDPlayerProps) {
  props.batteryNumber.destructor();
  props.batteryCorrect.destructor();
  props.damageIndicator.destructor();
  props.hitMark.shockWave.destructor();
  props.hitMark.lightning.destructor();
  props.armdozerEffects.powerUp.destructor();
  props.armdozerEffects.reflect.destructor();
  props.armdozerEffects.continuousAttack.destructor();
  props.armdozerEffects.damageHalved.destructor();
  props.armdozerEffects.batteryEnhancement.destructor();
  props.armdozerEffects.effectClear.destructor();
  props.recoverBattery.destructor();
}
