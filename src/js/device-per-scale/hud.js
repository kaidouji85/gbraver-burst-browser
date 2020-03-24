// @flow

import type {SafeAreaInset} from "../safe-area/safe-area-inset";

/**
 * HUDレイヤー デバイス毎のオブジェクト倍率
 *
 * @param rendererDOM レンダリング対象HTNML要素
 * @param safeAreaInset セーブエリア情報
 * @return 倍率
 */
export function devicePerScaleForHUD(rendererDOM: HTMLElement, safeAreaInset: SafeAreaInset): number {
  const safeAreaHeight = rendererDOM.clientHeight - safeAreaInset.bottom;
  return Math.max(1, Math.floor(safeAreaHeight / 375));
}