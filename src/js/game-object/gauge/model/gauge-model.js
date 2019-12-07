// @flow

/** バッテリーゲージの1マス分のモデル */
export type Battery = {
  value: number,
  opacity: number
};

/** ゲージのモデル */
export type GaugeModel = {
  hp: number,
  maxHp: number,
  batteryList: Battery[],
};

