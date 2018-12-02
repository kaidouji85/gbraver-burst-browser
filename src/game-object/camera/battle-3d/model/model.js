// @flow

/** 戦闘画面3Dレイヤーカメラのモデル */
export type Battle3DCameraModel = {
  // カメラの座標
  position: {
    x: number,
    y: number,
    z: number
  },
  // カメラの注視点
  target: {
    x: number,
    y: number,
    z: number
  }
};