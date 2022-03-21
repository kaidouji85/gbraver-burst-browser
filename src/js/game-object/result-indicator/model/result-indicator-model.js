// @flow

/** リザルトインジケータ モデル */
export type ResultIndicatorModel = {
  /** 拡大率 */
  scale: number,
  /** 透明度 */
  opacity: number,
  /** HUDレイヤー重ね順 */
  zIndex: number,
  /** ワールド座標、原点は画面中央 */
  worldCoordinate: {
    /** 画面幅の半分を1とする相対座標 */
    x: number,
    /** 画面高の半分を1とする相対座標 */
    y: number,
  },
  /** ローカル座標、原点はオブジェクト中央 */
  localCoordinate: {
    /** オブジェクト中心からのX軸方向の距離 */
    x: number,
    /** オブジェクト中心からY軸方向の距離 */
    y: number,
  }
};