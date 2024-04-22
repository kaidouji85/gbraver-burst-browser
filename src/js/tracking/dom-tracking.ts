import { DOMCoordinate } from "./coordinate";

/** DOMレイヤー トラッキング可能なオブジェクト */
export interface DOMTracking {
  /**
   * 3Dレイヤーのオブジェクトをトラッキングする
   * 本メソッドにはDOMレイヤー系座標をセットすること
   * @param coordinate DOMレイヤー系座標で指定するトラッキング先
   */
  tracking(coordinate: DOMCoordinate): void;
}
