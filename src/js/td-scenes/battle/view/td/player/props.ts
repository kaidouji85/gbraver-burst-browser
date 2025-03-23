import { PlayerId } from "gbraver-burst-core";

import { BatteryCorrect } from "../../../../../game-object/battery-correct/battery-correct";
import { BatteryEnhancement } from "../../../../../game-object/battery-enhancement/battery-enhancement";
import { BatteryNumber } from "../../../../../game-object/battery-number/battery-number";
import { ContinuousAttackIndicator } from "../../../../../game-object/continuous-attack/continuous-attack-indicator";
import { DamageHalved } from "../../../../../game-object/damage-halved/damage-halved";
import { DamageIndicator } from "../../../../../game-object/damage-indicator/damage-indicator";
import { Lightning } from "../../../../../game-object/hitmark/lightning/lightning";
import { ShockWave } from "../../../../../game-object/hitmark/shock-wave/shock-wave";
import { Ineffective } from "../../../../../game-object/ineffective/ineffective";
import { PowerUp } from "../../../../../game-object/power-up/power-up";
import { RecoverBattery } from "../../../../../game-object/recover-battery/recover-battery";
import { ReflectIndicator } from "../../../../../game-object/reflect-indicator/reflect-indicator";

/** 3Dレイヤー プレイヤーオブジェクト プロパティ */
export interface TDPlayerProps {
  /** プレイヤーID */
  playerId: PlayerId;
  /** ヒットマーク */
  hitMark: {
    /** 衝撃波 */
    shockWave: ShockWave;
    /** 電撃 */
    lightning: Lightning;
  };
  /** アームドーザエフェクト */
  armdozerEffects: {
    /** 攻撃アップ */
    powerUp: PowerUp;
    /** カウンター */
    reflect: ReflectIndicator;
    /** 2回行動 */
    continuousAttack: ContinuousAttackIndicator;
    /** ダメージ半減 */
    damageHalved: DamageHalved;
    /** バッテリー増強 */
    batteryEnhancement: BatteryEnhancement;
    /** 効果無効 */
    ineffective: Ineffective;
  };
  /** バッテリー数字 */
  batteryNumber: BatteryNumber;
  /** バッテリー補正 */
  batteryCorrect: BatteryCorrect;
  /** バッテリー回復 */
  recoverBattery: RecoverBattery;
  /** ダメージインジケーター */
  damageIndicator: DamageIndicator;
}
