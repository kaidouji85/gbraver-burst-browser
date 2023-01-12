/** バッテリーゲージの1マス分のモデル */
export type Battery = {
  value: number;
  opacity: number;
};

/** ゲージのモデル */
export type GaugeModel = {
  /** HP現在値 */
  hp: number;
  /** HP最大値 */
  maxHp: number;
  /** バッテリー */
  batteryList: Battery[];
  /** バッテリー最大値 */
  maxBattery: number;
  /** トラッキング情報 */
  tracking: {
    /** x座標 */
    x: number;
    /** y座標 */
    y: number;
  };
};
