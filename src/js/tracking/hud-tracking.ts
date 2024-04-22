/** HUDレイヤー トラッキング可能なオブジェクト */
export interface HUDTracking {
  /**
   * 3Dレイヤーのオブジェクトをトラッキングする
   * 本メソッドにはHUDレイヤー系座標をセットすること
   * @param x x座標
   * @param y y座標
   */
  tracking(x: number, y: number): void;
}
