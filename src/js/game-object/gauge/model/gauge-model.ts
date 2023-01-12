/** バッテリーゲージの1マス分のモデル */
export type BatteryGaugeUnitModel = {
  /** バッテリー値 */
  value: number;
  /** 輝度 */
  brightness: number;
  /** 透明度 */
  opacity: number;
};

/** バッテリーゲージ上限 */
export const BatteryLimit = 8;

/** ゲージのモデル */
export type GaugeModel = {
  /** HP現在値 */
  hp: number;
  /** HP最大値 */
  maxHp: number;
  /** バッテリー */
  batteryList: BatteryGaugeUnitModel[];
  /** 現在のバッテリー最大値、本値はゲーム中に変更する */
  maxBattery: number;
  /** トラッキング情報 */
  tracking: {
    /** x座標 */
    x: number;
    /** y座標 */
    y: number;
  };
};
