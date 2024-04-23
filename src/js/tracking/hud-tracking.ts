import { HUDCoordinate } from "./coordinate";

/** HUDレイヤー トラッキング可能なオブジェクト */
export interface HUDTracking {
  /**
   * 3Dレイヤーのオブジェクトをトラッキングする
   * @param coordinate トラッキング先、3Dレイヤー座標をHUDレイヤー座標に変換したもの
   */
  tracking(coordinate: HUDCoordinate): void;
}
