import { Color } from "../color";

/** デスアラートモデル */
export type DeathAlertModel = {
  /** 0から1で指定する不透明度、0で完全透明 */
  opacity: number;
  /** ビネットの色 */
  color: Color;
  /** ビネットのマージン、0から1で指定 */
  margin: number;
};
