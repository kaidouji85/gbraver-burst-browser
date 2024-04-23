/** 3Dレイヤー座標座標 */
export type TDCoordinate = {
  /** x座標 */
  x: number;
  /** y座標 */
  y: number;
  /** z座標 */
  z: number;
};

/** HUDレイヤー座標 */
export type HUDCoordinate = {
  /** x座標 */
  x: number;
  /** y座標 */
  y: number;
};

/** DOMレイヤーの座標 */
export type DOMCoordinate = {
  /** css top（単位はpx） */
  top: number;
  /** css left（単位はpx） */
  left: number;
};
