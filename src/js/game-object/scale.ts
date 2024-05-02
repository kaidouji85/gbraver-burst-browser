import type { SafeAreaInset } from "../safe-area/safe-area-inset";

/**
 * 画面の高さを基準としたスケールを計算する
 * スケールの基準となるのはiPhoneXランドスケープ時の高さである
 * @param rendererDOM レンダリング対象HTML要素
 * @param safeAreaInset セーフエリア情報
 * @returns スケール
 */
export function scaleBasedOnIPhoneXLandscapeHeight(
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
