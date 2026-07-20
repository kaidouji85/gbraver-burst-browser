import { Color } from "../color";

/** デスアラートモデル */
export type DeathAlertModel = {
  /** 0から1で指定する不透明度、0で完全透明 */
  opacity: number;
  /** 画面幅 */
  width: number;
  /** 画面高 */
  height: number;
  /** ビネットの色 */
  color: Color;
};
