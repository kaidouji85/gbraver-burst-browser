/** バッテリーゲージユニットのプロパティ */
export type BatteryGaugeUnitProps = {
  /** 輝度 */
  brightness: number;
  /** 透明度 */
  opacity: number;
};

/** バッテリーゲージユニットのモデル */
export type BatteryGaugeUnitModel = BatteryGaugeUnitProps & {
  /**
   * バッテリー値
   * 本プロパティはユニークIDとして扱われる
   */
  value: number;
};
