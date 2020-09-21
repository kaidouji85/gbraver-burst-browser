// @flow
import type {SafeAreaInset} from "../safe-area/safe-area-inset";

/**
 * HUDレイヤー スクリーンサイズに対応するスケールを返す
 * HUDオブジェクトの種類により、倍率の端数を利用するか否かが異なる
 * そのため、オブジェクトの種類に応じた倍率計算を用意するため、本関数を直接呼び出すことはない
 *
 * @param rendererDOM レンダリング対象HTML要素
 * @param safeAreaInset セーブエリア情報
 * @return スケール
 */
function HUDScale(rendererDOM: HTMLElement, safeAreaInset: SafeAreaInset): number {
  const safeAreaHeight = rendererDOM.clientHeight - safeAreaInset.bottom;
  return safeAreaHeight / 375;
}

/**
 * HUDレイヤー ユーザインタフェースのスケール
 *
 * @param rendererDOM レンダリング対象HTML要素
 * @param safeAreaInset セーブエリア情報
 * @return スケール
 */
export function HUDUIScale(rendererDOM: HTMLElement, safeAreaInset: SafeAreaInset): number {
  const scale = HUDScale(rendererDOM, safeAreaInset);
  return Math.max(1, Math.floor(scale));
}

/**
 * HUDレイヤー インジケータのスケール
 *
 * @param rendererDOM レンダリング対象HTML要素
 * @param safeAreaInset セーブエリア情報
 * @return スケール
 */
export function HUDIndicatorScale(rendererDOM: HTMLElement, safeAreaInset: SafeAreaInset): number {
  const scale = HUDScale(rendererDOM, safeAreaInset);
  return Math.max(1, Math.floor(scale));
}

/**
 * HUDレイヤー カットインのスケール
 *
 * @param rendererDOM レンダリング対象HTML要素
 * @param safeAreaInset セーブエリア情報
 * @return スケール
 */
export function HUDCutInScale(rendererDOM: HTMLElement, safeAreaInset: SafeAreaInset): number {
  const scale = HUDScale(rendererDOM, safeAreaInset);
  return Math.max(1, scale);
}