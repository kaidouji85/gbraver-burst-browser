import { HUDCoordinate } from "./coordinate";

/** HUDレイヤー トラッキング可能なオブジェクト */
export interface HUDTracking {
  /**
   * 3Dレイヤーのオブジェクトをトラッキングする
   * 本メソッドにはHUDレイヤー系座標をセットすること
   * @param coordinate トラッキング先のHUDレイヤー系座標
   */
  tracking(coordinate: HUDCoordinate): void;
}
