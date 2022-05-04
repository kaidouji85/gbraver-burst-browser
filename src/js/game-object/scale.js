// @flow
import type {SafeAreaInset} from "../safe-area/safe-area-inset";

/**
 * HUDレイヤー カットインのスケール
 *
 * @param rendererDOM レンダリング対象HTML要素
 * @param safeAreaInset セーブエリア情報
 * @return スケール
 */
export function HUDCutInScale(rendererDOM: HTMLElement, safeAreaInset: SafeAreaInset): number {
  const iPhoneXLandscapeHeight = 375;
  return Math.max((rendererDOM.clientHeight - safeAreaInset.bottom) / iPhoneXLandscapeHeight, 1);
}

/**
 * HUDレイヤー ユーザインタフェースのスケール
 *
 * @param rendererDOM レンダリング対象HTML要素
 * @return スケール
 */
export function HUDUIScale(rendererDOM: HTMLElement): number {
  const batterySelectorOriginHeight = 234;
  return Math.max(rendererDOM.clientHeight / batterySelectorOriginHeight * 0.4, 1);
}