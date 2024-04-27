import type { SafeAreaInset } from "../safe-area/safe-area-inset";

/**
 * HUDレイヤー カットインのスケール
 * @param rendererDOM レンダリング対象HTML要素
 * @param safeAreaInset セーフエリア情報
 * @returns スケール
 */
export function HUDCutInScale(
  rendererDOM: HTMLElement,
  safeAreaInset: SafeAreaInset,
): number {
  const iPhoneXLandscapeHeight = 375;
  return Math.max(
    (rendererDOM.clientHeight - safeAreaInset.bottom) / iPhoneXLandscapeHeight,
    1,
  );
}

/**
 * HUDレイヤー ユーザインタフェースのスケール
 * @param rendererDOM レンダリング対象HTML要素
 * @param safeAreaInset セーフエリア情報
 * @returns スケール
 */
export function HUDUIScale(
  rendererDOM: HTMLElement,
  safeAreaInset: SafeAreaInset,
): number {
  const batterySelectorOriginHeight = 234;
  return Math.max(
    ((rendererDOM.clientHeight - safeAreaInset.bottom) /
      batterySelectorOriginHeight) *
      0.45,
    1,
  );
}

/**
 * HUDレイヤー 引き出し線のスケール
 * @param rendererDOM レンダリング対象HTML要素
 * @param safeAreaInset セーフエリア情報
 * @returns スケール
 */
export function HUDLeadLineScale(
  rendererDOM: HTMLElement,
  safeAreaInset: SafeAreaInset,
): number {
  const iPhoneXLandscapeHeight = 375;
  return Math.max(
    (rendererDOM.clientHeight - safeAreaInset.bottom) / iPhoneXLandscapeHeight,
    1,
  );
}
